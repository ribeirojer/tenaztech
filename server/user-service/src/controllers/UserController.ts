import type { Context } from "../interfaces/ElysiaContext";
import { UserPermissionsRepository } from "../repositories/UserPermissionsRepository";
import { UserRepository } from "../repositories/UserRepository";
import logger from "../utils/logger"; // Import the logger

class UserController {
	static async updateProfile({ params, body, set }: Context) {
		const { id } = params;
		const { name, email, phoneNumber, address } = body;

		// Validation
		if (!name || !email) {
			set.status = 400;
			logger.warn("Validation error: Missing required fields");
			return { error: "First name, last name, and email are required" };
		}

		try {
			const user = await UserRepository.getUserById(id);

			if (!user) {
				set.status = 404;
				logger.warn(`User not found for update: ${id}`);
				return { error: "User not found" };
			}

			await UserRepository.updateOne(
				{ _id: id },
				{
					name,
					email,
					phoneNumber,
					address,
				},
			);

			set.status = 200;
			logger.info(`User profile updated successfully: ${id}`);
			return { message: "Profile updated successfully" };
		} catch (error) {
			set.status = 500;
			logger.error("Error updating user profile: ", error);
			return { error: "Internal server error" };
		}
	}

	static async showProfile({ params, set }: Context) {
		const { id } = params;

		try {
			const user = await UserRepository.getUserById(id);

			if (!user) {
				set.status = 404;
				logger.warn(`User not found: ${id}`);
				return { error: "User not found" };
			}

			set.status = 200;
			logger.info(`Fetched user profile successfully: ${id}`);
			return user;
		} catch (error) {
			set.status = 500;
			logger.error("Error fetching user profile: ", error);
			return { error: "Internal server error" };
		}
	}

	static async index({ set }: Context) {
		try {
			const users = await UserRepository.getUsers();
			set.status = 200;
			logger.info("Fetched all users successfully.");
			return users;
		} catch (error) {
			set.status = 400;
			logger.error("Error fetching users: ", error);
			return { error };
		}
	}

	static async show({ params, set }: Context) {
		const { id } = params;

		try {
			const user = await UserRepository.getUserById(id);

			if (!user) {
				set.status = 404;
				logger.warn(`User not found: ${id}`);
				return { error: "User not found" };
			}

			set.status = 200;
			logger.info(`Fetched user successfully: ${id}`);
			return user;
		} catch (error) {
			set.status = 500;
			logger.error("Error fetching user: ", error);
			return { error: "Internal server error" };
		}
	}

	static async store({ body, set }: Context) {
		const { name, email, password, phoneNumber, address } = body;

		// Validation
		if (!name || !email || !password) {
			set.status = 400;
			logger.warn("Validation error: Missing required fields");
			return {
				error: "First name, last name, email, and password are required",
			};
		}

		try {
			const user = await UserRepository.createUser({
				name,
				email,
				password,
				phoneNumber,
				address: address as any,
			});

			set.status = 201;
			logger.info("User created successfully.");
			return user;
		} catch (error) {
			set.status = 500;
			logger.error("Error creating user: ", error);
			return { error: "Internal server error" };
		}
	}

	static async update({ params, body, set }: Context) {
		const { id } = params;
		const { name, email } = body;

		// Validation
		if (!name || !email) {
			set.status = 400;
			logger.warn("Validation error: Missing required fields");
			return { error: "First name, last name, and email are required" };
		}

		try {
			const user = await UserRepository.getUserById(id);

			if (!user) {
				set.status = 404;
				logger.warn(`User not found for update: ${id}`);
				return { error: "User not found" };
			}

			await UserRepository.updateUser(id, { name, email });

			set.status = 200;
			logger.info(`User updated successfully: ${id}`);
			return { message: "User updated successfully" };
		} catch (error) {
			set.status = 500;
			logger.error("Error updating user: ", error);
			return { error: "Internal server error" };
		}
	}

	static async destroy({ params, set }: Context) {
		const { id } = params;

		try {
			const user = await UserRepository.deleteUser(id);

			if (!user) {
				set.status = 404;
				logger.warn(`User not found for deletion: ${id}`);
				return { error: "User not found" };
			}

			set.status = 204;
			logger.info(`User deleted successfully: ${id}`);
			return { message: "User deleted successfully" };
		} catch (error) {
			set.status = 500;
			logger.error("Error deleting user: ", error);
			return { error: "Internal server error" };
		}
	}

	static async getUserPermissions({ params, set }: Context) {
		try {
			const permissions = await UserPermissionsRepository.getByUserId(
				params.userId,
			);
			set.status = 200;
			logger.info(`Fetched permissions for user: ${params.userId}`);
			return permissions;
		} catch (error) {
			set.status = 400;
			logger.error("Error fetching user permissions: ", error);
			return { error };
		}
	}

	static async setUserPermissions({ params, body, set }: Context) {
		const { userId, roles } = body;

		// Validation
		if (!roles || !Array.isArray(roles) || roles.length === 0) {
			set.status = 400;
			logger.warn("Validation error: Roles must be a non-empty array");
			return { error: "Roles must be a non-empty array" };
		}

		try {
			await UserPermissionsRepository.setUserPermissions(userId, roles);
			set.status = 201;
			logger.info(`Permissions updated for user: ${userId}`);
			return { message: "Permissions updated successfully" };
		} catch (error) {
			set.status = 400;
			logger.error("Error updating user permissions: ", error);
			return { error };
		}
	}

	static async removeUserPermission({ params, set }: Context) {
		try {
			await UserPermissionsRepository.removeUserPermission(
				params.userId,
				params.roleId,
			);
			set.status = 204;
			logger.info(`Permission removed for user: ${params.userId}`);
			return { message: "Permission removed successfully" };
		} catch (error) {
			set.status = 400;
			logger.error("Error removing user permission: ", error);
			return { error };
		}
	}

	static async searchUsers({ query, set }: Context) {
		try {
			const users = await UserRepository.searchUsers(query.q);
			set.status = 200;
			logger.info("Users search completed successfully.");
			return users;
		} catch (error) {
			set.status = 400;
			logger.error("Error searching users: ", error);
			return { error };
		}
	}

	static async getUserPoints({ params, set }: Context) {
		try {
			const points = await UserRepository.getUserPoints(params.userId);
			set.status = 200;
			logger.info(`Fetched points for user: ${params.userId}`);
			return points;
		} catch (error) {
			set.status = 400;
			logger.error("Error fetching user points: ", error);
			return { error };
		}
	}

	static async addUserPoints({ body, set }: Context) {
		const { userId, points } = body;

		// Validation
		if (!userId || typeof points !== "number") {
			set.status = 400;
			logger.warn("Validation error: User ID and points are required");
			return { error: "User ID and points are required" };
		}

		try {
			await UserRepository.addUserPoints(userId, points);
			set.status = 201;
			logger.info(`Points added to user: ${userId}`);
			return { message: "Points added successfully" };
		} catch (error) {
			set.status = 400;
			logger.error("Error adding user points: ", error);
			return { error };
		}
	}

	static async getLeaderboard({ set }: Context) {
		try {
			const leaderboard = await UserRepository.getLeaderboard();
			set.status = 200;
			logger.info("Fetched leaderboard successfully.");
			return leaderboard;
		} catch (error) {
			set.status = 400;
			logger.error("Error fetching leaderboard: ", error);
			return { error };
		}
	}
}

export { UserController };
