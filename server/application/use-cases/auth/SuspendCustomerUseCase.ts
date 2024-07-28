import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";

interface SuspendCustomerInput {
	customerId: string;
}

export class SuspendCustomerUseCase {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async execute(input: SuspendCustomerInput): Promise<void> {
		try {
			const customer = await this.customerRepository.findById(input.customerId);
			if (!customer) {
				throw new Error("Customer not found");
			}

			customer.isSuspended = true;
			await this.customerRepository.update(customer);
		} catch (error) {
			throw new Error(`Failed to suspend Customer account: ${error.message}`);
		}
	}
}
