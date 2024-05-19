import request from 'supertest';
import { app } from '../src/app';
import { describe, it, expect, vi } from 'vitest'
import { trackOrder } from '../src/services/trackingService';
import * as orderRepository from '../src/repositories/orderRepository';
import { createPreference } from '../src/services/mercadoPagoService';

vi.mock('../src/repositories/orderRepository');
vi.mock('../src/services/mercadoPagoService');
vi.mock('../src/services/trackingService');

describe('Order API', () => {
  describe('GET /orders', () => {
    it('should fetch all orders', async () => {
      (orderRepository.getAllOrders as any).mockResolvedValue([]);
      const response = await request(app).get('/orders');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /orders', () => {
    it('should create a new order and return the order and preference', async () => {
      const mockOrder = {
        customer_name: 'John Doe',
        customer_email: 'john.doe@example.com',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'AN',
          zip: '12345',
          country: 'Country'
        },
        items: [{ title: 'Product 1', quantity: 2, price: 50.00 }],
        total_amount: 100.00,
        currency: 'BRL',
        payment_method: 'credit_card'
      };

      const createdOrder = { ...mockOrder, id: '123' };
      const preference = { id: 'pref_123', init_point: 'http://mercadopago.com/init' };

      (orderRepository.createOrder as any).mockResolvedValue(createdOrder);
      (createPreference as any).mockResolvedValue(preference);

      const response = await request(app)
        .post('/orders')
        .send(mockOrder)
        .expect(200);

      expect(response.body.order).toEqual(createdOrder);
      expect(response.body.preference).toEqual(preference);
    });

    it('should return a 400 error if validation fails', async () => {
      const invalidOrder = {
        customer_name: 'John Doe',
        customer_email: 'john.doe@example.com',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'AN',
          zip: '12345',
          country: 'Country'
        },
        items: [{ title: 'Product 1', quantity: -2, price: 50.00 }],
        total_amount: 100.00,
        currency: 'BRL',
        payment_method: 'credit_card'
      };

      const response = await request(app)
        .post('/orders')
        .send(invalidOrder)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /orders/:id', () => {
    it('should fetch a single order', async () => {
      const mockOrder = { id: '1', title: 'Test Order', quantity: 1, price: 100 };
      (orderRepository.getOrderById as any).mockResolvedValue(mockOrder);

      const response = await request(app).get('/orders/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
    });

    it('should return a 404 error if order not found', async () => {
      (orderRepository.getOrderById as any).mockResolvedValue(null);

      const response = await request(app).get('/orders/1');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Order not found');
    });
  });

  describe('PUT /orders/:id', () => {
    it('should update an order', async () => {
      const updatedOrder = {
        id: '1',
        title: 'Updated Order',
        quantity: 2,
        price: 200
      };
      (orderRepository.updateOrder as any).mockResolvedValue(updatedOrder);

      const response = await request(app).put('/orders/1').send(updatedOrder);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Updated Order');
    });

    it('should return a 404 error if order not found', async () => {
      (orderRepository.updateOrder as any).mockResolvedValue(null);

      const response = await request(app).put('/orders/1').send({ title: 'Updated Order' });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Order not found');
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should delete an order', async () => {
      (orderRepository.deleteOrder as any).mockResolvedValue({ message: 'Order deleted' });

      const response = await request(app).delete('/orders/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Order deleted');
    });

    it('should return a 404 error if order not found', async () => {
      (orderRepository.deleteOrder as any).mockResolvedValue(null);

      const response = await request(app).delete('/orders/1');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Order not found');
    });
  });

  describe('PATCH /orders/:id/status', () => {
    it('should update the status of an order', async () => {
      const mockOrder = {
        id: '123',
        status: 'shipped'
      };

      (orderRepository.updateOrderStatus as any).mockResolvedValue(mockOrder);

      const response = await request(app)
        .patch('/orders/123/status')
        .send({ status: 'shipped' })
        .expect(200);

      expect(response.body).toEqual(mockOrder);
    });

    it('should return a 400 error if validation fails', async () => {
      const response = await request(app)
        .patch('/orders/123/status')
        .send({ status: 'invalid_status' })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('should return a 404 error if order not found', async () => {
      (orderRepository.updateOrderStatus as any).mockResolvedValue(null);

      const response = await request(app)
        .patch('/orders/123/status')
        .send({ status: 'shipped' })
        .expect(404);

      expect(response.body.error).toBe('Order not found');
    });
  });

  describe('GET /orders/track/:trackingCode', () => {
    it('should return tracking information for an order', async () => {
      const mockTrackingInfo = {
        status: 'in_transit',
        last_location: 'Distribution Center',
        estimated_delivery: '2024-05-25'
      };

      (trackOrder as any).mockResolvedValue(mockTrackingInfo);

      const response = await request(app)
        .get('/orders/track/TRACK123456')
        .expect(200);

      expect(response.body).toEqual(mockTrackingInfo);
    });

    it('should return a 500 error if tracking fails', async () => {
      (trackOrder as any).mockRejectedValue(new Error('Failed to track order'));

      const response = await request(app)
        .get('/orders/track/TRACK123456')
        .expect(500);

      expect(response.body.error).toBe('Failed to track order');
    });
  });
});
