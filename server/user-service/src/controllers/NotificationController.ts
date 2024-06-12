import { NotificationRepository } from "../repositories/NotificationRepository";

class NotificationController {
    static async getNotifications({ set }: any) {
        try {
            const notifications = await NotificationRepository.getAll();
            set.status = 200;
            return notifications;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async markNotificationAsRead({ params, set }: any) {
        try {
            const notification = await NotificationRepository.update(params.id, { read: true });
            set.status = 200;
            return notification;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async deleteNotification({ params, set }: any) {
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
