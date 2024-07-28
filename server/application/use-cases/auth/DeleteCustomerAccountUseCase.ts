import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";

interface DeletecustomerAccountInput {
	customerId: string;
}

export class DeletecustomerAccountUseCase {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async execute(input: DeletecustomerAccountInput): Promise<void> {
		try {
			const customer = await this.customerRepository.findById(input.customerId);
			if (!customer) {
				throw new Error("customer not found");
			}

			await this.customerRepository.remove(customer.id);
		} catch (error) {
			throw new Error(`Failed to delete customer account: ${error.message}`);
		}
	}
}
