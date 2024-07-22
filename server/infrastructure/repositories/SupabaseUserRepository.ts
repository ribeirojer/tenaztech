import { User } from "../../domain/entities/User.ts";
import type { UserRepository } from "../../domain/interfaces/UserRepository.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseUserRepository implements UserRepository {
	async getById(id: string): Promise<User | null> {
		const { data, error } = await supabase
			.from("users")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			throw error;
		}

		return data ? new User(data.id, data.name, data.email) : null;
	}

	async add(user: User): Promise<void> {
		const { error } = await supabase
			.from("users")
			.insert([{ id: user.id, name: user.name, email: user.email }]);

		if (error) {
			throw error;
		}
	}

	async update(user: User): Promise<void> {
		const { error } = await supabase
			.from("users")
			.update({ name: user.name, email: user.email })
			.eq("id", user.id);

		if (error) {
			throw error;
		}
	}
}
