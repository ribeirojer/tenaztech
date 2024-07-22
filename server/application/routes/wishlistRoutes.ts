import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";
import { logger } from "../../infrastructure/config/logger.ts";

const wishlistUseCases = UseCaseFactory.createWishlistUseCases();
const router = new Router();

// Create a new wishlist
router.post("/wishlists", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		//await wishlistUseCases.create.execute(body);
		logger.info(`Wishlist created: ${JSON.stringify(body)}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Wishlist created successfully" };
	} catch (error) {
		logger.error(`Create wishlist error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Add an item to a wishlist
router.post("/wishlists/:id/items", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { id } = ctx.params;
		await wishlistUseCases.add.execute(id, { ...body,  });
		logger.info(`Item added to wishlist ID: ${id}, Item: ${JSON.stringify(body)}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Item added to wishlist successfully" };
	} catch (error) {
		logger.error(`Add item to wishlist error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Remove an item from a wishlist
router.delete("/wishlists/:wishlistId/items/:itemId", async (ctx) => {
	try {
		const { wishlistId, itemId } = ctx.params;
		await wishlistUseCases.remove.execute(wishlistId, itemId);
		logger.info(`Item ID: ${itemId} removed from wishlist ID: ${wishlistId}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Item removed from wishlist successfully" };
	} catch (error) {
		logger.error(`Remove item from wishlist error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// List all wishlists
router.get("/wishlists", async (ctx) => {
	try {
		const wishlists = await wishlistUseCases.list.execute('');
		logger.info("Fetched all wishlists");
		ctx.response.status = 200;
		ctx.response.body = wishlists;
	} catch (error) {
		logger.error(`List wishlists error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
