import type { Context } from "../interfaces/ElysiaContext";
import { SocialAuthRepository } from "../repositories/SocialAuthRepository";

class SocialAuthController {
	static async initSocialAuth({ params, body, set }: Context) {
		try {
			await SocialAuthRepository.init(params.provider, body);
			set.status = 200;
			return { message: "Social auth initiated" };
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async socialAuthCallback({ params, body, set }: Context) {
		try {
			await SocialAuthRepository.callback(params.provider, body);
			set.status = 200;
			return { message: "Social auth callback processed" };
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}
}

export { SocialAuthController };
