import { Wishlist } from "../entities/Wishlist.ts";

export interface WishlistRepository {
	save(wishlist: Wishlist): Promise<void>;
	update(wishlist: Wishlist): Promise<void>;
	create(wishlist: Wishlist): Promise<void>;
	addItem(wishlistId: string, itemId: string): Promise<void>;
	removeItem(wishlistId: string, itemId: string): Promise<void>;
	share(wishlistId: string, email: string): Promise<void>;
	getById(wishlistId: string): Promise<Wishlist | null>;
	getByCustomerId(customerId: string): Promise<Wishlist[]>;
}
