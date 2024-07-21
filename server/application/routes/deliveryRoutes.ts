
router.post("/deliveries", DeliveryController.schedule)
router.put("/deliveries/:id/date", DeliveryController.updateDate)
router.post("/deliveries/:id/notify-delay", DeliveryController.notifyDelay)
