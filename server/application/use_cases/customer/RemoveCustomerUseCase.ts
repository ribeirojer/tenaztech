import { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";

export class RemoveCustomerUseCase {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async execute(id: string): Promise<void> {
		const customer = await this.customerRepository.findById(id);
		if (!customer) {
			throw new Error("Customer not found");
		}

		await this.customerRepository.remove(id);
	}
}
