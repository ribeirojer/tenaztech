import type { Customer } from "../../../domain/entities/Customer.ts";
import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";

export class ListCustomersUseCase {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async execute(): Promise<Customer[]> {
		return this.customerRepository.getAll();
	}
}
