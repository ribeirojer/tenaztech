export interface AuthRepository {
	register(email: string, password: string, name?: string): Promise<void>;
	login(
		email: string,
		password: string,
	): Promise<{ accessToken: string; refreshToken: string }>;
	logout(): Promise<void>;
	recoverPassword(email: string): Promise<void>;
}
