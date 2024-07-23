import type { WishlistRepository } from "../../../domain/interfaces/WishlistRepository.ts";

export class AddToWishlistUseCase {
	constructor(private wishlistRepository: WishlistRepository) {}

	async execute(wishlistId: string, productId: string): Promise<void> {
		const wishlist = await this.wishlistRepository.getById(wishlistId);
		if (!wishlist) {
			throw new Error("Wishlist not found");
		}
		wishlist.addProduct({ productId, addedAt: new Date() });
		await this.wishlistRepository.addItem(wishlist.id, productId);
	}
}
