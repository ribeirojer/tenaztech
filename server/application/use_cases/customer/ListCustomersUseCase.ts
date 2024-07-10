import { CustomerRepository } from '../../domain/interfaces/CustomerRepository.ts';
import { Customer } from '../../domain/entities/Customer.ts';

export class ListCustomersUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(): Promise<Customer[]> {
        return this.customerRepository.getAll();
    }
}
