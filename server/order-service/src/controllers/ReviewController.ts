import { Request, Response } from 'express';
import logger from '../utils/logger';
import { ReviewRepository } from '../repositories/ReviewRepository';

class ReviewController {
    static async createOrderReview (req: Request, res: Response) {
        try {
            const review = await ReviewRepository.create(req.params.orderId, req.body);
            logger.info('Review created successfully');
            res.status(201).json(review);
        } catch (error: any) {
            logger.error(`Failed to create review: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    };

    static async getOrderReviews (req: Request, res: Response) {
        try {
            const reviews = await ReviewRepository.getByOrderId(req.params.orderId);
            logger.info('Fetched order reviews successfully');
            res.json(reviews);
        } catch (error: any) {
            logger.error(`Failed to fetch order reviews: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    };
}

export default ReviewController;
