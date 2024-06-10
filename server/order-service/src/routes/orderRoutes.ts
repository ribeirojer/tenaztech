import express from 'express';
import * as orderController from '../controllers/orderController';
import { PreferenceController } from "../controllers/paymentController";

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.patch('/:id/status', orderController.updateOrderStatus);
router.get('/track/:trackingCode', orderController.trackOrderStatus);

router.post('/preference', PreferenceController.createPreference)

export default router;

/** , {
  body: t.Object({
    items: t.Array(t.Object({
      title: t.String(),
      quantity: t.Number(),
      currency_id: t.String(),
      unit_price: t.Number()
    }))
  })}*/ 