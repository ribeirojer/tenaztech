import { supabase } from "../config/supabase";

class UserPermissionsRepository {
    static async getByUserId(userId: any) {
        const { data, error } = await supabase.from('user_permissions').select('role_id').eq('user_id', userId);
        if (error) throw error;
        return data;
    }

    static async setUserPermissions(userId: any, roles: any[]) {
        const { error } = await supabase.from('user_permissions').insert(roles.map((roleId: any) => ({ user_id: userId, role_id: roleId })));
        if (error) throw error;
    }

    static async removeUserPermission(userId: any, roleId: any) {
        const { error } = await supabase.from('user_permissions').delete().eq('user_id', userId).eq('role_id', roleId);
        if (error) throw error;
    }
}

export { UserPermissionsRepository };
