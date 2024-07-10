import { Context } from 'https://deno.land/x/oak/mod.ts';
import { orderSchema } from '../../shared/validations/orderValidation.ts';
import { CreateOrderUseCase } from '../../application/use_cases/CreateOrderUseCase.ts';
import { UpdateOrderUseCase } from '../../application/use_cases/UpdateOrderUseCase.ts';

export class OrderController {
    constructor(
        private createOrderUseCase: CreateOrderUseCase,
        private updateOrderUseCase: UpdateOrderUseCase
    ) {}

    async create(ctx: Context) {
        const { value } = await ctx.request.body();
        const validation = orderSchema.safeParse(value);

        if (!validation.success) {
            ctx.response.status = 400;
            ctx.response.body = { error: validation.error.errors };
            return;
        }

        const { customerId, productIds, totalAmount } = value;
        await this.createOrderUseCase.execute(customerId, productIds, totalAmount);
        ctx.response.status = 201;
    }

    async update(ctx: Context) {
        const { id } = ctx.params;
        const { status } = await ctx.request.body().value;

        try {
            await this.updateOrderUseCase.execute(id!, status);
            ctx.response.status = 200;
        } catch (e) {
            ctx.response.status = 404;
            ctx.response.body = { error: e.message };
        }
    }
}
