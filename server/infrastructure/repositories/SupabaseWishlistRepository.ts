import { Wishlist } from "../../domain/entities/Wishlist.ts";
import type { WishlistRepository } from "../../domain/interfaces/WishlistRepository.ts";
import { supabase } from "../config/DatabaseConnection.ts";

export class SupabaseWishlistRepository implements WishlistRepository {
	async save(wishlist: Wishlist): Promise<void> {
		const { error } = await supabase.from("wishlists").insert([
			{
				userId: wishlist.customerId,
				//name: wishlist.name,
				products: wishlist.products,
			},
		]);

		if (error) {
			throw new Error(`Failed to save wishlist: ${error.message}`);
		}
	}

	async update(wishlist: Wishlist): Promise<void> {
		const { error } = await supabase
			.from("wishlists")
			.update({
				//name: wishlist.name,
				products: wishlist.products,
			})
			.eq("id", wishlist.customerId);

		if (error) {
			throw new Error(`Failed to update wishlist: ${error.message}`);
		}
	}

	async findById(wishlistId: string): Promise<Wishlist | null> {
		const { data, error } = await supabase
			.from("wishlists")
			.select("*")
			.eq("id", wishlistId)
			.single();

		if (error && error.code !== "PGRST116") {
			throw new Error(`Failed to find wishlist by ID: ${error.message}`);
		}

		return data;
	}

	async findByUserId(userId: string): Promise<Wishlist[]> {
		const { data, error } = await supabase
			.from("wishlists")
			.select("*")
			.eq("userId", userId);

		if (error) {
			throw new Error(`Failed to find wishlists by user ID: ${error.message}`);
		}

		return data;
	}

	async create(wishlist: Wishlist): Promise<void> {
		const { error } = await supabase.from("wishlists").insert([
			{
				id: wishlist.id,
				customerId: wishlist.customerId,
				createdAt: wishlist.createdAt,
				updatedAt: wishlist.updatedAt,
			},
		]);

		if (error) {
			throw new Error(`Failed to create wishlist: ${error.message}`);
		}
	}

	async addItem(wishlistId: string, itemId: string): Promise<void> {
		const { error } = await supabase.from("wishlist_items").insert([
			{
				wishlistId,
				itemId,
				addedAt: new Date(),
			},
		]);

		if (error) {
			throw new Error(`Failed to add item to wishlist: ${error.message}`);
		}
	}

	async removeItem(wishlistId: string, itemId: string): Promise<void> {
		const { error } = await supabase
			.from("wishlist_items")
			.delete()
			.eq("wishlistId", wishlistId)
			.eq("itemId", itemId);

		if (error) {
			throw new Error(`Failed to remove item from wishlist: ${error.message}`);
		}
	}

	async share(wishlistId: string, email: string): Promise<void> {
		const { error } = await supabase.from("wishlist_shares").insert([
			{
				wishlistId,
				email,
				sharedAt: new Date(),
			},
		]);

		if (error) {
			throw new Error(`Failed to share wishlist: ${error.message}`);
		}
	}

	async getById(wishlistId: string): Promise<Wishlist | null> {
		const { data, error } = await supabase
			.from("wishlists")
			.select("*")
			.eq("id", wishlistId)
			.single();

		if (error) {
			throw new Error(`Failed to get wishlist by id: ${error.message}`);
		}

		if (!data) {
			return null;
		}

		return new Wishlist(
			data.id,
			data.customerId,
			data.name,
			data.createdAt,
			data.updatedAt,
		);
	}

	async getByCustomerId(customerId: string): Promise<Wishlist[]> {
		const { data, error } = await supabase
			.from("wishlists")
			.select("*")
			.eq("customerId", customerId);

		if (error) {
			throw new Error(
				`Failed to get wishlists by customer id: ${error.message}`,
			);
		}

		return data;
	}
}
