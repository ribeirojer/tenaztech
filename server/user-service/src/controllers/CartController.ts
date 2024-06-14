import { CartRepository } from '../repositories/CartRepository';
import logger from '../utils/logger';

class CartController {
    static async getCart({ params, set }: any) {
        try {
            const cart = await CartRepository.getCartByUserId(params.userId);
            set.status = 200;
            logger.info('Cart retrieved successfully', { userId: params.userId });
            return cart;
        } catch (error) {
            set.status = 400;
            logger.error(`Failed to get cart: ${error}`, { userId: params.userId });
            return { error: error };
        }
    }

    static async addItemToCart({ params, body, set }: any) {
        try {
            const updatedCart = await CartRepository.addItem(params.userId, body.productId, body.quantity);
            set.status = 201;
            logger.info('Item added to cart successfully', { userId: params.userId, productId: body.productId });
            return updatedCart;
        } catch (error) {
            set.status = 400;
            logger.error(`Failed to add item to cart: ${error}`, { userId: params.userId, productId: body.productId });
            return { error: error };
        }
    }

    static async updateCartItem({ params, body, set }: any) {
        try {
            const updatedCart = await CartRepository.updateItem(params.userId, params.itemId, body.quantity);
            set.status = 200;
            logger.info('Cart item updated successfully', { userId: params.userId, itemId: params.itemId });
            return updatedCart;
        } catch (error) {
            set.status = 400;
            logger.error(`Failed to update cart item: ${error}`, { userId: params.userId, itemId: params.itemId });
            return { error: error };
        }
    }

    static async removeCartItem({ params, set }: any) {
        try {
            const updatedCart = await CartRepository.removeItem(params.userId, params.itemId);
            set.status = 200;
            logger.info('Item removed from cart successfully', { userId: params.userId, itemId: params.itemId });
            return updatedCart;
        } catch (error) {
            set.status = 400;
            logger.error(`Failed to remove item from cart: ${error}`, { userId: params.userId, itemId: params.itemId });
            return { error: error };
        }
    }

    static async checkout({ params, body, set }: any) {
        try {
            const order = await CartRepository.checkout(params.userId, body.paymentMethod, body.addressId);
            set.status = 201;
            logger.info('Checkout completed successfully', { userId: params.userId });
            return order;
        } catch (error) {
            set.status = 400;
            logger.error(`Failed to checkout: ${error}`, { userId: params.userId });
            return { error: error };
        }
    }
}

export default CartController;
