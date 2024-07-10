import Layout from "@/components/core/Layout";
import Link from "next/link";
import React from "react";

type Props = {};

const ajuda = (props: Props) => {
	return (
		<Layout>
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">Ajuda e Suporte</h1>
				<p className="text-lg mb-6">
					Bem-vindo à nossa página de ajuda e suporte! Como podemos ajudar você
					hoje?
				</p>

				<div className="search-section mb-6">
					<input
						type="text"
						placeholder="Digite sua dúvida..."
						className="w-full p-3 border rounded-lg"
					/>
				</div>

				<div className="help-sections grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="help-section">
						<h2 className="text-xl font-semibold mb-2">Perguntas Frequentes</h2>
						<p className="mb-4">
							Encontre respostas para perguntas comuns dos nossos clientes.
						</p>
						<Link href="/faq" className="btn">
							Ver FAQ
						</Link>
					</div>
					<div className="help-section">
						<h2 className="text-xl font-semibold mb-2">Contato</h2>
						<p className="mb-4">
							Entre em contato conosco se precisar de assistência adicional.
						</p>
						<Link href="/contact" className="btn">
							Entre em Contato
						</Link>
					</div>
					<div className="help-section">
						<h2 className="text-xl font-semibold mb-2">
							Política de Devolução
						</h2>
						<p className="mb-4">
							Saiba mais sobre nossa política de devolução e como devolver um
							produto.
						</p>
						<Link href="/return-policy" className="btn">
							Ver Política de Devolução
						</Link>
					</div>
					<div className="help-section">
						<h2 className="text-xl font-semibold mb-2">Chat ao Vivo</h2>
						<p className="mb-4">
							Converse com um de nossos atendentes em tempo real para obter
							ajuda imediata.
						</p>
						<Link href="/live-chat" className="btn">
							Iniciar Chat
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ajuda;
