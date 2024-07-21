import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { supportTicketUseCases } from "../UseCaseFactory.ts";

export class SupportTicketController {
	static async create(ctx: RouterContext) {
		const body = await ctx.request.body().value;
		await supportTicketUseCases.create.execute(body);
		ctx.response.status = 201;
	}

	static async update(ctx: RouterContext) {
		const body = await ctx.request.body().value;
		const { id } = ctx.params;
		await supportTicketUseCases.update.execute({ ...body, id });
		ctx.response.status = 200;
	}

	static async close(ctx: RouterContext) {
		const { id } = ctx.params;
		await supportTicketUseCases.close.execute(id);
		ctx.response.status = 200;
	}

	static async list(ctx: RouterContext) {
		const tickets = await supportTicketUseCases.list.execute();
		ctx.response.body = tickets;
	}
}
