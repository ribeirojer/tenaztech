
// Support ticket routes
router.post("/support-tickets", SupportTicketController.create);
router.put("/support-tickets/:id", SupportTicketController.update);
router.delete("/support-tickets/:id", SupportTicketController.close);
router.get("/support-tickets", SupportTicketController.list);
