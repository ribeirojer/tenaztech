import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const wishlistUseCases = UseCaseFactory.createWishlistUseCases();

export class WishlistController {
	static async create(ctx: RouterContext) {
		const body = await ctx.request.body().value;
		await wishlistUseCases.create.execute(body);
		ctx.response.status = 201;
	}
	static async add(ctx: RouterContext) {
		const body = await ctx.request.body().value;
		const { id } = ctx.params;
		await wishlistUseCases.add.execute({ ...body, id });
		ctx.response.status = 200;
	}
	static async remove(ctx: RouterContext) {
		const { wishlistId, itemId } = ctx.params;
		await wishlistUseCases.remove.execute(wishlistId);
		ctx.response.status = 200;
	}
	static async share(ctx: RouterContext) {
		const { id } = ctx.params;
		const wishlist = await wishlistUseCases.share.execute(id);
		ctx.response.body = wishlist;
	}
	static async list(ctx: RouterContext) {
		const wishlists = await wishlistUseCases.list.execute();
		ctx.response.body = wishlists;
	}
}
