import type { IUser } from "../interfaces/UserInterface";
import {
	sendPasswordChangeEmail,
	sendPasswordResetEmail,
} from "../utils/emails/emailUtils";
import { hashPassword } from "../utils/passwordUtils";
import { UserService } from "./UserService";

const URL_FRONT = process.env.URL_FRONT || "http://localhost:3000";

class AuthService {
	static async forgotPassword(email: string): Promise<void> {
		try {
			// Verifica se o usuário existe
			const user = await UserService.getUserByEmail(email);

			if (!user) {
				// Evite fornecer informações específicas sobre a existência do usuário
				throw new Error(
					"Se um usuário com esse e-mail existir, você receberá um e-mail com as instruções.",
				);
			}

			// Gera um token de redefinição de senha
			const token = ""; //UserRepository.generatePasswordResetToken(user);

			const resetLink = `${URL_FRONT}/alterar-senha?token=${token}`;

			const expirationTimeInMinutes = 30;
			const now = new Date();

			user.passwordResetToken = token;
			user.passwordResetExpiresAt = new Date(
				now.getTime() + expirationTimeInMinutes * 60000,
			); // 1 minuto = 60000 milissegundos
			await UserService.updateUser(user.id as number, user);

			//Envia um email com o link para redefinir a senha

			//await sendPasswordChangeEmail({
			//  firstName: user.firstName,
			//  email: user.email,
			//   resetLink,
			//});

			// Indique que o e-mail foi enviado com sucesso (isso pode ser útil para feedback)
			console.log(`E-mail de redefinição de senha enviado para ${user.email}`);
		} catch (error: any) {
			// Lide com erros, por exemplo, registrando-os ou retornando mensagens de erro apropriadas
			console.error("Erro ao solicitar redefinição de senha:", error.message);
			throw error; // Rejeite o erro para que o chamador saiba que algo deu errado
		}
	}

	static async resetPassword(
		token: string,
		newPassword: string,
	): Promise<IUser> {
		const user = {} as any; //await UserRepository.findByPasswordResetToken(token);

		if (!user) {
			throw new Error("Token inválido");
		}

		// Atualiza a senha do usuário
		user.password = await hashPassword(newPassword);
		user.passwordResetToken = "null";
		user.passwordResetExpiresAt = new Date();
		await UserService.updateUser(user.id, user);

		return user;
	}
}

export default AuthService;
