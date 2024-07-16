import { User } from "../../../domain/entities/User.ts";
import { UserRepository } from "../../../domain/interfaces/UserRepository.ts";

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(name: string, email: string): Promise<void> {
		const user = new User(crypto.randomUUID(), name, email);
		await this.userRepository.add(user);
	}
}
