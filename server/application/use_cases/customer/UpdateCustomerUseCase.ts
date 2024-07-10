import { CustomerRepository } from '../../domain/interfaces/CustomerRepository.ts';
import { Customer } from '../../domain/entities/Customer.ts';

export class UpdateCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(id: string, name: string, email: string): Promise<void> {
        const customer = await this.customerRepository.getById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }

        customer.name = name;
        customer.email = email;
        await this.customerRepository.update(customer);
    }
}
