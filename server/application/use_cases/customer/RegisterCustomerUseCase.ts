import { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import { Customer } from "../../../domain/entities/Customer.ts";
import { Email } from "../../../domain/value-objects/Email.ts";
import { Name } from "../../../domain/value-objects/Name.ts";
import { Password } from "../../../domain/value-objects/Password.ts";
import { Address } from "../../../domain/value-objects/Address.ts";
import { CustomerAlreadyExistsException } from "../../../domain/exceptions/CustomerAlreadyExistsException.ts";
import { InvalidEmailException } from "../../../domain/exceptions/InvalidEmailException.ts";
import { InvalidNameException } from "../../../domain/exceptions/InvalidNameException.ts";
import { EmailService } from "../../../infrastructure/services/EmailService.ts";
import { WelcomeEmailTemplate } from "../../../infrastructure/email-templates/WelcomeEmailTemplate.ts";

interface RegisterCustomerInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    addresses: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    }[];
}

export class RegisterCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly emailService: EmailService
    ) {}

    async execute(input: RegisterCustomerInput): Promise<void> {
        const customerEmail = new Email(input.email);
        const customerFirstName = new Name(input.firstName);
        const customerLastName = new Name(input.lastName);
        const customerPassword = new Password(input.password);
        
        const existingCustomer = await this.customerRepository.getByEmail(customerEmail);
        if (existingCustomer) {
            throw new CustomerAlreadyExistsException("Customer with this email already exists");
        }

        const addresses = input.addresses.map(address => new Address(
            address.street,
            address.city,
            address.state,
            address.zipCode
        ));

        const customer = new Customer(
            this.generateUniqueId(),
            customerFirstName.getValue(),
            customerLastName.getValue(),
            customerEmail,
            customerPassword,
            input.phone,
            addresses,
            new Date(),
            new Date()
        );
        
        await this.customerRepository.add(customer);

        // Enviar email de boas-vindas usando o template
        await this.emailService.sendEmail(
            customerEmail.getValue(),
            WelcomeEmailTemplate.getSubject(),
            WelcomeEmailTemplate.getHtmlContent(customerFirstName.getValue(), customerLastName.getValue())
        );
    }

    private generateUniqueId(): string {
        return crypto.randomUUID();
    }

    private isValidInput(input: RegisterCustomerInput): boolean {
        // Implementar lógica de validação dos campos
        return true;
    }
}
