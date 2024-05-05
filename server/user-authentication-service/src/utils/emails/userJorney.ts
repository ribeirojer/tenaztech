const link = "https://boutique-da-moh.vercel.app/";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST as string;
const SMTP_PORT = parseInt(process.env.SMTP_PORT as string, 10);
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

//E-mail de boas-vindas para novos usuários, após se registrarem na loja.
export const sendWelcomeEmail = async (
  firstName: string,
  email: string,
  confirmationLink: string
): Promise<void> => {
  const welcomeEmailConfig = {
    from: sender,
    to: email,
    subject: "Boas-vindas à Boutique da Moh!",
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
        <p>Bem-vindo(a) à Boutique da Moh! Estamos emocionados em ter você como parte da nossa comunidade de moda.</p>
        <p>Clique no link abaixo para confirmar sua conta e começar a explorar nosso incrível catálogo de roupas:</p>
        <a href="${confirmationLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #ec4899; color: #fff; text-decoration: none;">Confirmar Conta</a>
      </div>`,
  };
  await sendEmail(welcomeEmailConfig);
};

//E-mail de confirmação de cadastro com detalhes da conta.
export const sendConfirmationEmailWithAccountDetails = async (
  firstName: string,
  email: string
): Promise<void> => {
  const confirmationEmailConfig = {
    from: sender,
    to: email,
    subject: "Confirmação de Cadastro - Detalhes da Sua Conta",
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
        <p>Seu cadastro na Boutique da Moh foi confirmado com sucesso!</p>
        <p>Clique no link abaixo para acessar nosso catálogo de roupas:</p>
        <a href="${link}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Acessar Catálogo</a>
      </div>`,
  };
  await sendEmail(confirmationEmailConfig);
};
