import {
	type Header,
	type Payload,
	create,
	getNumericDate,
	verify,
} from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import { supabaseTokenService } from "./SupabaseTokenService.ts";

async function getKey(): Promise<CryptoKey> {
	const jwkKey = Deno.env.get("HMAC_KEY");
	if (!jwkKey) {
		throw new Error("HMAC_KEY is not set in the environment variables.");
	}
	return await crypto.subtle.importKey(
		"jwk",
		JSON.parse(jwkKey),
		{ name: "HMAC", hash: "SHA-512" },
		true,
		["sign", "verify"],
	);
}

export class JWTService {
	async generateToken(payload: object, duration: number): Promise<string> {
		const header: Header = {
			alg: "HS512",
			typ: "JWT",
		};

		const exp = getNumericDate(duration); // Duração personalizada do token
		const key = await getKey();
		const jwt = await create(header, { ...payload, exp }, key);

		await supabaseTokenService.storeToken(
			jwt,
			new Date(exp * 1000).toISOString(),
		);

		return jwt;
	}

	async verifyToken(token: string): Promise<object | null> {
		try {
			const key = await getKey();
			const payload = (await verify(token, key)) as Payload;

			const data = await supabaseTokenService.getToken(token);
			return data ? payload : null;
		} catch (e) {
			return e;
		}
	}

	async invalidateToken(token: string): Promise<void> {
		await supabaseTokenService.deleteToken(token);
	}

	async isTokenInvalidated(token: string): Promise<boolean> {
		const data = await supabaseTokenService.getToken(token);
		return !data;
	}

	async generateRefreshToken(
		payload: object,
		duration: number,
	): Promise<string> {
		const refreshTokenDuration = duration * 24 * 7; // Duração mais longa para refresh token (ex: 1 semana)
		return await this.generateToken(payload, refreshTokenDuration);
	}

	async verifyRefreshToken(token: string): Promise<object | null> {
		return await this.verifyToken(token);
	}
}
