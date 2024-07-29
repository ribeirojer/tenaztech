import Layout from "@/components/core/Layout";
import React from "react";

type Props = {};

const Devolucoes = (props: Props) => {
	return (
		<Layout>
			<section className="py-16 bg-gray-100">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl font-bold text-center mb-8">
						Política de Devoluções
					</h1>
					<div className="bg-white shadow-md rounded-lg p-8">
						<h2 className="text-2xl font-semibold mb-4">
							Como fazer uma devolução
						</h2>
						<p className="mb-4">
							Se você não está satisfeito com sua compra, pode devolver os
							produtos de acordo com as instruções abaixo:
						</p>
						<ol className="list-decimal list-inside mb-6">
							<li className="mb-2">
								Entre em contato com o nosso suporte ao cliente pelo e-mail{" "}
								<a href="mailto:suporte@exemplo.com" className="text-blue-500">
									suporte@exemplo.com
								</a>{" "}
								ou pelo telefone (XX) XXXX-XXXX.
							</li>
							<li className="mb-2">
								Informe o número do seu pedido e o motivo da devolução.
							</li>
							<li className="mb-2">
								Aguarde o retorno com as instruções detalhadas para o envio do
								produto.
							</li>
							<li className="mb-2">
								Envie o produto na embalagem original, com todos os acessórios e
								manuais, para o endereço fornecido pelo suporte.
							</li>
							<li className="mb-2">
								Assim que recebermos o produto, faremos a análise e, se
								aprovado, o reembolso ou troca será processado.
							</li>
						</ol>
						<h2 className="text-2xl font-semibold mb-4">Prazos e Condições</h2>
						<p className="mb-4">
							A devolução deve ser solicitada em até 30 dias corridos após o
							recebimento do produto. Os produtos devolvidos devem estar em
							perfeito estado, sem sinais de uso, e na embalagem original.
						</p>
						<p className="mb-4">
							Produtos danificados, sem embalagem original ou com sinais de uso
							não serão aceitos.
						</p>
						<h2 className="text-2xl font-semibold mb-4">Reembolsos</h2>
						<p className="mb-4">
							Os reembolsos serão processados após a análise do produto
							devolvido. O valor será creditado na mesma forma de pagamento
							utilizada na compra, em até 10 dias úteis.
						</p>
						<h2 className="text-2xl font-semibold mb-4">Contato</h2>
						<p className="mb-4">
							Se você tiver qualquer dúvida sobre o processo de devolução, entre
							em contato com a nossa equipe de suporte:
						</p>
						<ul className="list-disc list-inside mb-6">
							<li className="mb-2">
								E-mail:{" "}
								<a href="mailto:suporte@exemplo.com" className="text-blue-500">
									suporte@exemplo.com
								</a>
							</li>
							<li className="mb-2">Telefone: (XX) XXXX-XXXX</li>
							<li className="mb-2">
								Horário de atendimento: de segunda a sexta, das 9h às 18h
							</li>
						</ul>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Devolucoes;
