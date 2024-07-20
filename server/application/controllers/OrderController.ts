import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { orderUseCases } from "../UseCaseFactory.ts";

export class OrderController {
    static async create(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        await orderUseCases.create.execute(body);
        ctx.response.status = 201;
    }

    static async update(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        const { id } = ctx.params;
        await orderUseCases.update.execute({ ...body, id });
        ctx.response.status = 200;
    }

    static async cancel(ctx: RouterContext) {
        const { id } = ctx.params;
        await orderUseCases.cancel.execute(id);
        ctx.response.status = 200;
    }

    static async list(ctx: RouterContext) {
        const orders = await orderUseCases.list.execute();
        ctx.response.body = orders;
    }

    static async detail(ctx: RouterContext) {
        const { id } = ctx.params;
        const order = await orderUseCases.detail.execute(id);
        ctx.response.body = order;
    }
}
