import { UserPermissionsRepository } from "../repositories/UserPermissionsRepository";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
	static updateProfile(arg0: string, updateProfile: any) {
		throw new Error("Method not implemented.");
	}
	static showProfile(arg0: string, showProfile: any) {
		throw new Error("Method not implemented.");
	}
	static async index({ body, set }: any) {
    console.log("gggg")
		try {
      const users = await UserRepository.getUsers();
      set.status = 200;
      return users;
  } catch (error) {
      set.status = 400;
      return { error };
  }
	}

	static async show({ body, set }: any) {
		/*const { id } = body.params;

    try {
      const user = await UserRepository.findOne({ _id: id });

      if (!user) {
        return set.status(404).json({ error: "User not found" });
      }

      return set.json(user);
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
	}

	static async store({ body, set }: any) {
		/*const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      billingInfo,
    } = req.body;

    try {
      const user = await UserRepository.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        billingInfo,
      });

      return set.status(201).json(user);
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
	}

	static async update({ body, set }: any) {
		/*const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    try {
      const user = await UserRepository.findOne({ _id: id });

      if (!user) {
        return set.status(404).json({ error: "User not found" });
      }

      await UserRepository.updateOne({
        firstName,
        lastName,
        email,
      });

      return set.json(user);
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
	}

	static async destroy({ body, set }: any) {
		/*try {
      const user = await UserRepository.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        set.status(404).json({ error: "User not found" });
        return;
      }

      return set.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
	}
    static async getUserPermissions({ params, set }: any) {
        try {
            const permissions = await UserPermissionsRepository.getByUserId(params.userId);
            set.status = 200;
            return permissions;
        } catch (error) {
            set.status = 400;
            return { error: error };
        }
    }

    static async setUserPermissions({ params, body, set }: any) {
        try {
            await UserPermissionsRepository.setUserPermissions(params.userId, body.roles);
            set.status = 201;
            return { message: "Permissions updated successfully" };
        } catch (error) {
            set.status = 400;
            return { error: error };
        }
    }

    static async removeUserPermission({ params, set }: any) {
        try {
            await UserPermissionsRepository.removeUserPermission(params.userId, params.roleId);
            set.status = 204;
            return { message: "Permission removed successfully" };
        } catch (error) {
            set.status = 400;
            return { error: error };
        }
    }

    static async searchUsers({ query, set }: any) {
        try {
            const users = await UserRepository.searchUsers(query.q);
            set.status = 200;
            return users;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async getUserPoints({ params, set }: any) {
        try {
            const points = await UserRepository.getUserPoints(params.userId);
            set.status = 200;
            return points;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async addUserPoints({ body, set }: any) {
        try {
            const { userId, points } = body;
            await UserRepository.addUserPoints(userId, points);
            set.status = 201;
            return { message: "Points added successfully" };
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async getLeaderboard({ set }: any) {
        try {
            const leaderboard = await UserRepository.getLeaderboard();
            set.status = 200;
            return leaderboard;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }
}

export { UserController };
