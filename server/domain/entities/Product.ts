import type { Price } from "../value-objects/Price.ts";

export class Product {
	constructor(
		public id: string,
		public name: string,
		public description: string,
		public price: Price,
		public categoryId: string,
		public stock: number,
		public imageUrl: string,
		public createdAt: Date,
		public updatedAt: Date,
		public category: string,
		public brand: string,
		public rating: number,
	) {}
}
