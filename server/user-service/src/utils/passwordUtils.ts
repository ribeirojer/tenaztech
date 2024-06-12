import bcryptjs from "bcryptjs";

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
	const salt = await bcryptjs.genSalt(saltRounds);
	const hashedPassword = await bcryptjs.hash(password, salt);
	return hashedPassword;
}

// Função para gerar um token único
export function generateToken(): string {
	return bcryptjs.genSaltSync(20).toString();
}
