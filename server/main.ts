import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { UseCaseFactory } from "./infrastructure/factories/UseCaseFactory.ts";

const app = new Application();
const router = new Router();

// Instanciando casos de uso
const orderUseCases = UseCaseFactory.createOrderUseCases();
const productUseCases = UseCaseFactory.createProductUseCases();
const customerUseCases = UseCaseFactory.createCustomerUseCases();
const paymentUseCases = UseCaseFactory.createPaymentUseCases();
const supportTicketUseCases = UseCaseFactory.createSupportTicketUseCases();

// Rotas para pedidos
router.post("/orders", async (ctx) => {
	const body = await ctx.request.body().value;
	await orderUseCases.create.execute(body);
	ctx.response.status = 201;
});

router.put("/orders/:id", async (ctx) => {
	const body = await ctx.request.body().value;
	const { id } = ctx.params;
	await orderUseCases.update.execute({ ...body, id });
	ctx.response.status = 200;
});

router.delete("/orders/:id", async (ctx) => {
	const { id } = ctx.params;
	await orderUseCases.cancel.execute(id);
	ctx.response.status = 200;
});

router.get("/orders", async (ctx) => {
	const orders = await orderUseCases.list.execute();
	ctx.response.body = orders;
});

router.get("/orders/:id", async (ctx) => {
	const { id } = ctx.params;
	const order = await orderUseCases.detail.execute(id);
	ctx.response.body = order;
});

// Rotas para produtos
router.post("/products", async (ctx) => {
	const body = await ctx.request.body().value;
	await productUseCases.add.execute(body);
	ctx.response.status = 201;
});

router.put("/products/:id", async (ctx) => {
	const body = await ctx.request.body().value;
	const { id } = ctx.params;
	await productUseCases.update.execute({ ...body, id });
	ctx.response.status = 200;
});

router.delete("/products/:id", async (ctx) => {
	const { id } = ctx.params;
	await productUseCases.remove.execute(id);
	ctx.response.status = 200;
});

router.get("/products", async (ctx) => {
	const products = await productUseCases.list.execute();
	ctx.response.body = products;
});

router.get("/products/:id", async (ctx) => {
	const { id } = ctx.params;
	const product = await productUseCases.detail.execute(id);
	ctx.response.body = product;
});

// Rotas para clientes
router.post("/customers", async (ctx) => {
	const body = await ctx.request.body().value;
	await customerUseCases.register.execute(body);
	ctx.response.status = 201;
});

router.put("/customers/", async (ctx) => {
	const body = await ctx.request.body().value;
	const { id } = ctx.params;
	await customerUseCases.update.execute({ ...body, id });
	ctx.response.status = 200;
});

router.delete("/customers/", async (ctx) => {
	const { id } = ctx.params;
	await customerUseCases.remove.execute(id);
	ctx.response.status = 200;
});

router.get("/customers", async (ctx) => {
	const customers = await customerUseCases.list.execute();
	ctx.response.body = customers;
});

router.get("/customers/", async (ctx) => {
	const { id } = ctx.params;
	const customer = await customerUseCases.detail.execute(id);
	ctx.response.body = customer;
});

// Rotas para pagamentos
router.post("/payments", async (ctx) => {
	const body = await ctx.request.body().value;
	await paymentUseCases.process.execute(body);
	ctx.response.status = 201;
});

router.post("/payments/refund", async (ctx) => {
	const body = await ctx.request.body().value;
	await paymentUseCases.refund.execute(body);
	ctx.response.status = 200;
});

router.get("/payments/", async (ctx) => {
	const { id } = ctx.params;
	const payment = await paymentUseCases.detail.execute(id);
	ctx.response.body = payment;
});

// Rotas para tickets de suporte
router.post("/support-tickets", async (ctx) => {
	const body = await ctx.request.body().value;
	await supportTicketUseCases.create.execute(body);
	ctx.response.status = 201;
});

router.put("/support-tickets/", async (ctx) => {
	const body = await ctx.request.body().value;
	const { id } = ctx.params;
	await supportTicketUseCases.update.execute({ ...body, id });
	ctx.response.status = 200;
});

router.delete("/support-tickets/", async (ctx) => {
	const { id } = ctx.params;
	await supportTicketUseCases.close.execute(id);
	ctx.response.status = 200;
});

router.get("/support-tickets", async (ctx) => {
	const tickets = await supportTicketUseCases.list.execute();
	ctx.response.body = tickets;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
