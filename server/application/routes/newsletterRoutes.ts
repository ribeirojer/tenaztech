
router.post("/newsletters/subscribe", NewsletterController.subscribe);
router.post("/newsletters/unsubscribe", NewsletterController.unsubscribe);
router.post("/newsletters/send", NewsletterController.send);
router.get("/newsletters", NewsletterController.list);
router.get("/newsletters/:id", NewsletterController.detail);
