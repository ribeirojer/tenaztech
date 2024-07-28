import {
	compare as bcryptCompare,
	hash,
} from "https://deno.land/x/bcrypt/mod.ts";

export class Password {
	constructor(private value: string) {
		if (!this.isValidPassword(value)) {
			throw new Error("Invalid password format");
		}
	}

	private isValidPassword(password: string): boolean {
		return password.length >= 8; // Adicione outras validações conforme necessário
	}

	async hash(): Promise<void> {
		this.value = await hash(this.value);
	}

	getValue(): string {
		return this.value;
	}

	setValue(value: string): void {
		this.value = value;
	}

	async compare(password: string): Promise<boolean> {
		return await bcryptCompare(password, this.value);
	}
}
