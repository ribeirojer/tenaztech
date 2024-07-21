import { Router } from "https://deno.land/x/oak/mod.ts";
/*import { CustomerController } from "./application/controllers/CustomerController.ts";
import { OrderController } from "./application/controllers/OrderController.ts";
import { PaymentController } from "./application/controllers/PaymentController.ts";
import { ProductController } from "./application/controllers/ProductController.ts";
import { SupportTicketController } from "./application/controllers/SupportTicketController.ts";
import { WishlistController } from "./application/controllers/WishlistController.ts";
import { ReviewsController } from "./application/controllers/ReviewsController.ts";
import { RecommendationsController } from "./application/controllers/RecommendationsController.ts";
import { DeliveryController } from "./application/controllers/DeliveryController.ts";
*/
import { AuthController } from "./application/controllers/AuthController.ts";
import { NewsletterController } from "./application/controllers/NewsletterController.ts";

const router = new Router();
/** 
// Customer routes
router.post("/customers", CustomerController.register);
router.put("/customers/:id", CustomerController.update);
router.delete("/customers/:id", CustomerController.remove);
router.get("/customers", CustomerController.list);
router.get("/customers/:id", CustomerController.detail);

// Order routes
router.post("/orders", OrderController.create);
router.put("/orders/:id", OrderController.update);
router.delete("/orders/:id", OrderController.cancel);
router.get("/orders", OrderController.list);
router.get("/orders/:id", OrderController.detail);

// Payment routes
router.post("/payments", PaymentController.process);
router.post("/payments/refund", PaymentController.refund);
router.get("/payments/:id", PaymentController.detail);

// Product routes
router.post("/products", ProductController.add);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.remove);
router.get("/products", ProductController.list);
router.get("/products/:id", ProductController.detail);

// Support ticket routes
router.post("/support-tickets", SupportTicketController.create);
router.put("/support-tickets/:id", SupportTicketController.update);
router.delete("/support-tickets/:id", SupportTicketController.close);
router.get("/support-tickets", SupportTicketController.list);

router.post("/wishlists", WishlistController.create);
router.post("/wishlists/:id/items", WishlistController.add);
router.delete("/wishlists/:wishlistId/items/:itemId", WishlistController.remove);
router.post("/wishlists/:id/share", WishlistController.share);
router.get("/wishlists", WishlistController.list);

//router.post("/carts",);
//router.post("/carts/:id/items",);
//router.delete("/carts/:id/items/:itemId",);
//router.get("/carts/:id",);

router.post("/reviews", ReviewsController.add);
router.get("/reviews", ReviewsController.list);
//router.get("/reviews/:id", ReviewsController);
router.put("/reviews/:id", ReviewsController.update);
router.delete("/reviews/:id", ReviewsController.remove);

router.get("/recommendations", RecommendationsController.getRecommendations)
router.get("/related-products", RecommendationsController.getRelatedProducts)

router.post("/deliveries", DeliveryController.schedule)
router.put("/deliveries/:id/date", DeliveryController.updateDate)
router.post("/deliveries/:id/notify-delay", DeliveryController.notifyDelay)
*/
router.post("/auth/login", AuthController.login);
router.post("/auth/logout", AuthController.logout);
router.post("/auth/register", AuthController.register);
router.post("/auth/recover-password", AuthController.recoverPassword);

router.post("/newsletters/subscribe", NewsletterController.subscribe);
router.post("/newsletters/unsubscribe", NewsletterController.unsubscribe);
router.post("/newsletters/send", NewsletterController.send);
router.get("/newsletters", NewsletterController.list);
router.get("/newsletters/:id", NewsletterController.detail);

export default router;
