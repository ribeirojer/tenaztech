import { AuthRepository } from "../../domain/interfaces/AuthRepository.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseAuthRepository implements AuthRepository {
    async register(email: string, password: string, name?: string): Promise<void> {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }

        if (name) {
            const { data, error } = await supabase
                .from("profiles")
                .insert([{ id: user?.id, email, name }]);

            if (error) {
                throw new Error(`Error saving user profile: ${error.message}`);
            }
        }
    }

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        const { session, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            throw new Error(`Error logging in: ${error.message}`);
        }

        return {
            accessToken: session?.access_token || '',
            refreshToken: session?.refresh_token || '',
        };
    }

    async logout(): Promise<void> {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error(`Error logging out: ${error.message}`);
        }
    }

    async recoverPassword(email: string): Promise<void> {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email);

        if (error) {
            throw new Error(`Error sending password recovery email: ${error.message}`);
        }
    }
}
