import { assertEquals, assertThrowsAsync } from 'https://deno.land/std/testing/asserts.ts';
import { RegisterCustomerUseCase } from './RegisterCustomerUseCase.ts';
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

Deno.test('RegisterCustomerUseCase should register a new customer', async () => {
    const customerRepository = new MockCustomerRepository();
    const useCase = new RegisterCustomerUseCase(customerRepository);

    await useCase.execute('John Doe', 'john.doe@example.com');

    const customers = await customerRepository.getAll();
    assertEquals(customers.length, 1);
    assertEquals(customers[0].name, 'John Doe');
    assertEquals(customers[0].email, 'john.doe@example.com');
});

Deno.test('RegisterCustomerUseCase should throw error if customer already exists', async () => {
    const customerRepository = new MockCustomerRepository();
    const useCase = new RegisterCustomerUseCase(customerRepository);

    await customerRepository.add(new Customer('Jane Smith', 'jane.smith@example.com'));

    await assertThrowsAsync(
        async () => {
            await useCase.execute('John Doe', 'jane.smith@example.com');
        },
        Error,
        'Customer with this email already exists'
    );
});
