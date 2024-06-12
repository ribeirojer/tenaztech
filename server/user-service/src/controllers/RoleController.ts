import { RoleRepository } from "../repositories/RoleRepository";

class RoleController {
    static async getRoles({ set }: any) {
        try {
            const roles = await RoleRepository.getAll();
            set.status = 200;
            return roles;
        } catch (error) {
            set.status = 400;
            return { error: error };
        }
    }

    static async getRole({ params, set }: any) {
        try {
            const role = await RoleRepository.getById(params.id);
            set.status = 200;
            return role;
        } catch (error) {
            set.status = 400;
            return { error: error };
        }
    }

    static async createRole({ body, set }: any) {
        try {
            const role = await RoleRepository.create(body);
            set.status = 201;
            return role;
        } catch (error) {
            set.status = 400;
            return { error: error };
        }
    }

    static async updateRole({ params, body, set }: any) {
        try {
            const role = await RoleRepository.update(params.id, body);
            set.status = 200;
            return role;
        } catch (error) {
            set.status = 400;
            return { error: error };
        }
    }

    static async deleteRole({ params, set }: any) {
        try {
            await RoleRepository.delete(params.id);
            set.status = 204;
            return { message: "Role deleted successfully" };
        } catch (error) {
            set.status = 400;
            return { error: error };
        }
    }
}

export { RoleController };
