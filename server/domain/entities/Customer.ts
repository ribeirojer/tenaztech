import { Email } from "../value-objects/Email.ts";
import { Password } from "../value-objects/Password.ts";
import { Address } from "../value-objects/Address.ts";

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
