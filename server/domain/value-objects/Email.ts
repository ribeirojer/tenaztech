// domain/value-objects/Email.ts
export class Email {
	constructor(private email: string) {
		if (!this.isValidEmail(email)) {
			throw new Error("Invalid email address");
		}
	}

	private isValidEmail(email: string): boolean {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(email);
	}

	getValue(): string {
		return this.email;
	}
}
