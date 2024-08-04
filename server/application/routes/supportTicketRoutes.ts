import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const supportTicketUseCases = UseCaseFactory.createSupportTicketUseCases();
const router = new Router();

// Create a support ticket
router.post("/support-tickets", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { name, email, message } = body;
		await supportTicketUseCases.create.execute({ name, email, message });
		logger.info(`Support ticket created: ${JSON.stringify(body)}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Support ticket created successfully" };
	} catch (error) {
		logger.error(`Create support ticket error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});
/** 
// Update a support ticket by ID
router.put("/support-tickets/:id", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { id } = ctx.params;
		await supportTicketUseCases.update.execute(id, { ...body });
		logger.info(`Support ticket with ID: ${id} updated`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Support ticket updated successfully" };
	} catch (error) {
		logger.error(`Update support ticket error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Close a support ticket by ID
router.delete("/support-tickets/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		await supportTicketUseCases.close.execute(id);
		logger.info(`Support ticket with ID: ${id} closed`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Support ticket closed successfully" };
	} catch (error) {
		logger.error(`Close support ticket error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// List all support tickets
router.get("/support-tickets", async (ctx) => {
	try {
		const tickets = await supportTicketUseCases.list.execute();
		logger.info("Fetched all support tickets");
		ctx.response.status = 200;
		ctx.response.body = tickets;
	} catch (error) {
		logger.error(`List support tickets error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});
*/
export default router;
