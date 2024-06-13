import { Request, Response } from 'express';
import { OrderRepository } from "../repositories/OrderRepository";
import { createPreference } from "../services/mercadoPagoService";
import logger from "../utils/logger";
import { mapOrderData } from "../utils/mapOrderData";
import { orderSchema, statusUpdateSchema } from '../schemas/orderSchemas';
import { trackOrder } from '../services/trackingService';

class OrderController {
    static async createOrder(req: Request, res: Response) {
        const mappedOrderData = mapOrderData(req.body);
        const { success, error } = orderSchema.safeParse(mappedOrderData);

        if (!success) {
            logger.error(`Validation error: ${error.errors}`);
            return res.status(400).json({ error: error.errors });
        }

        try {
            const preference = await createPreference(mappedOrderData);
            const newOrder = await OrderRepository.create({ ...mappedOrderData, payment_preference_id: preference.id });
            logger.info('Created new order', { orderId: newOrder.id });
            res.status(201).json({ order: newOrder, preference });
        } catch (error: any) {
            logger.error(`Failed to create order: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async getOrders(req: Request, res: Response) {
        try {
            const orders = await OrderRepository.getAll();
            logger.info('Fetched all orders');
            res.json(orders);
        } catch (error: any) {
            logger.error(`Failed to fetch orders: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async getOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await OrderRepository.getById(id);
            if (!order) {
                logger.warn(`Order not found: ${id}`);
                return res.status(404).json({ error: 'Order not found' });
            }
            logger.info('Fetched order', { orderId: id });
            res.json(order);
        } catch (error: any) {
            logger.error(`Failed to fetch order: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async updateOrderStatus(req: Request, res: Response) {
        const parseResult = statusUpdateSchema.safeParse(req.body);

        if (!parseResult.success) {
            logger.error(`Validation error: ${parseResult.error.errors}`);
            return res.status(400).json({ error: parseResult.error.errors });
        }

        try {
            const { id } = req.params;
            const { status } = parseResult.data;
            const updatedOrder = await OrderRepository.updateStatus(id, status);
            if (!updatedOrder) {
                logger.warn(`Order not found for status update: ${id}`);
                return res.status(404).json({ error: 'Order not found' });
            }
            logger.info('Updated order status', { orderId: id, status });
            res.json(updatedOrder);
        } catch (error: any) {
            logger.error(`Failed to update order status: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async trackOrder(req: Request, res: Response) {
        const { trackingCode } = req.params;

        try {
            const trackingInfo = await trackOrder(trackingCode);
            logger.info('Tracked order', { trackingCode });
            res.json(trackingInfo);
        } catch (error: any) {
            logger.error(`Failed to track order: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async cancelOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedOrder = await OrderRepository.cancel(id);
            if (!deletedOrder) {
                logger.warn(`Order not found for deletion: ${id}`);
                return res.status(404).json({ error: 'Order not found' });
            }
            logger.info('Deleted order', { orderId: id });
            res.json(deletedOrder);
        } catch (error: any) {
            logger.error(`Failed to delete order: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async processRefund(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await OrderRepository.refund(id);
            res.status(204).send();
        } catch (error: any) {
            logger.error(`Failed to process refund: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async getOrderProducts(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const products = await OrderRepository.getOrderProducts(id);
            res.status(200).json(products);
        } catch (error: any) {
            logger.error(`Failed to get order products: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async applyCoupon(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { couponCode } = req.body;
            const order = await OrderRepository.applyCoupon(id, couponCode);
            res.status(200).json(order);
        } catch (error: any) {
            logger.error(`Failed to apply coupon: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async removeCoupon(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await OrderRepository.removeCoupon(id);
            res.status(200).json(order);
        } catch (error: any) {
            logger.error(`Failed to remove coupon: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async integrateLogistics(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const logisticsInfo = await OrderRepository.integrateLogistics(id, req.body);
            res.status(200).json(logisticsInfo);
        } catch (error: any) {
            logger.error(`Failed to integrate logistics: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }
}

export default OrderController;
