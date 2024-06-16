import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

const mercadopago_access_token = process.env.MERCADO_PAGO_ACCESS_TOKEN || "";

const client = new MercadoPagoConfig({
	accessToken: mercadopago_access_token,
	options: { timeout: 5000 },
});
const preference = new Preference(client);

export const createPreference = async (order: any) => {
	const items = order.items.map((item: any) => ({
		id: item.id || "",
		title: item.title,
		quantity: item.quantity,
		currency_id: "BRL",
		unit_price: item.price,
	}));

	const body = {
		items,
		payer: {
			name: order.customer_name,
			email: order.customer_email,
			phone: {
				area_code: order.customer_phone.slice(0, 2),
				number: order.customer_phone.slice(2),
			},
			address: {
				zip_code: order.address.zip,
				street_name: order.address.street,
				city: order.address.city,
				federal_unit: order.address.state,
				country: order.address.country,
			},
		},
		payment_methods: {
			excluded_payment_methods: [],
			excluded_payment_types: [],
			installments: 12,
		},
		back_urls: {
			success: "http://www.your-site.com/success",
			failure: "http://www.your-site.com/failure",
			pending: "http://www.your-site.com/pending",
		},
		auto_return: "approved",
		notification_url: "http://www.your-site.com/notifications",
		external_reference: order.id,
	};

	try {
		const response = await preference.create({ body });
		return response;
	} catch (error) {
		throw error;
	}
};
