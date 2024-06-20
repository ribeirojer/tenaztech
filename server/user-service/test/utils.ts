// Função base para requisições
export const req = (path: string, options?: RequestInit) =>
	new Request(`http://localhost:3000${path}`, options);

// Função para requisição POST
export const post = (path: string, body: Record<string, unknown>) =>
	new Request(`http://localhost:3000${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

// Função para requisição GET
export const get = (path: string) =>
	new Request(`http://localhost:3000${path}`, {
		method: "GET",
	});

// Função para requisição PUT
export const put = (path: string, body: Record<string, unknown>) =>
	new Request(`http://localhost:3000${path}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

// Função para requisição PATCH
export const patch = (path: string, body: Record<string, unknown>) =>
	new Request(`http://localhost:3000${path}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

// Função para requisição DELETE
export const del = (path: string) =>
	new Request(`http://localhost:3000${path}`, {
		method: "DELETE",
	});

// Função para delay
export const delay = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay));
