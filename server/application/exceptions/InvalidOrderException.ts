// application/exceptions/InvalidOrderException.ts
export class InvalidOrderException extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidOrderException";
	}
}
