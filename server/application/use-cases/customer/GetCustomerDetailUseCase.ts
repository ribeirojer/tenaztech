import { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import { Customer } from "../../../domain/entities/Customer.ts";

export class GetCustomerDetailUseCase {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async execute(id: string): Promise<Customer | null> {
		return this.customerRepository.findById(id);
	}
}
