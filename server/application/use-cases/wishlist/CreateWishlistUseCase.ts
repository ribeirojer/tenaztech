import { Wishlist } from "../../../domain/entities/Wishlist.ts";
import type { WishlistRepository } from "../../../domain/interfaces/WishlistRepository.ts";

export class CreateWishlistUseCase {
	constructor(private wishlistRepository: WishlistRepository) {}

	async execute(userId: string, name: string): Promise<Wishlist> {
		const now = new Date();
		const wishlist = new Wishlist(userId, name, [], now, now);
		await this.wishlistRepository.create(wishlist);
		return wishlist;
	}
}
