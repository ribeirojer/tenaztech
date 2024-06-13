import request from 'supertest';
import { app } from '../src/app';
import { describe, it, expect, vi } from 'vitest'
import { ReviewRepository } from '../src/repositories/ReviewRepository';

vi.mock('../src/repositories/ReviewRepository');

describe('ReviewController', () => {
  describe('POST /orders/:orderId/reviews', () => {
    it('should create a new review', async () => {
      const newReview = { id: '1', rating: 5, comment: 'Great product!' };
      (ReviewRepository.create as any).mockResolvedValue(newReview);
      const response = await request(app)
        .post('/orders/1/reviews')
        .send(newReview);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newReview);
    });

    it('should return 500 if review creation fails', async () => {
      (ReviewRepository.create as any).mockRejectedValue(new Error('Failed to create review'));
      const response = await request(app)
        .post('/orders/1/reviews')
        .send({ rating: 5, comment: 'Great product!' });
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to create review');
    });
  });

  describe('GET /orders/:orderId/reviews', () => {
    it('should fetch reviews for an order', async () => {
      const reviews = [];
      (ReviewRepository.getByOrderId as any).mockResolvedValue(reviews);
      const response = await request(app).get('/orders/1/reviews');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 500 if fetching reviews fails', async () => {
      (ReviewRepository.getByOrderId as any).mockRejectedValue(new Error('Failed to fetch reviews'));
      const response = await request(app).get('/orders/1/reviews');
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to fetch reviews');
    });
  });
});
