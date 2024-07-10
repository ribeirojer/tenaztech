import { assertEquals, assertThrowsAsync } from 'https://deno.land/std/testing/asserts.ts';
import { GetCustomerDetailUseCase } from './GetCustomerDetailUseCase.ts';
import { CustomerRepository } from '../../../domain/interfaces/CustomerRepository.ts';
import { Customer } from '../../../domain/entities/Customer.ts';

class MockCustomerRepository implements CustomerRepository {
    private customers: Customer[] = [];

    async getById(id: string): Promise<Customer | null> {
        return this.customers.find(customer => customer.id === id) || null;
    }

    async getByEmail(email: string): Promise<Customer | null> {
        return this.customers.find(customer => customer.email === email) || null;
    }

    async getAll(): Promise<Customer[]> {
        return this.customers;
    }

    async add(customer: Customer): Promise<void> {
        this.customers.push(customer);
    }

    async update(customer: Customer): Promise<void> {
        const index = this.customers.findIndex(c => c.id === customer.id);
        if (index !== -1) {
            this.customers[index] = customer;
        }
    }

    async remove(id: string): Promise<void> {
        this.customers = this.customers.filter(customer => customer.id !== id);
    }
}

Deno.test('GetCustomerDetailUseCase should return customer details', async () => {
    const customerRepository = new MockCustomerRepository();
    const useCase = new GetCustomerDetailUseCase(customerRepository);

    const customer = new Customer('1', 'John Doe', 'john.doe@example.com');
    await customerRepository.add(customer);

    const result = await useCase.execute('1');
    assertEquals(result!.id, '1');
    assertEquals(result!.name, 'John Doe');
    assertEquals(result!.email, 'john.doe@example.com');
});

Deno.test('GetCustomerDetailUseCase should return null if customer not found', async () => {
    const customerRepository = new MockCustomerRepository();
    const useCase = new GetCustomerDetailUseCase(customerRepository);

    const result = await useCase.execute('1');
    assertEquals(result, null);
});
