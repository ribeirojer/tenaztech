import Elysia, { t } from "elysia";
import { AuthController } from "../controllers/AuthController";

const router = new Elysia();

//Autenticação e Registro

router.group("/api", (router) =>
	router.group("/auth", (router) =>
		router
			.post("/login", AuthController.login, {
				body: t.Object({
					email: t.String(),
					password: t.String(),
				}),
			})
			.post("/register", AuthController.register, {
				body: t.Object({
					name: t.String(),
					email: t.String(),
					password: t.String(),
				}),
			})
			.post("/confirm-email", AuthController.confirmEmail)
			.delete("logout", AuthController.logout)

			//Gerenciamento de Senha
			.post("/forgot-password", AuthController.forgotPassword, {
				body: t.Object({
					email: t.String(),
				}),
			})
			.post("/change-password", AuthController.changePassword, {
				body: t.Object({
					password: t.String(),
					confirmPassword: t.String(),
					token: t.String(),
				}),
			})
			.put("/reset-password", AuthController.resetPassword)

			//Autenticação de Dois Fatores (2FA)
			.post("/enable-2fa", AuthController.enable2FA)
			.post("/disable-2fa", AuthController.disable2FA),
	),
);

export default router;
