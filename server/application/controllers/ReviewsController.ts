import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const reviewUseCases = UseCaseFactory.createReviewUseCases();

export class ReviewsController {
    static async add(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        await reviewUseCases.add.execute(body);
        ctx.response.status = 201;
    }
    static async update(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        const { id } = ctx.params;
        await reviewUseCases.update.execute({ ...body, id });
        ctx.response.status = 200;
    }
    static async remove(ctx: RouterContext) {
        const { id } = ctx.params;
        await reviewUseCases.remove.execute(id);
        ctx.response.status = 200;
    }
    static async list(ctx: RouterContext) {
        const reviews = await reviewUseCases.list.execute();
        ctx.response.body = reviews;
    }
}
