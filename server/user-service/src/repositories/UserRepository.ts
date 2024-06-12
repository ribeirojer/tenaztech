import { supabase } from "../config/supabase";
import type { IUser } from "../interfaces/UserInterface";
import { UserService } from "../services/UserService";

class UserRepository {
    static generatePasswordResetToken(user: IUser) {
        const token = Math.random().toString(36).substr(2);
        user.passwordResetToken = token;
        user.passwordResetExpiresAt = new Date(Date.now() + 3600000); // 1 hora
        return token;
    }

    static async findByPasswordResetToken(token: string): Promise<IUser | null> {
        const user = await UserService.getUserByPasswordResetToken(token);
        return user || null;
    }

    static async searchUsers(query: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .ilike('username', `%${query}%`);
        if (error) throw error;
        return data;
    }

    static async getUserPoints(userId: string) {
        const { data, error } = await supabase
            .from('user_points')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (error) throw error;
        return data;
    }

    static async addUserPoints(userId: string, points: number) {
        const { data, error } = await supabase.rpc('increment_user_points', {
            user_id: userId,
            points: points
        });
        if (error) throw error;
        return data;
    }

    static async getLeaderboard() {
        const { data, error } = await supabase
            .from('user_points')
            .select('*')
            .order('points', { ascending: false })
            .limit(10);
        if (error) throw error;
        return data;
    }

    // CRUD Operations
    static async createUser(user: IUser) {
        const { data, error } = await supabase
            .from('users')
            .insert(user)
            .single();
        if (error) throw error;
        return data;
    }

    static async getUserById(userId: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) throw error;
        return data;
    }

    static async getUsers() {
        const { data, error } = await supabase
            .from('users')
            .select('*');
        if (error) throw error;
        return data;
    }

    static async updateUser(userId: string, user: Partial<IUser>) {
        const { data, error } = await supabase
            .from('users')
            .update(user)
            .eq('id', userId)
            .single();
        if (error) throw error;
        return data;
    }

    static async deleteUser(userId: string) {
        const { data, error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId)
            .single();
        if (error) throw error;
        return data;
    }
}

export { UserRepository };
