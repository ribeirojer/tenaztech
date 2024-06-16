import { MercadoPagoConfig, Preference } from "mercadopago";

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN as string;

const client = new MercadoPagoConfig({ accessToken });
const preferences = new Preference(client);

export { preferences };
