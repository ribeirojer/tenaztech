import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { SupabaseUserRepository } from './infrastructure/repositories/SupabaseUserRepository.ts';
import { CreateUserUseCase } from './application/use_cases/CreateUserUseCase.ts';
import { UpdateUserUseCase } from './application/use_cases/UpdateUserUseCase.ts';
import { UserController } from './interface/controllers/UserController.ts';

import { SupabaseOrderRepository } from './infrastructure/repositories/SupabaseOrderRepository.ts';
import { CreateOrderUseCase } from './application/use_cases/CreateOrderUseCase.ts';
import { UpdateOrderUseCase } from './application/use_cases/UpdateOrderUseCase.ts';
import { OrderController } from './interface/controllers/OrderController.ts';

const userRepository = new SupabaseUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, updateUserUseCase);

const orderRepository = new SupabaseOrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const orderController = new OrderController(createOrderUseCase, updateOrderUseCase);

const router = new Router();
router.post('/users', (ctx) => userController.create(ctx));
router.put('/users/:id', (ctx) => userController.update(ctx));

router.post('/orders', (ctx) => orderController.create(ctx));
router.put('/orders/:id', (ctx) => orderController.update(ctx));

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
