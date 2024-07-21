
router.post("/wishlists", WishlistController.create);
router.post("/wishlists/:id/items", WishlistController.add);
router.delete("/wishlists/:wishlistId/items/:itemId", WishlistController.remove);
router.post("/wishlists/:id/share", WishlistController.share);
router.get("/wishlists", WishlistController.list);
