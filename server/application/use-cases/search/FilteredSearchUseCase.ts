import { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";
import { Product } from "../../../domain/entities/Product.ts";

interface FilteredSearchInput {
	category?: string;
	priceRange?: { min: number; max: number };
	brand?: string;
	sortBy?: "price" | "rating";
}

export class FilteredSearchUseCase {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(input: FilteredSearchInput): Promise<Product[]> {
		const filters: any = {};

		if (input.category) {
			filters.category = input.category;
		}

		if (input.priceRange) {
			filters.price = {
				$gte: input.priceRange.min,
				$lte: input.priceRange.max,
			};
		}

		if (input.brand) {
			filters.brand = input.brand;
		}

		let products = await this.productRepository.find(filters);

		if (input.sortBy) {
			products = products.sort((a, b) => {
				if (input.sortBy === "price") {
					return a.price.getValue() - b.price.getValue();
				} else if (input.sortBy === "rating") {
					return b.rating - a.rating;
				}
				return 0;
			});
		}

		return products;
	}
}
