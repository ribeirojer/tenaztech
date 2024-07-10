import Layout from "@/components/core/Layout";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

type Props = {};

const entrar = (props: Props) => {
	const { login } = useAuth();
	// Exemplo de função de login que recebe um token JWT do servidor
	const handleLogin = async (username: any, password: any) => {
		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				const { token } = await response.json();
				login(token); // Chama a função login do AuthProvider com o token recebido
			} else {
				// Tratamento de erro, como exibir mensagem de erro para o usuário
			}
		} catch (error) {
			console.error("Erro ao realizar login:", error);
		}
	};

	return 		(<Layout>
	<div>Entrar</div></Layout>);
};

export default entrar;
