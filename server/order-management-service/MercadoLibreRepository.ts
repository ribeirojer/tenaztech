import mercadopago from "mercadopago";
import { config } from "dotenv";
import { productsData } from "../utils/cardsData";

config({ path: ".env" });

const access_token = process.env.MERCADO_PAGO_ACCESS_TOKEN as string;
const BASE_URL = process.env.BASE_URL as string;

interface OrderItem {
  _id: string;
  name: string;
  qty: number;
}

mercadopago.configure({
  access_token,
});

const mercadoPagoPublicKey = process.env.MERCADO_PAGO_PUBLIC_KEY;
if (!mercadoPagoPublicKey) {
  console.log("Error: public key not defined");
  //process.exit(1);
}
const mercadoPagoAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
if (!mercadoPagoAccessToken) {
  console.log("Error: access token not defined");
  //process.exit(1);
}

function validateError(error: any) {
  let errorMessage = "Unknown error cause";
  let errorStatus = 400;

  if (error.cause) {
    const sdkErrorMessage = error.cause[0].description;
    errorMessage = sdkErrorMessage || errorMessage;

    const sdkErrorStatus = error.status;
    errorStatus = sdkErrorStatus || errorStatus;
  }

  return { errorMessage, errorStatus };
}

//mercadopago.configurations.setAccessToken(mercadoPagoAccessToken as string);

export class MercadoLibreRepository {
  static async createPayment(order: any) {
    const {
      payer,
      transactionAmount,
      token,
      description,
      installments,
      paymentMethodId,
      issuerId,
    } = order;
    const paymentData = {
      transaction_amount: Number(transactionAmount),
      token,
      description: description,
      installments: Number(installments),
      payment_method_id: paymentMethodId,
      issuer_id: issuerId,
      payer: {
        email: payer.email,
        identification: {
          type: payer.identification.docType,
          number: payer.identification.docNumber,
        },
      },
    };

    try {
      const { response: data } = await mercadopago.payment.save(paymentData);
      return {
        detail: data.status_detail,
        status: data.status,
        id: data.id,
      };
    } catch (error) {
      console.log(error);
      const { errorMessage, errorStatus } = validateError(error);
      return { error_message: errorMessage };
    }
  }

  static async createPreference(order: any): Promise<any> {
    try {
      const selected = order.orderItems.map((objeto: any) => objeto.name);

      const products = productsData.filter((product: any) =>
        selected.includes(product.id.toString())
      );

      const items = products.map((product: any, index: any) => ({
        id: String(product.id),
        title: product.name,
        description: product.description.slice(0, 255),
        quantity: order.orderItems[index].qty,
        unit_price: parseFloat(product.price.toString()),
      }));

      const preference = {
        items,
        back_urls: {
          success: `${BASE_URL}/success`,
          failure: `${BASE_URL}/failure`,
          pending: `${BASE_URL}/pending`,
        },
        payer: {
          address: {
            zip_code: "" + order.zip_code,
            street_name: order.address,
            street_number: 0,
          },
          email: order.email,
          identification: { number: "" + order.id, type: "" },
          name: "" + order.id,
        },
      };

      const preferenceResponse = await mercadopago.preferences.create(
        preference
      );

      return preferenceResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
