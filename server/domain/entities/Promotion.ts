// domain/entities/Promotion.ts
export class Promotion {
	constructor(
		public id: string,
		public code: string,
		public description: string,
		public discountPercentage: number,
		public startDate: Date,
		public endDate: Date,
		public active: boolean,
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}
