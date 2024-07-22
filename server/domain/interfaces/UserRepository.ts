import type { User } from "../entities/User.ts";

export interface UserRepository {
	getById(id: string): Promise<User | null>;
	add(user: User): Promise<void>;
	update(user: User): Promise<void>;
}
