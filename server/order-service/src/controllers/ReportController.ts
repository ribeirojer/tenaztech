import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import logger from '../utils/logger';

class ReportController {
    static async getOrderReports(req: Request, res: Response) {
        try {
            const reports = await ReportRepository.getOrderReports();
            logger.info('Fetched order reports successfully');
            res.json(reports);
        } catch (error: any) {
            logger.error(`Failed to fetch order reports: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    };

    static async getPaymentReports(req: Request, res: Response) {
        try {
            const reports = await ReportRepository.getPaymentReports();
            logger.info('Fetched payment reports successfully');
            res.json(reports);
        } catch (error: any) {
            logger.error(`Failed to fetch payment reports: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    };
}

export default ReportController;
