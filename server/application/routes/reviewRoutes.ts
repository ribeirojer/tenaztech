
router.post("/reviews", ReviewsController.add);
router.get("/reviews", ReviewsController.list);
//router.get("/reviews/:id", ReviewsController);
router.put("/reviews/:id", ReviewsController.update);
router.delete("/reviews/:id", ReviewsController.remove);
