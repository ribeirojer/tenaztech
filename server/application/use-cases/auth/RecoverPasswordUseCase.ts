import { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import { EmailService } from "../../../domain/services/EmailService.ts";
import { Email } from "../../../domain/value-objects/Email.ts";

interface RecoverPasswordInput {
    email: string;
}

export class RecoverPasswordUseCase {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly emailService: EmailService
    ) {}

    async execute(input: RecoverPasswordInput): Promise<void> {
        const email = new Email(input.email);
        const customer = await this.customerRepository.getByEmail(email);
        if (!customer) {
            throw new Error("Customer with this email does not exist");
        }

        const resetToken = this.generateResetToken();
        await this.customerRepository.savePasswordResetToken(customer.id, resetToken);

        await this.emailService.sendPasswordResetEmail(customer.email.getValue(), resetToken);
    }

    private generateResetToken(): string {
        return crypto.randomUUID();
    }
}
