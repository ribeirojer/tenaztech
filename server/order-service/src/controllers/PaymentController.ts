import { Request, Response } from 'express';
import { PaymentRepository } from "../repositories/PaymentRepository";
import logger from '../utils/logger';

class PaymentController {
    static async processPayment(req: Request, res: Response) {
        try {
            const payment = await PaymentRepository.process(req.body);
            logger.info('Payment processed successfully');
            res.status(201).json(payment);
        } catch (error: any) {
            logger.error(`Failed to process payment: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async configurePaymentProvider(req: Request, res: Response) {
        try {
            const provider = await PaymentRepository.configureProvider(req.body);
            logger.info('Payment provider configured successfully');
            res.status(201).json(provider);
        } catch (error: any) {
            logger.error(`Failed to configure payment provider: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async getPaymentProviders(req: Request, res: Response) {
        try {
            const providers = await PaymentRepository.getProviders();
            logger.info('Fetched payment providers');
            res.status(200).json(providers);
        } catch (error: any) {
            logger.error(`Failed to fetch payment providers: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async getPaymentHistory(req: Request, res: Response) {
        try {
            const history = await PaymentRepository.getHistory();
            logger.info('Fetched payment history');
            res.status(200).json(history);
        } catch (error: any) {
            logger.error(`Failed to fetch payment history: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async getTransactionDetails(req: Request, res: Response) {
        try {
            const { transactionId } = req.params;
            const transaction = await PaymentRepository.getDetails(transactionId);
            if (!transaction) {
                logger.warn(`Transaction not found: ${transactionId}`);
                return res.status(404).json({ error: "Transaction not found" });
            }
            logger.info('Fetched transaction details', { transactionId });
            res.status(200).json(transaction);
        } catch (error: any) {
            logger.error(`Failed to fetch transaction details: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }
}

export default PaymentController;
