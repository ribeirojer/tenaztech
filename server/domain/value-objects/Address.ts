// domain/value-objects/Address.ts
export class Address {
	constructor(
		public street: string,
		public city: string,
		public state: string,
		public zipCode: string,
	) {
		if (!street.trim()) throw new Error("Street cannot be empty");
		if (!city.trim()) throw new Error("City cannot be empty");
		if (!state.trim()) throw new Error("State cannot be empty");
		if (!zipCode.trim()) throw new Error("Zip code cannot be empty");
	}
}
