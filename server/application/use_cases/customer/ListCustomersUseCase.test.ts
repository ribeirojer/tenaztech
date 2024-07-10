import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { ListCustomersUseCase } from './ListCustomersUseCase.ts';
import { CustomerRepository } from '../../domain/interfaces/CustomerRepository.ts';
import { Customer } from '../../domain/entities/Customer.ts';

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

Deno.test('ListCustomersUseCase should return all customers', async () => {
    const customerRepository = new MockCustomerRepository();
    const useCase = new ListCustomersUseCase(customerRepository);

    const customer1 = new Customer('1', 'John Doe', 'john.doe@example.com');
    const customer2 = new Customer('2', 'Jane Smith', 'jane.smith@example.com');
    await customerRepository.add(customer1);
    await customerRepository.add(customer2);

    const customers = await useCase.execute();
    assertEquals(customers.length, 2);
    assertEquals(customers[0].id, '1');
    assertEquals(customers[1].id, '2');
});
