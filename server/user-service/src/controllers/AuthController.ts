import bcryptjs, { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthService from "../services/AuthService";
import { UserService } from "../services/UserService";
import {
	sendConfirmationEmailWithAccountDetails,
	sendWelcomeEmail,
} from "../utils/emails/userJorney";
import { generateToken } from "../utils/passwordUtils";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthController {
	static enable2FA(arg0: string, enable2FA: any) {
		throw new Error("Method not implemented.");
	}
	static disable2FA(arg0: string, enable2FA: any) {
		throw new Error("Method not implemented.");
	}
	static logout(arg0: string, logout: any) {
		throw new Error("Method not implemented.");
	}
	public static async login({ body, set }: any) {
		try {
			const { email, password } = body;

			if (!email || !password) {
				set.status = 400;
				return { error: "Email and password are required" };
			}
			const emailFormat = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

			if (!emailFormat.test(email)) {
				set.status = 400;
				return { error: "Invalid email format" };
			}

			const user = await UserService.getUserByEmail(email);
			if (!user) {
				set.status = 404;
				return { error: "User not found" };
			}

			const passwordMatch = bcryptjs.compareSync(password, user.password);
			if (!passwordMatch) {
				set.status = 401;
				return { error: "Invalid password" };
			}

			const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
				expiresIn: "1h",
			});

			set.status = 200;
			return {
				success: true,
				message: "Authentication successful",
				token,
				user: {
					id: user.id,
					firstName: user.name,
					email: user.email,
				},
			};
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async register({ body, set }: any) {
		try {
			const { name, email, password } = body;

			if (!name || !email || !password) {
				set.status = 400;
				return { error: "All fields are required" };
			}

			const emailFormat = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

			if (!emailFormat.test(email)) {
				set.status = 400;
				return { error: "Invalid email format" };
			}

			if (password.length < 8) {
				set.status = 400;
				return {
					error: "Password is too weak (must be at least 8 characters long)",
				};
			}

			if (!/[A-Z]/.test(password)) {
				set.status = 400;
				return {
					error:
						"Password is too weak (must contain at least one uppercase letter)",
				};
			}

			if (!/[a-z]/.test(password)) {
				set.status = 400;
				return {
					error:
						"Password is too weak (must contain at least one lowercase letter)",
				};
			}

			if (!/\d/.test(password)) {
				set.status = 400;
				return {
					error: "Password is too weak (must contain at least one number)",
				};
			}

			const existingUser = await UserService.getUserByEmail(email);
			if (existingUser) {
				set.status = 400;
				return { error: "Email already in use" };
			}

			const hashedPassword = bcryptjs.hashSync(password, 12);

			const user = await UserService.createUser({
				name,
				email,
				password: hashedPassword,
			});

			if (!user) {
				set.status = 500;
				return { error: "User not created" };
			}

			const tokenToSave = generateToken();
			const confirmationLink = `https://boutique-da-moh.vercel.app/confirmar-email?userId=${user._id}&token=${tokenToSave}`;

			//await sendWelcomeEmail(user.firstName, user.email, confirmationLink);

			const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
				expiresIn: "1h",
			});

			set.status = 201;
			return { user, token };
		} catch (error) {
			console.log(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async forgotPassword({ body, set }: any) {
		try {
			const { email } = body;

			if (!email) {
				set.status = 400;
				return { error: "Email is required" };
			}

			const emailFormat = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

			if (!emailFormat.test(email)) {
				set.status = 400;
				return { error: "Invalid email format" };
			}

			await AuthService.forgotPassword(email);

			set.status = 200;
			return { message: "Password reset email sent" };
		} catch (error) {
			set.status = 400;
			return {
				error:
					"If a user with this email exists, you will receive an email with instructions.",
			};
		}
	}

	public static async changePassword({ body, set }: any) {
		try {
			const { password, confirmPassword, token } = body;

			if (!password) {
				set.status = 400;
				return { error: "Password is required." };
			}

			if (
				password.length < 8 ||
				!/[A-Z]/.test(password) ||
				!/[a-z]/.test(password) ||
				!/\d/.test(password)
			) {
				set.status = 400;
				return {
					error:
						"Password is too weak. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
				};
			}

			if (!confirmPassword) {
				set.status = 400;
				return { error: "Confirm password is required." };
			}

			if (password !== confirmPassword) {
				set.status = 400;
				return { error: "Passwords do not match." };
			}

			const user = await UserService.getUserByPasswordResetToken(token);

			if (!user) {
				set.status = 400;
				return { error: "Invalid or expired token." };
			}

			const dateNow = new Date(Date.now());
			const passwordresetexpiresat = new Date(
				user.passwordresetexpiresat as any,
			);

			if (passwordresetexpiresat && passwordresetexpiresat <= dateNow) {
				set.status = 400;
				return { error: "Password reset token has expired." };
			}

			// Hash the new password for security
			const hashedPassword = bcryptjs.hashSync(password, 12);

			// Update the user's password in the database
			user.password = hashedPassword;
			user.passwordresettoken = null; // Clear the password reset token after the change
			user.passwordresetexpiresat = null;

			await UserService.updateUser(user.id as number, user);

			// Respond with a success message
			set.status = 200;
			return { message: "Password changed successfully." };
		} catch (error) {
			// Handle errors, for example, logging them or returning appropriate error messages
			console.error("Error changing password:", error);
			set.status = 500;
			return { error: "Internal server error." };
		}
	}

	public static async resetPassword({ body, set }: any) {
		try {
			const { resetToken, password } = body;

			await AuthService.resetPassword(resetToken, password);

			set.status = 200;
			return { message: "Password reset successfully" };
		} catch (error) {
			set.status = 400;
			return { error: "message" };
		}
	}

	public static async confirmEmail({ body, set }: any) {
		try {
			const { userId, token } = body;

			if (!userId || !token) {
				set.status = 400;
				return { success: false, message: "UserId and token are required." };
			}

			const user = await UserService.getUserById(userId);

			if (!user?.confirmationtoken) {
				set.status = 400;
				return {
					success: false,
					message: "Invalid or expired confirmation token.",
				};
			}

			// Example: Set additional fields in the user's profile
			user.emailverified = true;
			user.confirmationtoken = null;
			user.activationdate = new Date();

			await UserService.updateUser(user?.id as number, user);

			// Send a confirmation email with account details (example)
			//await sendConfirmationEmailWithAccountDetails(user.firstName, user.email);

			set.status = 200;
			return { success: true, message: "Email confirmed successfully!" };
		} catch (error) {
			console.error("Error confirming email:", error);
			set.status = 500;
			return {
				success: false,
				message: "Error confirming the email. Please try again.",
			};
		}
	}
}
