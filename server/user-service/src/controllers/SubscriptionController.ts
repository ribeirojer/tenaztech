import type { Context } from "../interfaces/ElysiaContext";
import { SubscriptionRepository } from "../repositories/SubscriptionRepository";

class SubscriptionController {
	static async getSubscriptions({ set }: Context) {
		try {
			const subscriptions = await SubscriptionRepository.getAll();
			set.status = 200;
			return subscriptions;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async createSubscription({ body, set }: Context) {
		try {
			const subscription = await SubscriptionRepository.create(body);
			set.status = 201;
			return subscription;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async deleteSubscription({ params, set }: Context) {
		try {
			await SubscriptionRepository.delete(params.id);
			set.status = 204;
			return { message: "Subscription deleted successfully" };
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}
}

export { SubscriptionController };
