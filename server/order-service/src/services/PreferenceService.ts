import { preferences } from "../config/mercadopago";

interface Item {
	title: string;
	quantity: number;
	currency_id: string;
	unit_price: number;
}

export class PreferenceService {
	static async createPreference(items: Item[]): Promise<any> {
		const mappedItems = items.map((item) => ({
			id: "0",
			title: item.title,
			quantity: item.quantity,
			currency_id: item.currency_id,
			unit_price: item.unit_price,
		}));

		const preferenceRequestBody = {
			body: {
				items: mappedItems,
			},
		};

		try {
			const preference = await preferences.create(preferenceRequestBody);
			return preference;
		} catch (error) {
			console.error("Erro ao criar preferência:", error);
			throw error;
		}
	}
}
