import { createClient } from 'https://deno.land/x/supabase/mod.ts';
import { Customer } from "../../domain/entities/Customer.ts";
import { CustomerRepository } from "../../domain/interfaces/CustomerRepository.ts";
import { Email } from "../../domain/value-objects/Email.ts";
import { Password } from "../../domain/value-objects/Password.ts";

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseCustomerRepository implements CustomerRepository {
    findById(id: string): Promise<Customer> {
        throw new Error('Method not implemented.');
    }
    save(customer: Customer): Promise<void> {
        throw new Error('Method not implemented.');
    }
    update(customer: Customer): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async add(customer: Customer): Promise<void> {
        const { error } = await supabase
            .from('customers')
            .insert([
                {
                    id: customer.id,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    email: customer.email.getValue(),
                    password: await customer.password.hash(),
                    phone: customer.phone,
                    addresses: customer.addresses,
                    createdAt: customer.createdAt,
                    updatedAt: customer.updatedAt,
                },
            ]);

        if (error) {
            throw new Error(`Failed to add customer: ${error.message}`);
        }
    }

    async getByEmail(email: Email): Promise<Customer | null> {
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Failed to get customer by email: ${error.message}`);
        }

        return data ? new Customer(
            data.id,
            data.firstName,
            data.lastName,
            new Email(data.email),
            new Password(data.password),
            data.phone,
            data.addresses,
            new Date(data.createdAt),
            new Date(data.updatedAt),
        ) : null;
    }
}
