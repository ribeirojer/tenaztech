import type { Wishlist } from "../../../domain/entities/Wishlist.ts";
import type { WishlistRepository } from "../../../domain/interfaces/WishlistRepository.ts";

export class ListWishlistsUseCase {
	constructor(private wishlistRepository: WishlistRepository) {}

	async execute(userId: string): Promise<Wishlist[]> {
		return await this.wishlistRepository.getByCustomerId(userId);
	}
}
