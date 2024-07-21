import { Price } from "../value-objects/Price.ts";

export class Product {
	stock: number;
	constructor(
		public id: string,
		public name: string,
		public description: string,
		public price: Price,
		public categoryId: string,
		public stockQuantity: number,
		public imageUrl: string,
		public createdAt: Date,
		public updatedAt: Date,

		public category: string,
		public brand: string,
		public rating: number,
	) {}
}
