import type { Address } from "../value-objects/Address.ts";
import type { Email } from "../value-objects/Email.ts";
import type { Password } from "../value-objects/Password.ts";

export class Customer {
	constructor(
		public id: string,
		public name: string,
		public email: Email,
		public password: Password,
		public phone: string,
		public addresses: Address[],
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}
