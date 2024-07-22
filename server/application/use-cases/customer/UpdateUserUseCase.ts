import type { UserRepository } from "../../../domain/interfaces/UserRepository.ts";

export class UpdateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(id: string, name: string, email: string): Promise<void> {
		const user = await this.userRepository.getById(id);
		if (!user) {
			throw new Error("User not found");
		}

		user.name = name;
		user.email = email;
		await this.userRepository.update(user);
	}
}
