import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { customerUseCases } from "../UseCaseFactory.ts";

export class CustomerController {
	static async register(ctx: RouterContext) {
		const body = await ctx.request.body().value;
		await customerUseCases.register.execute(body);
		ctx.response.status = 201;
	}

	static async update(ctx: RouterContext) {
		const body = await ctx.request.body().value;
		const { id } = ctx.params;
		await customerUseCases.update.execute({ ...body, id });
		ctx.response.status = 200;
	}

	static async remove(ctx: RouterContext) {
		const { id } = ctx.params;
		await customerUseCases.remove.execute(id);
		ctx.response.status = 200;
	}

	static async list(ctx: RouterContext) {
		const customers = await customerUseCases.list.execute();
		ctx.response.body = customers;
	}

	static async detail(ctx: RouterContext) {
		const { id } = ctx.params;
		const customer = await customerUseCases.detail.execute(id);
		ctx.response.body = customer;
	}
}
