// services/JWTService.ts

import {
	create,
	getNumericDate,
	verify,
} from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import {} from "https://deno.land/x/redis@v0.32.4/mod.ts";

const JWT_SECRET = "your_jwt_secret";
//const redis = await Redis.connect({ hostname: "127.0.0.1", port: 6379 });

export class JWTService {
	generateToken(payload: object): string {
		const header = {
			alg: "HS256",
			typ: "JWT",
		} as any;

		const exp = getNumericDate(60 * 60); // Token válido por 1 hora

		const jwt = ""; // create(header, { ...payload, exp }, JWT_SECRET);

		return jwt;
	}

	verifyToken(token: string): object | null {
		try {
			const payload = {}; //verify(token, JWT_SECRET, "HS256");
			return payload;
		} catch (e) {
			return null;
		}
	}

	async invalidateToken(token: string): Promise<void> {
		//await redis.setex(token, 3600, "invalid");
	}

	async isTokenInvalidated(token: string): Promise<boolean> {
		//const result = await redis.get(token);
		return false; //result === "invalid";
	}
}
