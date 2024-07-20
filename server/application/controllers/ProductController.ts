import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { productUseCases } from "../UseCaseFactory.ts";

export class ProductController {
    static async add(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        await productUseCases.add.execute(body);
        ctx.response.status = 201;
    }

    static async update(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        const { id } = ctx.params;
        await productUseCases.update.execute({ ...body, id });
        ctx.response.status = 200;
    }

    static async remove(ctx: RouterContext) {
        const { id } = ctx.params;
        await productUseCases.remove.execute(id);
        ctx.response.status = 200;
    }

    static async list(ctx: RouterContext) {
        const products = await productUseCases.list.execute();
        ctx.response.body = products;
    }

    static async detail(ctx: RouterContext) {
        const { id } = ctx.params;
        const product = await productUseCases.detail.execute(id);
        ctx.response.body = product;
    }
}
