import Layout from "@/components/core/Layout";
import Link from "next/link";
import React from "react";

type Props = {};

const termosECondicoes = (props: Props) => {
	return (
		<Layout>
			<div className="container mx-auto py-8 px-4">
				<h1 className="text-3xl font-bold mb-4 text-center">
					Termos de Serviço
				</h1>
				<div className="bg-white rounded-lg p-4">
					<p className="mb-4">
						Estes termos de serviço ("Termos") regem o uso do site TenazTech e
						todos os produtos e serviços oferecidos pela TenazTech. Ao acessar
						ou usar o site, você concorda com estes Termos. Leia-os
						cuidadosamente.
					</p>

					<h2 className="text-xl font-semibold mb-2">1. Uso do Site</h2>
					<p className="mb-4">
						Você concorda em usar o site apenas para fins legais e de acordo com
						estes Termos. Você concorda em não usar o site de qualquer maneira
						que possa danificar, desabilitar, sobrecarregar ou prejudicar o site
						ou interferir no uso e aproveitamento de qualquer outra pessoa.
					</p>

					<h2 className="text-xl font-semibold mb-2">2. Conteúdo do Site</h2>
					<p className="mb-4">
						Todo o conteúdo do site TenazTech, incluindo texto, gráficos,
						imagens e informações, é fornecido apenas para fins informativos.
						Não garantimos a precisão, integridade ou utilidade deste conteúdo.
						Você concorda em usar este conteúdo por sua própria conta e risco.
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
						uma conta de usuário. Você é responsável por proteger suas
						credenciais de conta e por todas as atividades que ocorrem em sua
						conta. Reservamos o direito de encerrar contas a nosso critério
						exclusivo.
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
						significativa, tentaremos fornecer um aviso com antecedência
						razoável.
					</p>

					<h2 className="text-xl font-semibold mb-2">
						7. Limitação de Responsabilidade
					</h2>
					<p className="mb-4">
						Em nenhum caso a TenazTech, seus diretores, funcionários ou
						afiliados serão responsáveis perante você ou qualquer outra pessoa
						por quaisquer danos indiretos, consequenciais, exemplares,
						incidentais, especiais ou punitivos, incluindo, mas não se limitando
						a, danos por perda de lucros, goodwill, uso, dados ou outras perdas
						intangíveis, decorrentes de (i) seu acesso ou uso ou incapacidade de
						acessar ou usar o site; (ii) qualquer conduta ou conteúdo de
						terceiros no site; (iii) qualquer conteúdo obtido do site; e (iv)
						acesso não autorizado, uso ou alteração de suas transmissões ou
						conteúdo, seja com base em garantia, contrato, ato ilícito
						(incluindo negligência) ou qualquer outra teoria jurídica, mesmo que
						tenha sido informado sobre a possibilidade de tais danos.
					</p>

					<h2 className="text-xl font-semibold mb-2">8. Lei Aplicável</h2>
					<p className="mb-4">
						Estes Termos serão regidos e interpretados de acordo com as leis do
						Brasil, independentemente dos princípios de conflitos de leis.
					</p>

					<h2 className="text-xl font-semibold mb-2">9. Disposições Gerais</h2>
					<p className="mb-4">
						Estes Termos constituem o acordo integral entre você e a TenazTech
						em relação ao site, e substituem todos os acordos anteriores e
						contemporâneos entre você e a TenazTech em relação ao site.
					</p>

					<p>
						Se você tiver alguma dúvida sobre estes Termos, entre em contato
						conosco.
					</p>
				</div>
			</div>

			<section className="w-full py-12 md:py-24 bg-muted">
				<div className="container mx-auto px-4 md:px-6">
					<h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary mb-8">
						Termos e Condições
					</h1>
					<div className="space-y-6 text-base md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
						<p>Bem-vindo à nossa loja de acessórios eletrônicos. Ao acessar e utilizar nosso site, você concorda com os seguintes termos e condições:</p>
						
						<h2 id="frete-gratis" className="text-2xl font-bold text-secondary mt-8">1. Frete Grátis</h2>
						<p>Este site é operado pela nossa loja. Em todo o site, os termos “nós”, “nos” e “nosso” se referem à nossa loja. Oferecemos este site, incluindo todas as informações, ferramentas e serviços disponíveis para você, o usuário, com a condição de que você aceite todos os termos, condições, políticas e avisos declarados aqui.</p>
						
						<h2 id="garantia" className="text-2xl font-bold text-secondary mt-8">2. Garantia de Satisfação</h2>
						<p>Nossos produtos e serviços estão sujeitos a disponibilidade. Reservamo-nos o direito de limitar a quantidade de produtos ou serviços que oferecemos. Todas as descrições de produtos ou preços de produtos estão sujeitos a alterações a qualquer momento sem aviso prévio, a nosso exclusivo critério.</p>
						
						<h2 id="entrega-rapida" className="text-2xl font-bold text-secondary mt-8">3. Entrega Rápida</h2>
						<p>Não somos responsáveis se as informações disponibilizadas neste site não forem precisas, completas ou atuais. O material neste site é fornecido apenas para informação geral e não deve ser invocado ou utilizado como a única base para tomar decisões sem consultar fontes de informações primárias, mais precisas, mais completas ou mais oportunas.</p>
						
						<h2 id="cupons" className="text-2xl font-bold text-secondary mt-8">4. Cupons Cumulativos</h2>
						<p>A aceitação de um pedido depende da autorização do pagamento. Se não conseguirmos processar ou aceitar seu pedido, nós nos reservamos o direito de cancelar sua compra.</p>
						
						<h2 className="text-2xl font-bold text-secondary mt-8">5. Política de Devolução</h2>
						<p>Oferecemos uma garantia de satisfação de 30 dias para todos os produtos. Se você não estiver satisfeito com sua compra, você pode devolver o produto dentro de 30 dias para um reembolso total. Por favor, consulte nossa página de <Link href="/devolucoes" className="text-primary hover:underline">Devoluções</Link> para mais detalhes.</p>
						
						<h2 className="text-2xl font-bold text-secondary mt-8">6. Modificações dos Termos</h2>
						<p>Reservamo-nos o direito de modificar os termos e condições a qualquer momento, então, por favor, reveja-os com frequência. Alterações e esclarecimentos entrarão em vigor imediatamente após sua publicação no site.</p>

						<p className="mt-8">Se você tiver qualquer dúvida sobre nossos termos e condições, por favor, entre em contato conosco.</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default termosECondicoes;
