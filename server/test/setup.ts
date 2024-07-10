import { Application } from 'https://deno.land/x/oak/mod.ts';
import { SupabaseOrderRepository } from '../infrastructure/repositories/SupabaseOrderRepository.ts';
import { CreateOrderUseCase } from '../application/use_cases/CreateOrderUseCase.ts';
import { UpdateOrderUseCase } from '../application/use_cases/UpdateOrderUseCase.ts';
import { OrderController } from '../interface/controllers/OrderController.ts';

export function createApp() {
    const orderRepository = new SupabaseOrderRepository();
    const createOrderUseCase = new CreateOrderUseCase(orderRepository);
    const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
    const orderController = new OrderController(createOrderUseCase, updateOrderUseCase);

    const app = new Application();
    const router = new Router();
    router.post('/orders', (ctx) => orderController.create(ctx));
    router.put('/orders/:id', (ctx) => orderController.update(ctx));

    app.use(router.routes());
    app.use(router.allowedMethods());

    return app;
}
