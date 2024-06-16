import type { Context } from "../interfaces/ElysiaContext";
import { NotificationRepository } from "../repositories/NotificationRepository";

class NotificationController {
	static async getNotifications({ set }: Context) {
		try {
			const notifications = await NotificationRepository.getAll();
			set.status = 200;
			return notifications;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async markNotificationAsRead({ params, set }: Context) {
		try {
			const notification = await NotificationRepository.update(params.id, {
				read: true,
			});
			set.status = 200;
			return notification;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async deleteNotification({ params, set }: Context) {
		try {
			await NotificationRepository.delete(params.id);
			set.status = 204;
			return { message: "Notification deleted successfully" };
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}
}

export { NotificationController };
