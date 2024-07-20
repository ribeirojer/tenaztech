import {
	assertEquals,
	assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase.ts";
import { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import { Customer } from "../../../domain/entities/Customer.ts";

class MockCustomerRepository implements CustomerRepository {
	private customers: Customer[] = [];

	async getById(id: string): Promise<Customer | null> {
		return this.customers.find((customer) => customer.id === id) || null;
	}

	async getByEmail(email: string): Promise<Customer | null> {
		return this.customers.find((customer) => customer.email === email) || null;
	}

	async getAll(): Promise<Customer[]> {
		return this.customers;
	}

	async add(customer: Customer): Promise<void> {
		this.customers.push(customer);
	}

	async update(customer: Customer): Promise<void> {
		const index = this.customers.findIndex((c) => c.id === customer.id);
		if (index !== -1) {
			this.customers[index] = customer;
		}
	}

	async remove(id: string): Promise<void> {
		this.customers = this.customers.filter((customer) => customer.id !== id);
	}
}

Deno.test("UpdateCustomerUseCase should update an existing customer", async () => {
	const customerRepository = new MockCustomerRepository();
	const useCase = new UpdateCustomerUseCase(customerRepository);

	const customer = new Customer("1", "John Doe", "john.doe@example.com");
	await customerRepository.add(customer);

	await useCase.execute("1", "Jane Smith", "jane.smith@example.com");

	const updatedCustomer = await customerRepository.getById("1");
	assertEquals(updatedCustomer!.name, "Jane Smith");
	assertEquals(updatedCustomer!.email, "jane.smith@example.com");
});

Deno.test("UpdateCustomerUseCase should throw error if customer not found", async () => {
	const customerRepository = new MockCustomerRepository();
	const useCase = new UpdateCustomerUseCase(customerRepository);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("1", "Jane Smith", "jane.smith@example.com");
		},
		Error,
		"Customer not found",
	);
});
