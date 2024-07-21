import { Customer } from "../../domain/entities/Customer.ts";
import { CustomerRepository } from "../../domain/interfaces/CustomerRepository.ts";
import { Email } from "../../domain/value-objects/Email.ts";
import { Password } from "../../domain/value-objects/Password.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseCustomerRepository implements CustomerRepository {
    async subscribeNewsletter(id: string, userData: any): Promise<void> {
        const { data, error } = await supabase
            .from("customers")
            .update({ newsletter: true, ...userData })
            .eq("id", id);

        if (error) {
            throw new Error(`Failed to subscribe to newsletter: ${error.message}`);
        }
    }

    async remove(id: string): Promise<void> {
        const { error } = await supabase
            .from("customers")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error(`Failed to remove customer: ${error.message}`);
        }
    }

    async getAll(): Promise<Customer[]> {
        const { data, error } = await supabase
            .from("customers")
            .select("*");

        if (error) {
            throw new Error(`Failed to get all customers: ${error.message}`);
        }

        return data.map((customer: any) => new Customer(
            customer.id,
            customer.name,
            new Email(customer.email),
            new Password(customer.password),
            customer.phone,
            customer.addresses,
            new Date(customer.createdAt),
            new Date(customer.updatedAt),
        ));
    }

    async savePasswordResetToken(id: string, resetToken: string): Promise<void> {
        const { error } = await supabase
            .from("password_reset_tokens")
            .insert({ customerId: id, resetToken });

        if (error) {
            throw new Error(`Failed to save password reset token: ${error.message}`);
        }
    }

    async findById(id: string): Promise<Customer> {
        const { data, error } = await supabase
            .from("customers")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw new Error(`Failed to find customer by id: ${error.message}`);
        }

        return new Customer(
            data.id,
            data.name,
            new Email(data.email),
            new Password(data.password),
            data.phone,
            data.addresses,
            new Date(data.createdAt),
            new Date(data.updatedAt),
        );
    }

    async save(customer: Customer): Promise<void> {
        const { error } = await supabase.from("customers").insert([
            {
                id: customer.id,
                name: customer.name,
                email: customer.email.getValue(),
                password: await customer.password.hash(),
                phone: customer.phone,
                addresses: customer.addresses,
                createdAt: customer.createdAt,
                updatedAt: customer.updatedAt,
            },
        ]);

        if (error) {
            throw new Error(`Failed to save customer: ${error.message}`);
        }
    }

    async update(customer: Customer): Promise<void> {
        const { error } = await supabase
            .from("customers")
            .update({
                name: customer.name,
                email: customer.email.getValue(),
                password: await customer.password.hash(),
                phone: customer.phone,
                addresses: customer.addresses,
                updatedAt: customer.updatedAt,
            })
            .eq("id", customer.id);

        if (error) {
            throw new Error(`Failed to update customer: ${error.message}`);
        }
    }

    async add(customer: Customer): Promise<void> {
        const { error } = await supabase.from("customers").insert([
            {
                id: customer.id,
                name: customer.name,
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
            .from("customers")
            .select("*")
            .eq("email", email.getValue())
            .single();

        if (error && error.code !== "PGRST116") {
            throw new Error(`Failed to get customer by email: ${error.message}`);
        }

        return data
            ? new Customer(
                    data.id,
                    data.name,
                    new Email(data.email),
                    new Password(data.password),
                    data.phone,
                    data.addresses,
                    new Date(data.createdAt),
                    new Date(data.updatedAt),
                )
            : null;
    }
}
