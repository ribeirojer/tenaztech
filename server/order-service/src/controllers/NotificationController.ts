import { Request, Response } from 'express';
import { NotificationRepository } from '../repositories/NotificationRepository';
import logger from '../utils/logger';

class NotificationController {
    static async getOrderNotifications(req: Request, res: Response) {
        try {
            const notifications = await NotificationRepository.getOrderNotifications();
            logger.info('Fetched order notifications successfully');
            res.json(notifications);
        } catch (error: any) {
            logger.error(`Failed to fetch order notifications: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    };
    
    static async markNotificationAsRead (req: Request, res: Response) {
        try {
            const notification = await NotificationRepository.markAsRead(req.params.id);
            logger.info('Notification marked as read successfully');
            res.json(notification);
        } catch (error: any) {
            logger.error(`Failed to mark notification as read: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    };
}

export default NotificationController;
