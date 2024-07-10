import Layout from "@/components/core/Layout";
import React from "react";

type Props = {};

const termosECondicoes = (props: Props) => {
	return (		<Layout>

		<div className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Termos de Serviço</h1>
			<div className="bg-white rounded-lg p-4">
				<p className="mb-4">
					Estes termos de serviço ("Termos") regem o uso do site TenazTech e
					todos os produtos e serviços oferecidos pela TenazTech. Ao acessar ou
					usar o site, você concorda com estes Termos. Leia-os cuidadosamente.
				</p>

				<h2 className="text-xl font-semibold mb-2">1. Uso do Site</h2>
				<p className="mb-4">
					Você concorda em usar o site apenas para fins legais e de acordo com
					estes Termos. Você concorda em não usar o site de qualquer maneira que
					possa danificar, desabilitar, sobrecarregar ou prejudicar o site ou
					interferir no uso e aproveitamento de qualquer outra pessoa.
				</p>

				<h2 className="text-xl font-semibold mb-2">2. Conteúdo do Site</h2>
				<p className="mb-4">
					Todo o conteúdo do site TenazTech, incluindo texto, gráficos, imagens
					e informações, é fornecido apenas para fins informativos. Não
					garantimos a precisão, integridade ou utilidade deste conteúdo. Você
					concorda em usar este conteúdo por sua própria conta e risco.
				</p>

				<h2 className="text-xl font-semibold mb-2">3. Privacidade</h2>
				<p className="mb-4">
					Ao usar o site, você concorda com nossa política de privacidade, que
					descreve como coletamos, usamos e protegemos suas informações
					pessoais. Leia nossa Política de Privacidade cuidadosamente.
				</p>

				<h2 className="text-xl font-semibold mb-2">4. Contas de Usuário</h2>
				<p className="mb-4">
					Para acessar certos recursos do site, você pode ser obrigado a criar
					uma conta de usuário. Você é responsável por proteger suas credenciais
					de conta e por todas as atividades que ocorrem em sua conta.
					Reservamos o direito de encerrar contas a nosso critério exclusivo.
				</p>

				<h2 className="text-xl font-semibold mb-2">
					5. Propriedade Intelectual
				</h2>
				<p className="mb-4">
					Todo o conteúdo do site TenazTech, incluindo mas não se limitando a
					textos, gráficos, logotipos, ícones de botões, imagens, clipes de
					áudio e vídeo, compilações de dados e software, é propriedade
					exclusiva da TenazTech ou de seus licenciadores e é protegido pelas
					leis de direitos autorais internacionais.
				</p>

				<h2 className="text-xl font-semibold mb-2">
					6. Modificações nos Termos de Serviço
				</h2>
				<p className="mb-4">
					Reservamos o direito, a nosso critério exclusivo, de modificar ou
					substituir estes Termos a qualquer momento. Se uma revisão for
					significativa, tentaremos fornecer um aviso com antecedência razoável.
				</p>

				<h2 className="text-xl font-semibold mb-2">
					7. Limitação de Responsabilidade
				</h2>
				<p className="mb-4">
					Em nenhum caso a TenazTech, seus diretores, funcionários ou afiliados
					serão responsáveis perante você ou qualquer outra pessoa por quaisquer
					danos indiretos, consequenciais, exemplares, incidentais, especiais ou
					punitivos, incluindo, mas não se limitando a, danos por perda de
					lucros, goodwill, uso, dados ou outras perdas intangíveis, decorrentes
					de (i) seu acesso ou uso ou incapacidade de acessar ou usar o site;
					(ii) qualquer conduta ou conteúdo de terceiros no site; (iii) qualquer
					conteúdo obtido do site; e (iv) acesso não autorizado, uso ou
					alteração de suas transmissões ou conteúdo, seja com base em garantia,
					contrato, ato ilícito (incluindo negligência) ou qualquer outra teoria
					jurídica, mesmo que tenha sido informado sobre a possibilidade de tais
					danos.
				</p>

				<h2 className="text-xl font-semibold mb-2">8. Lei Aplicável</h2>
				<p className="mb-4">
					Estes Termos serão regidos e interpretados de acordo com as leis do
					Brasil, independentemente dos princípios de conflitos de leis.
				</p>

				<h2 className="text-xl font-semibold mb-2">9. Disposições Gerais</h2>
				<p className="mb-4">
					Estes Termos constituem o acordo integral entre você e a TenazTech em
					relação ao site, e substituem todos os acordos anteriores e
					contemporâneos entre você e a TenazTech em relação ao site.
				</p>

				<p>
					Se você tiver alguma dúvida sobre estes Termos, entre em contato
					conosco.
				</p>
			</div>
		</div></Layout>
	);
};

export default termosECondicoes;
