import Elysia, { t } from "elysia";
import CartController from "../controllers/CartController";

const router = new Elysia()

router.group("/api/carts", (router) => 
  router.get("/:userId", CartController.getCart, {
    params: t.Object({
      userId: t.String(),
    }),
  })
  .post("/:userId/items", CartController.addItemToCart, {
    params: t.Object({
      userId: t.String(),
    }),
    body: t.Object({
      productId: t.String(),
      quantity: t.Number({ min: 1 }),
    }),
  })
  .put("/:userId/items/:itemId", CartController.updateCartItem, {
    params: t.Object({
      userId: t.String(),
      itemId: t.String(),
    }),
    body: t.Object({
      quantity: t.Optional(t.Number({ min: 1 })),
    }),
  })
  .delete("/:userId/items/:itemId", CartController.removeCartItem, {
    params: t.Object({
      userId: t.String(),
      itemId: t.String(),
    }),
  })
  .post("/:userId/checkout", CartController.checkout, {
    params: t.Object({
      userId: t.String(),
    }),
    body: t.Object({
      paymentMethod: t.String(),
      addressId: t.String(),
    }),
  })
);

export default router;

