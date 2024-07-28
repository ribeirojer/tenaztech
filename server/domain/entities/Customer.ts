import type { Address } from "../value-objects/Address.ts";
import type { Email } from "../value-objects/Email.ts";
import type { Password } from "../value-objects/Password.ts";

export class Customer {
	isEmailVerified: boolean | undefined;
	isSuspended: boolean | undefined;
	constructor(
		public id: string,
		public name: string,
		public email: Email,
		public password: Password,
		public phone: string,
		public addresses: Address[] | null,
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}
