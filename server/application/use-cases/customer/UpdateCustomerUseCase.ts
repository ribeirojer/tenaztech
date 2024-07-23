import { Customer } from "../../../domain/entities/Customer.ts";
import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";

export class UpdateCustomerUseCase {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async execute(id: string, name: string): Promise<void> {
		const customer = await this.customerRepository.findById(id);
		if (!customer) {
			throw new Error("Customer not found");
		}

		customer.name = name;
		await this.customerRepository.update(customer);
	}
}
