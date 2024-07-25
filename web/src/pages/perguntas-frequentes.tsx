import Layout from "@/components/core/Layout";
import React, { useState } from "react";

type Props = {};

type Question = {
	id: number;
	question: string;
	answer: string;
  };

const perguntasFrequentes = (props: Props) => {
	const [questions, setQuestions] = useState<Question[]>([
		{
		  id: 1,
		  question: "Como posso fazer uma compra na boutique?",
		  answer:
			"Fazer uma compra conosco é simples e rápido! Navegue pelo nosso site, selecione os itens que deseja e adicione-os ao seu carrinho de compras. Em seguida, siga as instruções para finalizar o pedido. Se preferir, também estamos disponíveis por <a href='https://api.whatsapp.com/send?phone=554797868892&text=Ol%C3%A1,%20tudo%20bem?' target='_blanck'>telefone</a> para ajudá-la durante o processo de compra.",
		},
		{
		  id: 2,
		  question: "Quais são as opções de pagamento aceitas?",
		  answer:
			"Aceitamos diversas formas de pagamento para sua conveniência. Você pode pagar com cartão de crédito, boleto bancário ou utilizar uma carteira digital. Todas as transações são seguras e protegidas.",
		},
		{
		  id: 3,
		  question: "Como posso rastrear meu pedido?",
		  answer:
			"Após a confirmação da compra, enviaremos um e-mail com o código de rastreamento do seu pedido. Com esse código, você poderá acompanhar o status da entrega em tempo real.",
		},
		{
		  id: 4,
		  question: "Posso trocar ou devolver um item?",
		  answer:
			"Claro! Sua satisfação é nossa prioridade. Caso precise trocar ou devolver algum item, entre em contato conosco no prazo de até 15 dias apés o recebimento da mercadoria. Nossa equipe terá prazer em te auxiliar nesse processo.",
		},
		{
		  id: 5,
		  question: "Vocês oferecem frete grátis?",
		  answer:
			"Sim! Para compras acima de determinado valor, oferecemos frete grátis para todo o país. Fique atenta aos banners promocionais e não perca essa oportunidade.",
		},
		{
		  id: 6,
		  question: "Quais são os prazos de entrega?",
		  answer:
			"O prazo de entrega varia de acordo com a localidade e o tipo de envio selecionado. Na página do produto, vocé encontrará uma estimativa do prazo de entrega para o seu CEP. Nosso time de logística trabalha incansavelmente para garantir que sua compra chegue o mais rápido possível.",
		},
		{
		  id: 7,
		  question: "Vocês têm um programa de fidelidade ou descontos especiais?",
		  answer:
			"Sim! Agradecemos sua fidelidade. Temos um programa de pontos que você acumula a cada compra, e eles podem ser trocados por descontos em suas próximas compras. Além disso, fique de olho em nossas promoções e ofertas especiais, onde você poderá encontrar descontos exclusivos em produtos selecionados.",
		},
		{
		  id: 8,
		  question: "Vocês fazem entregas internacionais?",
		  answer:
			"Atualmente, nossas entregas são feitas apenas dentro do território nacional. Mas estamos sempre trabalhando para expandir nossos serviços e alcançar novos destinos.",
		},
		{
		  id: 9,
		  question: "Como posso entrar em contato com o serviço ao cliente?",
		  answer:
			"Nosso serviço ao cliente está disponível para ajudá-la de segunda a sexta-feira, das 9h às 18h. Você pode entrar em contato conosco por telefone, e-mail ou preenchendo o formulário de contato em nosso site. Será um prazer atendê-la!",
		},
	  ]);
	
	  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
	
	  const handleQuestionClick = (questionId: number) => {
		setActiveQuestion((prevQuestionId) =>
		  prevQuestionId === questionId ? null : questionId
		);
	  };
	
	return (
		<Layout>
		<main className="container px-4 mx-auto my-8">
		  <h1 className="text-4xl font-bold text-center">Perguntas Frequentes</h1>
		  <p className="text-center mt-4 mb-8 text-neutral-500">
			Aqui estão algumas perguntas mais frequentes sobre a empresa.
		  </p>
		  <div id="accordionExample" className="flex flex-col gap-4">
			{questions.map((question) => (
			  <div
				key={question.id}
				className={`rounded-lg border border-neutral-200 bg-white`}
			  >
				<button
				  className={`group relative flex w-full items-center border-0 bg-pink-100 px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
				  type="button"
				  data-te-collapse-init
				  data-te-target={`#collapse-${question.id}`}
				  aria-expanded={activeQuestion === question.id}
				  aria-controls={`collapse-${question.id}`}
				  onClick={() => handleQuestionClick(question.id)}
				>
				  {question.question}
				  <span
					className={`-mr-1 ml-auto h-5 w-5 shrink-0 rotate-${
					  activeQuestion === question.id ? "[-180deg]" : "0"
					} fill-neutral-500 transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none`}
				  >
					{activeQuestion === question.id ? (
					  <svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					  >
						<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
					  </svg>
					) : (
					  <svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					  >
						<path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
					  </svg>
					)}
				  </span>
				</button>
				<div
				  id={`collapse-${question.id}`}
				  className={`${
					activeQuestion === question.id ? "!visible" : "hidden"
				  }`}
				  data-te-collapse-item
				  aria-labelledby={`heading-${question.id}`}
				  data-te-parent="#accordionExample"
				>
				  <div
					className="px-5 py-4"
					dangerouslySetInnerHTML={{ __html: question.answer }}
				  />
				</div>
			  </div>
			))}
		  </div>
		  <p className="text-center mt-8">
			Esperamos que essas perguntas e respostas tenham esclarecido suas
			dúvidas. Caso tenha alguma outra pergunta, não hesite em nos contatar.
			Estamos sempre à disposição para melhor atendê-la. Agradecemos por
			escolher nossa boutique de roupas!
		  </p>
		</main>
		</Layout>
	);
};

export default perguntasFrequentes;
