import { Request, Response } from 'express';
import * as orderRepository from '../repositories/orderRepository';
import { createPreference } from '../services/mercadoPagoService';
import { orderSchema, statusUpdateSchema, updateOrderSchema } from '../schemas/orderSchemas';
import { trackOrder } from '../services/trackingService';
import logger from '../utils/logger';
import { mapOrderData } from '../utils/mapOrderData';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderRepository.getAllOrders();
    logger.info('Fetched all orders');
    res.json(orders);
  } catch (error: any) {
    logger.error(`Failed to fetch orders: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const mappedOrderData = mapOrderData(req.body);

  const { success, error } = orderSchema.safeParse(mappedOrderData);

  if (!success) {
    logger.error(`Validation error: ${error.errors}`);
    return res.status(400).json({ error: error.errors });
  }

  try {
    const preference = await createPreference(mappedOrderData);
    const newOrder = await orderRepository.createOrder({...mappedOrderData, payment_preference_id: preference.id });
    logger.info('Created new order', { orderId: newOrder.id });
    res.json({ order: newOrder, preference });
  } catch (error: any) {
    logger.error(`Failed to create order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderRepository.getOrderById(id);
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
};

export const updateOrder = async (req: Request, res: Response) => {
  const parseResult = updateOrderSchema.safeParse(req.body);

  if (!parseResult.success) {
    logger.error(`Validation error: ${parseResult.error.errors}`);
    return res.status(400).json({ error: parseResult.error.errors });
  }

  try {
    const { id } = req.params;
    const orderUpdates = parseResult.data;
    const updatedOrder = await orderRepository.updateOrder(id, orderUpdates);
    if (!updatedOrder) {
      logger.warn(`Order not found for update: ${id}`);
      return res.status(404).json({ error: 'Order not found' });
    }
    logger.info('Updated order', { orderId: id });
    res.json(updatedOrder);
  } catch (error: any) {
    logger.error(`Failed to update order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOrder = await orderRepository.deleteOrder(id);
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
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const parseResult = statusUpdateSchema.safeParse(req.body);

  if (!parseResult.success) {
    logger.error(`Validation error: ${parseResult.error.errors}`);
    return res.status(400).json({ error: parseResult.error.errors });
  }

  try {
    const { id } = req.params;
    const { status } = parseResult.data;
    const updatedOrder = await orderRepository.updateOrderStatus(id, status);
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
};

export const trackOrderStatus = async (req: Request, res: Response) => {
  const { trackingCode } = req.params;

  try {
    const trackingInfo = await trackOrder(trackingCode);
    logger.info('Tracked order', { trackingCode });
    res.json(trackingInfo);
  } catch (error: any) {
    logger.error(`Failed to track order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};