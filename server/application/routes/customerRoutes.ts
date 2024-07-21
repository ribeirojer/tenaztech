import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/customers", ({ response }) => {
  // Lista todos os clientes
});

router.post("/customers", async ({ request, response }) => {
  // Cria um novo cliente
});

// Customer routes
router.post("/customers", async (ctx)=>{
  const body = await ctx.request.body({ type: "json" }).value
  await customerUseCases.register.execute(body);
  ctx.response.status = 201;

  CustomerController.register(ctx.request)
})
router.put("/customers/:id", {
  const _body = await ctx.request.body.json();
  const { id } = ctx.request.url.searchParams;
  //await customerUseCases.update.execute({ ...body, id });
  ctx.response.status = 200;

});
router.delete("/customers/:id", {
  const { id } = ctx.params;
  await customerUseCases.remove.execute(id);
  ctx.response.status = 200;

});
router.get("/customers", CustomerController.list);
router.get("/customers/:id", CustomerController.detail);

import { Context } from "https://deno.land/x/oak@v16.1.0/context.ts";

export class CustomerController {
	static async register(ctx: RouterContext<"">) {
}

	static async update(ctx: Context) {
}

	static async remove(ctx: Context) {
}

	static async list(ctx: Context) {
		const customers = await customerUseCases.list.execute();
		ctx.response.body = customers;
	}

	static async detail(ctx: Context) {
		const { id } = ctx.params;
		const customer = await customerUseCases.detail.execute(id);
		ctx.response.body = customer;
	}
}


export default router;
