import { WishlistRepository } from "../../../domain/interfaces/WishlistRepository.ts";
import { Wishlist } from "../../../domain/entities/Wishlist.ts";

export class ListWishlistsUseCase {
	constructor(private wishlistRepository: WishlistRepository) {}

	async execute(userId: string): Promise<Wishlist[]> {
		return await this.wishlistRepository.getByCustomerId(userId);
	}
}
