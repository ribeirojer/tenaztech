
// Payment routes
router.post("/payments", PaymentController.process);
router.post("/payments/refund", PaymentController.refund);
router.get("/payments/:id", PaymentController.detail);
