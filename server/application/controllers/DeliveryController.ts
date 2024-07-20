import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory";

const deliveryUseCases = UseCaseFactory.createDeliveryUseCases();

export class DeliveryController {
    static async schedule(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        await deliveryUseCases.schedule.execute(body);
        ctx.response.status = 201;
    }
    static async updateDate(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        const { id } = ctx.params;
        await deliveryUseCases.updateDate.execute({ ...body, id });
        ctx.response.status = 200;
    }
    static async notifyDelay(ctx: RouterContext) {
        const body = await ctx.request.body().value;
        const { id } = ctx.params;
        await deliveryUseCases.notifyDelay.execute({ ...body, id });
        ctx.response.status = 200;
    }
}
   