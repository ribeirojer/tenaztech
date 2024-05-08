export function createSlug(title: string): string {
	// Remove espaços em branco no início e no final do título
	let slug = title
		.normalize("NFD") // Normaliza caracteres acentuados
		.replace(/[\u0300-\u036f]/g, "") // Remove combinações de caracteres acentuados
		.toLowerCase(); // Converte para letras minúsculas

	// Substitui espaços em branco e caracteres especiais por hífen
	slug = slug.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

	return slug;
}

export function formatDateTime(date: Date): string {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function fillStars(rating: number, index: number): "fill" | "regular" {
	if (index < rating) {
		return "fill";
	}
	return "regular";
}

export function formatCurrency(value: number): string {
	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}

export function limitarDescricao(descricao: string, limite: number): string {
	if (descricao.length > limite) {
		// Se a descrição for maior que o limite, truncá-la e adicionar "..."
		return `${descricao.substring(0, limite)}...`;
	}
	// Caso contrário, retornar a descrição original
	return descricao;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
export const zipRegex = /^\d{5}-?\d{3}$/;