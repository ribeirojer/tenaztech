import { Customer } from "../entities/Customer.ts";
import { Email } from "../value-objects/Email.ts";

export interface CustomerRepository {
	subscribeNewsletter(id: any, userData: any): unknown;
	remove(id: string): unknown;
	getAll(): Customer[] | PromiseLike<Customer[]>;
	savePasswordResetToken(id: string, resetToken: string): unknown;
	add(customer: Customer): unknown;
	getByEmail(email: Email): Promise<Customer | null>;
	findById(id: string): Promise<Customer>;
	save(customer: Customer): Promise<void>;
	update(customer: Customer): Promise<void>;
}
