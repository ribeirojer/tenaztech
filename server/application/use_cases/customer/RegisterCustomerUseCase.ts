import { CustomerRepository } from '../../domain/interfaces/CustomerRepository.ts';
import { Customer } from '../../domain/entities/Customer.ts';

export class RegisterCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(name: string, email: string): Promise<void> {
        const existingCustomer = await this.customerRepository.getByEmail(email);
        if (existingCustomer) {
            throw new Error('Customer with this email already exists');
        }

        const customer = new Customer(name, email);
        await this.customerRepository.add(customer);
    }
}
