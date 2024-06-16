import type { Context } from "../interfaces/ElysiaContext";
import { CartRepository } from "../repositories/CartRepository";
import logger from "../utils/logger";

class CartController {
	static async getCart({ params, set }: Context) {
		const { userId } = params;

		try {
			const cart = await CartRepository.getCartByUserId(userId);
			set.status = 200;
			logger.info("Cart retrieved successfully", { userId: userId });
			return cart;
		} catch (error) {
			set.status = 400;
			logger.error(`Failed to get cart: ${error}`, { userId: userId });
			return { error: error };
		}
	}

	static async addItemToCart({ params, body, set }: Context) {
		const { userId } = params;
		const { productId, quantity } = body;

		try {
			const updatedCart = await CartRepository.addItem(
				userId,
				productId,
				quantity,
			);
			set.status = 201;
			logger.info("Item added to cart successfully", {
				userId: params.userId,
				productId: body.productId,
			});
			return updatedCart;
		} catch (error) {
			set.status = 400;
			logger.error(`Failed to add item to cart: ${error}`, {
				userId: params.userId,
				productId: body.productId,
			});
			return { error: error };
		}
	}

	static async updateCartItem({ params, body, set }: Context) {
		const { userId, itemId } = params;
		const { quantity } = body;

		try {
			const updatedCart = await CartRepository.updateItem(
				userId,
				itemId,
				quantity,
			);
			set.status = 200;
			logger.info("Cart item updated successfully", {
				userId: userId,
				itemId: itemId,
			});
			return updatedCart;
		} catch (error) {
			set.status = 400;
			logger.error(`Failed to update cart item: ${error}`, {
				userId: userId,
				itemId: itemId,
			});
			return { error: error };
		}
	}

	static async removeCartItem({ params, set }: Context) {
		const { userId, itemId } = params;

		try {
			const updatedCart = await CartRepository.removeItem(userId, itemId);
			set.status = 200;
			logger.info("Item removed from cart successfully", {
				userId: userId,
				itemId: itemId,
			});
			return updatedCart;
		} catch (error) {
			set.status = 400;
			logger.error(`Failed to remove item from cart: ${error}`, {
				userId: userId,
				itemId: itemId,
			});
			return { error: error };
		}
	}

	static async checkout({ params, body, set }: Context) {
		const { userId } = params;
		const { paymentMethod, addressId } = body;

		try {
			const order = await CartRepository.checkout(
				userId,
				paymentMethod,
				addressId,
			);
			set.status = 201;
			logger.info("Checkout completed successfully", { userId: userId });
			return order;
		} catch (error) {
			set.status = 400;
			logger.error(`Failed to checkout: ${error}`, { userId: userId });
			return { error: error };
		}
	}
}

export default CartController;
