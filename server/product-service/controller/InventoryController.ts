import type { IResponse } from "../interfaces/Response.ts";
import type { InventoryRepository } from "../repositories/InventoryRepository.ts";
import { logger } from "../utils/logger.ts";

export class InventoryController {
	constructor(private inventoryRepository: InventoryRepository) {}

	getStockLevel = async ({
		params,
		response,
	}: { params: { productId: string }; response: IResponse }) => {
		try {
			logger.info(`Fetching stock level for product ID: ${params.productId}`);
			response.body = await this.inventoryRepository.getStockLevel(
				params.productId,
			);
			logger.debug(
				`Stock level for product ID: ${params.productId} fetched successfully`,
			);
		} catch (error) {
			logger.error(`Error fetching stock level: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar nível de estoque" };
		}
	};

	getAllStockLevels = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching all stock levels");
			response.body = await this.inventoryRepository.getAllStockLevels();
			logger.debug("All stock levels fetched successfully");
		} catch (error) {
			logger.error(`Error fetching all stock levels: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar todos os níveis de estoque" };
		}
	};

	updateStockLevel = async ({
		params,
		request,
		response,
	}: { params: { productId: string }; request: any; response: IResponse }) => {
		try {
			logger.info(`Updating stock level for product ID: ${params.productId}`);
			const { quantity } = await request.body().value;
			response.body = await this.inventoryRepository.updateStockLevel(
				params.productId,
				quantity,
			);
			logger.debug(
				`Stock level for product ID: ${params.productId} updated successfully`,
			);
		} catch (error) {
			logger.error(`Error updating stock level: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao atualizar nível de estoque" };
		}
	};

	adjustStockLevel = async ({
		params,
		request,
		response,
	}: { params: { productId: string }; request: any; response: IResponse }) => {
		try {
			logger.info(`Adjusting stock level for product ID: ${params.productId}`);
			const { quantity } = await request.body().value;
			response.body = await this.inventoryRepository.adjustStockLevel(
				params.productId,
				quantity,
			);
			logger.debug(
				`Stock level for product ID: ${params.productId} adjusted successfully`,
			);
		} catch (error) {
			logger.error(`Error adjusting stock level: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao ajustar nível de estoque" };
		}
	};

	checkAvailability = async ({
		params,
		response,
	}: { params: { productId: string }; response: IResponse }) => {
		try {
			logger.info(`Checking availability for product ID: ${params.productId}`);
			response.body = await this.inventoryRepository.checkAvailability(
				params.productId,
			);
			logger.debug(
				`Availability for product ID: ${params.productId} checked successfully`,
			);
		} catch (error) {
			logger.error(`Error checking product availability: ${error.message}`);
			response.status = 500;
			response.body = {
				message: "Erro ao verificar disponibilidade do produto",
			};
		}
	};

	getAllAvailability = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching all product availability");
			response.body = await this.inventoryRepository.getAllAvailability();
			logger.debug("All product availability fetched successfully");
		} catch (error) {
			logger.error(`Error fetching all product availability: ${error.message}`);
			response.status = 500;
			response.body = {
				message: "Erro ao buscar disponibilidade de todos os produtos",
			};
		}
	};

	setLowStockAlert = async ({
		request,
		response,
	}: { request: any; response: IResponse }) => {
		try {
			logger.info("Setting low stock alert");
			const { productId, threshold } = await request.body().value;
			response.body = await this.inventoryRepository.setLowStockAlert(
				productId,
				threshold,
			);
			logger.debug(
				`Low stock alert set for product ID: ${productId} with threshold: ${threshold}`,
			);
		} catch (error) {
			logger.error(`Error setting low stock alert: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao configurar alerta de baixo estoque" };
		}
	};

	getLowStockProducts = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching low stock products");
			response.body = await this.inventoryRepository.getLowStockProducts();
			logger.debug("Low stock products fetched successfully");
		} catch (error) {
			logger.error(`Error fetching low stock products: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos com baixo estoque" };
		}
	};
}
