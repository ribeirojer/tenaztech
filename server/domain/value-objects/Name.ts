import { InvalidNameException } from "../exceptions/InvalidNameException.ts"

export class Name {
    constructor(private readonly value: string) {
        if (!this.isValidName(value)) {
            throw new InvalidNameException("Name cannot be empty");
        }
    }

    private isValidName(name: string): boolean {
        return name.trim().length > 0;
    }

    getValue(): string {
        return this.value;
    }
}