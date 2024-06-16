describe("Product Review Routes", () => {
	describe("POST /api/products/:productId/reviews", () => {
		it("Should add a review to a product", async () => {
			const productId = "validProductId"; // Substitua pelo ID de um produto válido no seu banco de dados de teste
			const newReview = {
				userId: "validUserId",
				rating: 5,
				comment: "Great product!",
			};
			const response = await request(app)
				.post(`/api/products/${productId}/reviews`)
				.send(newReview);
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("userId", newReview.userId);
			expect(response.body).toHaveProperty("rating", newReview.rating);
			expect(response.body).toHaveProperty("comment", newReview.comment);
		});

		it("Should return 400 if the request body is invalid", async () => {
			const productId = "validProductId"; // Substitua pelo ID de um produto válido no seu banco de dados de teste
			const invalidReview = {
				userId: "validUserId",
				rating: 6, // Invalid rating, should be between 1 and 5
			};
			const response = await request(app)
				.post(`/api/products/${productId}/reviews`)
				.send(invalidReview);
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
		});

		it("Should return 404 if the product is not found", async () => {
			const productId = "invalidProductId";
			const newReview = {
				userId: "validUserId",
				rating: 5,
				comment: "Great product!",
			};
			const response = await request(app)
				.post(`/api/products/${productId}/reviews`)
				.send(newReview);
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error", "Product not found");
		});
	});
});
