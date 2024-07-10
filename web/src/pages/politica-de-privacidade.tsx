import Layout from "@/components/core/Layout";
import React from "react";

type Props = {};

const politicaDePrivacidade = (props: Props) => {
	return (		<Layout>

		<div className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-4 text-center">
				Política de Privacidade
			</h1>
			<div className="bg-white rounded-lg p-4">
				<h2 className="text-lg font-semibold mb-2">1. Coleta de Informações</h2>
				<p className="mb-4">
					A TenazTech coleta informações pessoais dos usuários de várias formas,
					incluindo informações fornecidas voluntariamente pelos usuários, como
					nome, endereço de e-mail, endereço de entrega e informações de
					pagamento ao fazer uma compra.
				</p>

				<h2 className="text-lg font-semibold mb-2">2. Uso das Informações</h2>
				<p className="mb-4">
					As informações coletadas pela TenazTech são usadas para processar
					pedidos, fornecer suporte ao cliente, enviar atualizações sobre
					pedidos e enviar comunicações de marketing, caso o usuário opte por
					recebê-las. As informações pessoais dos usuários nunca serão vendidas,
					alugadas ou compartilhadas com terceiros não afiliados sem
					consentimento prévio.
				</p>

				<h2 className="text-lg font-semibold mb-2">3. Cookies</h2>
				<p className="mb-4">
					A TenazTech utiliza cookies para melhorar a experiência do usuário no
					site, fornecer funcionalidades essenciais, analisar o tráfego e
					personalizar o conteúdo. Os usuários podem optar por recusar cookies,
					mas isso pode afetar a funcionalidade do site.
				</p>

				<h2 className="text-lg font-semibold mb-2">4. Segurança</h2>
				<p className="mb-4">
					A TenazTech está empenhada em proteger as informações pessoais dos
					usuários e implementa medidas de segurança físicas, técnicas e
					administrativas adequadas para proteger contra acesso não autorizado,
					divulgação, alteração ou destruição.
				</p>

				<h2 className="text-lg font-semibold mb-2">5. Direitos do Usuário</h2>
				<p className="mb-4">
					Os usuários têm o direito de acessar, corrigir, atualizar ou excluir
					suas informações pessoais a qualquer momento. Eles também têm o
					direito de optar por não receber comunicações de marketing da
					TenazTech.
				</p>

				<h2 className="text-lg font-semibold mb-2">
					6. Alterações na Política de Privacidade
				</h2>
				<p className="mb-4">
					A TenazTech reserva-se o direito de modificar esta Política de
					Privacidade a qualquer momento, mediante aviso prévio aos usuários.
					Recomendamos que os usuários revisem esta Política de Privacidade
					periodicamente para estar ciente de quaisquer alterações.
				</p>

				<h2 className="text-lg font-semibold mb-2">7. Contato</h2>
				<p>
					Se os usuários tiverem dúvidas ou preocupações sobre esta Política de
					Privacidade, podem entrar em contato conosco através dos canais de
					comunicação fornecidos no site.
				</p>
			</div>
		</div></Layout>
	);
};

export default politicaDePrivacidade;
