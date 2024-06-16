import type { IResponse } from "../interfaces/Response.ts";
import type { ReviewRepository } from "../repositories/ReviewRepository.ts";
import { logger } from "../utils/logger.ts";

export class ReviewController {
	constructor(private reviewRepository: ReviewRepository) {}

	addReview = async ({
		params,
		request,
		response,
	}: { params: { productId: string }; request: any; response: IResponse }) => {
		try {
			const { productId } = params;
			const reviewData = await request.body().value;
			logger.info(`Adding review for product ID: ${productId}`);
			response.body = await this.reviewRepository.addReview(
				productId,
				reviewData,
			);
			logger.debug(`Review added for product ID: ${productId}`);
		} catch (error) {
			logger.error(`Error adding review: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao adicionar a avaliação" };
		}
	};

	getReviews = async ({
		params,
		response,
	}: { params: { productId: string }; response: IResponse }) => {
		try {
			const { productId } = params;
			logger.info(`Fetching reviews for product ID: ${productId}`);
			response.body = await this.reviewRepository.getReviews(productId);
			logger.debug(`Reviews fetched for product ID: ${productId}`);
		} catch (error) {
			logger.error(`Error fetching reviews: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar avaliações" };
		}
	};

	updateReview = async ({
		params,
		request,
		response,
	}: {
		params: { productId: string; reviewId: string };
		request: any;
		response: any;
	}) => {
		try {
			const { productId, reviewId } = params;
			const reviewData = await request.body().value;
			logger.info(
				`Updating review ID: ${reviewId} for product ID: ${productId}`,
			);
			response.body = await this.reviewRepository.updateReview(
				productId,
				reviewId,
				reviewData,
			);
			logger.debug(
				`Review ID: ${reviewId} updated for product ID: ${productId}`,
			);
		} catch (error) {
			logger.error(`Error updating review: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao atualizar a avaliação" };
		}
	};

	deleteReview = async ({
		params,
		response,
	}: {
		params: { productId: string; reviewId: string };
		response: IResponse;
	}) => {
		try {
			const { productId, reviewId } = params;
			logger.info(
				`Deleting review ID: ${reviewId} for product ID: ${productId}`,
			);
			response.body = await this.reviewRepository.deleteReview(
				productId,
				reviewId,
			);
			logger.debug(
				`Review ID: ${reviewId} deleted for product ID: ${productId}`,
			);
		} catch (error) {
			logger.error(`Error deleting review: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao deletar a avaliação" };
		}
	};
}
