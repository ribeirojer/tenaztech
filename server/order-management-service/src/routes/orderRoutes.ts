import express from 'express';
import * as orderController from '../controllers/orderController';

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.patch('/:id/status', orderController.updateOrderStatus);
router.get('/track/:trackingCode', orderController.trackOrderStatus);

export default router;
