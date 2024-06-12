import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST as string;
const SMTP_PORT = Number.parseInt(process.env.SMTP_PORT as string, 10);
const SMTP_EMAIL = process.env.SMTP_EMAIL as string;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;
const sender = "onboarding@resend.dev";

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: true,
	auth: {
		user: SMTP_EMAIL,
		pass: SMTP_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

const sendEmail = async (options: {
	from: string;
	to: string;
	subject: string;
	html: string;
}): Promise<void> => {
	try {
		const info = await transporter.sendMail(options);
		console.log("E-mail enviado:", info.messageId);
	} catch (error) {
		console.error("Erro ao enviar o e-mail:", error);
		throw new Error("Erro ao enviar o e-mail.");
	}
};

// E-mails promocionais com descontos em produtos específicos ou categorias.
export const sendPromotionalEmail = async (
	firstName: string,
	email: string,
	promoLink: string,
	discountAmount: number,
	productCategory: string,
): Promise<void> => {
	const promotionalEmailConfig = {
		from: sender,
		to: email,
		subject: "Oferta Especial para Você!",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Temos uma oferta especial esperando por você! Aproveite este desconto incrível em nossa categoria de ${productCategory}:</p>
      <p>Desconto: ${discountAmount}%</p>
      <a href="${promoLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Ver Oferta</a>
    </div>`,
	};
	await sendEmail(promotionalEmailConfig);
};

// E-mails de ofertas sazonais, como liquidações, Black Friday, Natal, etc.
export const sendSeasonalOfferEmail = async (
	firstName: string,
	email: string,
	promoLink: string,
	offerTitle: string,
	offerDescription: string,
): Promise<void> => {
	const seasonalOfferEmailConfig = {
		from: sender,
		to: email,
		subject: `Oferta Especial: ${offerTitle}`,
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Temos uma oferta sazonal especial para você! Confira nossas ofertas de ${offerTitle}:</p>
      <p>${offerDescription}</p>
      <a href="${promoLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Ver Oferta</a>
    </div>`,
	};
	await sendEmail(seasonalOfferEmailConfig);
};

// E-mails com códigos de cupom de desconto exclusivos.
export const sendCouponEmail = async (
	firstName: string,
	email: string,
	couponCode: string,
): Promise<void> => {
	const couponEmailConfig = {
		from: sender,
		to: email,
		subject: "Seu Código de Cupom Exclusivo!",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "        
          />
    <p>Olá ${firstName},</p>
    <p>Aqui está um presente especial para você: Use o código de cupom <strong>${couponCode}</strong> e receba um desconto exclusivo em sua próxima compra!</p>
    <p>Corra e aproveite esta oferta limitada!</p>
  </div>`,
	};
	await sendEmail(couponEmailConfig);
};

// E-mails de Recuperação de Carrinho Abandonado:
export const sendCartRecoveryEmail = async (
	firstName: string,
	email: string,
	cartRecoveryLink: string,
): Promise<void> => {
	const cartRecoveryEmailConfig = {
		from: sender,
		to: email,
		subject: "Volte e Conclua sua Compra!",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Parece que você esqueceu algo em seu carrinho! Não perca a oportunidade de comprar esses itens incríveis:</p>
      <a href="${cartRecoveryLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Recuperar Carrinho</a>
    </div>`,
	};
	await sendEmail(cartRecoveryEmailConfig);
};

// E-mails lembrando os usuários sobre os produtos que deixaram no carrinho sem finalizar a compra.
export const sendReminderEmailForAbandonedCart = async (
	firstName: string,
	email: string,
	cartItems: Array<{ productName: string; productLink: string }>,
): Promise<void> => {
	const cartReminderEmailConfig = {
		from: sender,
		to: email,
		subject: "Itens Pendentes em Seu Carrinho - Não Perca!",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Parece que você deixou alguns itens incríveis em seu carrinho! Não perca a chance de adquiri-los:</p>
      <ul>
        ${cartItems
					.map(
						(item) =>
							`<li><a href="${item.productLink}">${item.productName}</a></li>`,
					)
					.join("")}
      </ul>
      <p>Volte agora para concluir sua compra e aproveitar esses produtos.</p>
    </div>`,
	};
	await sendEmail(cartReminderEmailConfig);
};

// E-mails de Confirmação de Compra:
export const sendPurchaseConfirmationEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
	purchasedItems: Array<{
		productName: string;
		quantity: number;
		price: number;
	}>,
): Promise<void> => {
	const purchaseConfirmationEmailConfig = {
		from: sender,
		to: email,
		subject: "Confirmação de Compra - Seu Pedido na Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Parabéns! Sua compra na Boutique da Moh foi confirmada com sucesso.</p>
      <p>Número do Pedido: ${orderNumber}</p>
      <p>Itens Adquiridos:</p>
      <ul>
        ${purchasedItems
					.map(
						(item) =>
							`<li>${item.productName} (Quantidade: ${
								item.quantity
							}, Preço: ${item.price.toFixed(2)} R$)</li>`,
					)
					.join("")}
      </ul>
      <p>Agradecemos por escolher a Boutique da Moh. Aguardamos ansiosamente por mais compras suas!</p>
    </div>`,
	};
	await sendEmail(purchaseConfirmationEmailConfig);
};

// E-mail confirmando os detalhes da compra após a finalização do pedido.
export const sendOrderDetailsConfirmationEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
	totalAmount: number,
	shippingAddress: string,
	purchasedItems: Array<{
		productName: string;
		quantity: number;
		price: number;
	}>,
): Promise<void> => {
	const orderDetailsConfirmationEmailConfig = {
		from: sender,
		to: email,
		subject: "Detalhes da Compra - Pedido Confirmado na Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Seu pedido na Boutique da Moh foi confirmado com sucesso.</p>
      <p>Número do Pedido: ${orderNumber}</p>
      <p>Endereço de Envio: ${shippingAddress}</p>
      <p>Itens Adquiridos:</p>
      <ul>
        ${purchasedItems
					.map(
						(item) =>
							`<li>${item.productName} (Quantidade: ${
								item.quantity
							}, Preço: ${item.price.toFixed(2)} R$)</li>`,
					)
					.join("")}
      </ul>
      <p>Total da Compra: ${totalAmount.toFixed(2)} R$</p>
      <p>Obrigado por escolher a Boutique da Moh. Aguardamos ansiosamente por mais compras suas!</p>
    </div>`,
	};
	await sendEmail(orderDetailsConfirmationEmailConfig);
};

// E-mail com informações sobre como acompanhar o status do pedido.
export const sendOrderStatusTrackingEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
	trackingLink: string,
): Promise<void> => {
	const orderStatusTrackingEmailConfig = {
		from: sender,
		to: email,
		subject: "Acompanhe o Status do Seu Pedido - Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Seu pedido na Boutique da Moh (número do pedido: ${orderNumber}) está a caminho!</p>
      <p>Você pode acompanhar o status do seu pedido através do link de rastreamento abaixo:</p>
      <a href="${trackingLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Acompanhar Pedido</a>
      <p>Agradecemos por escolher a Boutique da Moh. Ficamos felizes em atendê-lo!</p>
    </div>`,
	};
	await sendEmail(orderStatusTrackingEmailConfig);
};

// E-mails de atualizações de status de entrega.
export const sendDeliveryStatusUpdateEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
	deliveryStatus: string,
	deliveryDate: string,
): Promise<void> => {
	const deliveryStatusUpdateEmailConfig = {
		from: sender,
		to: email,
		subject: `Atualização de Status de Entrega - Pedido ${orderNumber}`,
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Queremos informar que o status de entrega do seu pedido (número do pedido: ${orderNumber}) foi atualizado.</p>
      <p>Status de Entrega: ${deliveryStatus}</p>
      <p>Data Estimada de Entrega: ${deliveryDate}</p>
      <p>Agradecemos por escolher a Boutique da Moh. Seu pedido está a caminho!</p>
    </div>`,
	};
	await sendEmail(deliveryStatusUpdateEmailConfig);
};

// E-mails de Feedback e Avaliação:
export const sendFeedbackAndReviewEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
): Promise<void> => {
	const feedbackAndReviewEmailConfig = {
		from: sender,
		to: email,
		subject: `Compartilhe Sua Experiência - Avaliação do Pedido ${orderNumber}`,
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Esperamos que tenha tido uma excelente experiência com a Boutique da Moh!</p>
      <p>Seu feedback é muito importante para nós. Por favor, tire um momento para avaliar os produtos e a experiência de compra.</p>
      <p>Acesse o link abaixo para compartilhar sua avaliação:</p>
      <a href="https://exemplo.com/avaliacao?pedido=${orderNumber}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Avaliar Agora</a>
      <p>Obrigado por escolher a Boutique da Moh. Sua opinião nos ajuda a melhorar continuamente.</p>
    </div>`,
	};
	await sendEmail(feedbackAndReviewEmailConfig);
};

// E-mail confirmando a solicitação de troca ou devolução de um produto.
export const sendReturnOrExchangeSolicitationEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
	itemToReturn: string,
	returnReason: string,
): Promise<void> => {
	const returnConfirmationEmailConfig = {
		from: sender,
		to: email,
		subject: `Confirmação de Solicitação de Troca/Devolução - Pedido ${orderNumber}`,
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Confirmamos o recebimento da sua solicitação de troca/devolução para o item:</p>
      <p>Item: ${itemToReturn}</p>
      <p>Motivo da Troca/Devolução: ${returnReason}</p>
      <p>Estamos trabalhando para atender a sua solicitação o mais breve possível. Entraremos em contato com você em breve para fornecer mais instruções.</p>
      <p>Agradecemos por escolher a Boutique da Moh. Lamentamos pelo inconveniente e faremos o melhor para resolver isso para você.</p>
    </div>`,
	};
	await sendEmail(returnConfirmationEmailConfig);
};

// E-mails de Confirmação de Troca ou Devolução:
export const sendReturnOrExchangeConfirmationEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
	returnOrExchange: string,
	itemToReturn: string,
	returnReason: string,
): Promise<void> => {
	const returnOrExchangeConfirmationEmailConfig = {
		from: sender,
		to: email,
		subject: `Confirmação de ${returnOrExchange} - Pedido ${orderNumber}`,
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Confirmamos a ${returnOrExchange.toLowerCase()} do item:</p>
      <p>Item: ${itemToReturn}</p>
      <p>Motivo da ${returnOrExchange.toLowerCase()}: ${returnReason}</p>
      <p>A sua ${returnOrExchange.toLowerCase()} está sendo processada e será concluída em breve.</p>
      <p>Agradecemos por escolher a Boutique da Moh. Se tiver alguma dúvida, entre em contato conosco.</p>
    </div>`,
	};
	await sendEmail(returnOrExchangeConfirmationEmailConfig);
};

// E-mails de Confirmação de Pagamento:
export const sendPaymentConfirmationEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
	paymentAmount: number,
	paymentMethod: string,
): Promise<void> => {
	const paymentConfirmationEmailConfig = {
		from: sender,
		to: email,
		subject: `Confirmação de Pagamento - Pedido ${orderNumber}`,
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Confirmamos o recebimento do seu pagamento para o pedido (número do pedido: ${orderNumber}).</p>
      <p>Valor Pago: ${paymentAmount.toFixed(2)} R$</p>
      <p>Método de Pagamento: ${paymentMethod}</p>
      <p>O seu pedido está sendo processado e será enviado em breve.</p>
      <p>Agradecemos por escolher a Boutique da Moh. Se tiver alguma dúvida, entre em contato conosco.</p>
    </div>`,
	};
	await sendEmail(paymentConfirmationEmailConfig);
};

// E-mails de aniversário com ofertas especiais para os clientes.
export const sendBirthdaySpecialOfferEmail = async (
	firstName: string,
	email: string,
	birthdayDiscount: number,
	birthdayOfferLink: string,
): Promise<void> => {
	const birthdaySpecialOfferEmailConfig = {
		from: sender,
		to: email,
		subject: "Feliz Aniversário! Oferta Especial da Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Feliz Aniversário! Para comemorar esta data especial, temos uma oferta especial para você:</p>
      <p>Desconto de Aniversário: ${birthdayDiscount}%</p>
      <p>Clique no link abaixo para aproveitar a oferta:</p>
      <a href="${birthdayOfferLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Ver Oferta</a>
      <p>Agradecemos por escolher a Boutique da Moh. Esperamos que aproveite a oferta em seu dia especial!</p>
    </div>`,
	};
	await sendEmail(birthdaySpecialOfferEmailConfig);
};

// E-mails informando sobre pontos ou recompensas acumulados no programa de fidelidade.
export const sendLoyaltyPointsEmail = async (
	firstName: string,
	email: string,
	loyaltyPoints: number,
	loyaltyRewardsLink: string,
): Promise<void> => {
	const loyaltyPointsEmailConfig = {
		from: sender,
		to: email,
		subject: "Pontos de Fidelidade - Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Parabéns! Você acumulou ${loyaltyPoints} pontos no nosso programa de fidelidade.</p>
      <p>Clique no link abaixo para verificar as recompensas disponíveis:</p>
      <a href="${loyaltyRewardsLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Ver Recompensas</a>
      <p>Agradecemos por escolher a Boutique da Moh. Continue acumulando pontos e aproveite as recompensas!</p>
    </div>`,
	};
	await sendEmail(loyaltyPointsEmailConfig);
};

// E-mails sugerindo produtos relacionados com base nas compras anteriores.
export const sendRecommendedProductsEmail = async (
	firstName: string,
	email: string,
	previousPurchases: Array<string>,
	recommendedProducts: Array<{
		productName: string;
		price: number;
		productLink: string;
	}>,
): Promise<void> => {
	const recommendedProductsEmailConfig = {
		from: sender,
		to: email,
		subject: "Produtos Sugeridos - Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Com base nas suas compras anteriores, gostaríamos de sugerir alguns produtos que você pode gostar:</p>
      <ul>
        ${recommendedProducts
					.map(
						(product) =>
							`<li>
                 <a href="${product.productLink}">${
										product.productName
									}</a> - Preço: ${product.price.toFixed(2)} R$
               </li>`,
					)
					.join("")}
      </ul>
      <p>Agradecemos por escolher a Boutique da Moh. Esperamos que você goste das nossas sugestões!</p>
    </div>`,
	};
	await sendEmail(recommendedProductsEmailConfig);
};

// E-mails alteração da senha com link para redefinição de senha:
export const sendPasswordChangeEmail = async (data: any): Promise<void> => {
	const { firstName, email, resetLink } = data;

	const passwordChangeEmailConfig = {
		from: sender,
		to: email,
		subject: "Alteração de Senha - Boutique da Moh",
		html: `
      <div style="background-color: #f7cac9; margin: 0 auto">
        <img
          alt="Logo Boutique da Moh"
          src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
          width="64"
          height="64"
          style="
            display: block;
            outline: none;
            border: none;
            text-decoration: none;
            margin: 64px 0 56px;
          "
        />
        <p>Olá ${firstName},</p>
        <p>Recebemos uma solicitação para alteração da senha da sua conta na Boutique da Moh.</p>
        <p>Para alterar sua senha, clique no link abaixo:</p>
        <a href="${resetLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Redefinir senha</a>
        <p>Se você não solicitou essa alteração, pode ignorar este e-mail com segurança.</p>
        <p>Agradecemos por escolher a Boutique da Moh. Mantemos a segurança da sua conta como uma prioridade.</p>
      </div>`,
	};
	await sendEmail(passwordChangeEmailConfig);
};

// E-mails alteração da senha:
export const sendConfirmPasswordChangeEmail = async (
	firstName: string,
	email: string,
): Promise<void> => {
	const passwordChangeEmailConfig = {
		from: sender,
		to: email,
		subject: "Alteração de Senha - Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Queremos informar que a senha da sua conta na Boutique da Moh foi alterada.</p>
      <p>Se você reconhece essa alteração, não é necessário fazer nada. Caso não tenha feito essa alteração, entre em contato conosco imediatamente.</p>
      <p>Agradecemos por escolher a Boutique da Moh. Mantemos a segurança da sua conta como uma prioridade.</p>
    </div>`,
	};
	await sendEmail(passwordChangeEmailConfig);
};

// E-mails alteração do endereço:
export const sendAddressChangeEmail = async (
	firstName: string,
	email: string,
	newAddress: string,
): Promise<void> => {
	const addressChangeEmailConfig = {
		from: sender,
		to: email,
		subject: "Alteração de Endereço - Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Queremos informar que o endereço de entrega associado à sua conta na Boutique da Moh foi alterado para:</p>
      <p>${newAddress}</p>
      <p>Se você reconhece essa alteração, não é necessário fazer nada. Caso não tenha feito essa alteração, entre em contato conosco imediatamente.</p>
      <p>Agradecemos por escolher a Boutique da Moh. Mantemos a segurança da sua conta como uma prioridade.</p>
    </div>`,
	};
	await sendEmail(addressChangeEmailConfig);
};

// E-mails de Suporte e Atendimento ao Cliente:
export const sendCustomerSupportEmail = async (
	firstName: string,
	email: string,
	supportMessage: string,
): Promise<void> => {
	const customerSupportEmailConfig = {
		from: sender,
		to: email,
		subject: "Atendimento ao Cliente - Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Recebemos a sua mensagem de suporte:</p>
      <p>${supportMessage}</p>
      <p>Estamos aqui para ajudar! Responderemos à sua mensagem o mais rápido possível.</p>
      <p>Agradecemos por escolher a Boutique da Moh e por entrar em contato conosco.</p>
    </div>`,
	};
	await sendEmail(customerSupportEmailConfig);
};

// E-mails de Cancelamento de Pedido:
export const sendOrderCancellationEmail = async (
	firstName: string,
	email: string,
	orderNumber: string,
	cancellationReason: string,
): Promise<void> => {
	const orderCancellationEmailConfig = {
		from: sender,
		to: email,
		subject: "Cancelamento de Pedido - Boutique da Moh",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Queremos informar que o pedido com número ${orderNumber} foi cancelado.</p>
      <p>Motivo do Cancelamento: ${cancellationReason}</p>
      <p>Se você não solicitou esse cancelamento ou precisa de assistência, entre em contato conosco o mais rápido possível.</p>
      <p>Agradecemos por escolher a Boutique da Moh. Esperamos poder atendê-lo(a) novamente em breve.</p>
    </div>`,
	};
	await sendEmail(orderCancellationEmailConfig);
};

// E-mails anunciando novos produtos, coleções ou eventos especiais.
export const sendProductAnnouncementEmail = async (
	firstName: string,
	email: string,
	announcementType: string,
	announcementTitle: string,
	announcementDescription: string,
	announcementLink: string,
): Promise<void> => {
	const productAnnouncementEmailConfig = {
		from: sender,
		to: email,
		subject: `Novidades na Boutique da Moh - ${announcementType}`,
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá ${firstName},</p>
      <p>Temos uma emocionante novidade para você na Boutique da Moh:</p>
      <h3>${announcementTitle}</h3>
      <p>${announcementDescription}</p>
      <p>Confira mais detalhes clicando no link abaixo:</p>
      <a href="${announcementLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Ver Novidade</a>
      <p>Fique por dentro das últimas tendências e eventos especiais!</p>
    </div>`,
	};
	await sendEmail(productAnnouncementEmailConfig);
};

// E-mails de Redefinição de Senha:
export const sendPasswordResetEmail = async (
	email: string,
	resetLink: string,
): Promise<void> => {
	const emailConfig = {
		from: sender,
		to: email,
		subject: "Redefinição de Senha",
		html: `    <div style="background-color: #f7cac9; margin: 0 auto">
          <img
            alt="Logo Boutique da Moh"
            src="https://boutique-da-moh.vercel.app/_next/image?url=%2Flogo-sem-bg.png&w=128&q=75"
            width="64"
            height="64"
            style="
              display: block;
              outline: none;
              border: none;
              text-decoration: none;
              margin: 64px 0 56px;
            "      
          />
      <p>Olá,</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Redefinir senha</a>
    </div>`,
	};
	await sendEmail(emailConfig);
};
