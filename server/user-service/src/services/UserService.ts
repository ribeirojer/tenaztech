import { supabase } from "../config/supabase";
import type { IUser } from "../interfaces/UserInterface";

export class UserService {
	static async createUser(user: IUser): Promise<IUser | null> {
		const dataToSend = {
			name: user.name,
			email: user.email,
			password: user.password,
		};

		try {
			const { data, error } = await supabase
				.from("users")
				.insert(dataToSend)
				.select();

			if (error) {
				throw error;
			}

			return data as any;
		} catch (error) {
			console.error("Erro ao criar usuário:", error);
			return null;
		}
	}

	static async getUserById(userId: number): Promise<IUser | null> {
		try {
			const { data, error } = await supabase
				.from("users")
				.select()
				.eq("id", userId)
				.single();

			if (error) {
				throw error;
			}

			return data;
		} catch (error) {
			console.error("Erro ao buscar usuário:", error);
			return null;
		}
	}

	static async getUserByEmail(email: string): Promise<IUser | null> {
		try {
			const { data, error } = await supabase
				.from("users")
				.select()
				.eq("email", email)
				.single();

			if (error) {
				throw error;
			}

			return data;
		} catch (error) {
			console.error("Erro ao buscar usuário por e-mail:", error);
			return null;
		}
	}

	static async getUserByPasswordResetToken(
		token: string,
	): Promise<IUser | null> {
		try {
			const { data, error } = await supabase
				.from("users")
				.select()
				.eq("passwordresettoken", token)
				.single();

			if (error) {
				throw error;
			}

			return data;
		} catch (error) {
			console.error(
				"Erro ao buscar usuário por token de redefinição de senha:",
				error,
			);
			return null;
		}
	}

	static async updateUser(
		userId: number,
		updatedUser: any,
	): Promise<IUser | null> {
		try {
			const { data, error } = await supabase
				.from("users")
				.update(updatedUser)
				.eq("id", userId)
				.select();

			if (error) {
				throw error;
			}

			return data as unknown as IUser;
		} catch (error) {
			console.error("Erro ao atualizar usuário:", error);
			return null;
		}
	}

	static async deleteUser(userId: number): Promise<boolean> {
		try {
			const { error } = await supabase.from("users").delete().eq("id", userId);

			if (error) {
				throw error;
			}

			return true;
		} catch (error) {
			console.error("Erro ao deletar usuário:", error);
			return false;
		}
	}
}
