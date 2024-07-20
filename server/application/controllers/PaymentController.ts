import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { paymentUseCases } from "../UseCaseFactory.ts";

export class PaymentController {
    static async process(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        await paymentUseCases.process.execute(body);
        ctx.response.status = 201;
    }

    static async refund(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        await paymentUseCases.refund.execute(body);
        ctx.response.status = 200;
    }

    static async detail(ctx: RouterContext) {
        const { id } = ctx.params;
        const payment = await paymentUseCases.detail.execute(id);
        ctx.response.body = payment;
    }
}
