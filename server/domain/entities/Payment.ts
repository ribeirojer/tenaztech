export class Payment {
	orderId: string;
	status: string;
	constructor(
		public id: string,
		public paymentDate: Date,
		public amount: number,
		public currency: string,
		public description: string,
	) {}
}
