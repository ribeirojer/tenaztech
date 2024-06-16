import type { Context } from "../interfaces/ElysiaContext";
import { AddressRepository } from "../repositories/AddressRepository";

class AddressController {
	static async getAddresses({ set }: Context) {
		try {
			const addresses = await AddressRepository.getAll();
			set.status = 200;
			return addresses;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async getAddress({ params, set }: Context) {
		try {
			const address = await AddressRepository.getById(params.id);
			set.status = 200;
			return address;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async createAddress({ body, set }: Context) {
		try {
			const address = await AddressRepository.create(body);
			set.status = 201;
			return address;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async updateAddress({ params, body, set }: Context) {
		try {
			const address = await AddressRepository.update(params.id, body);
			set.status = 200;
			return address;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}

	static async deleteAddress({ params, set }: Context) {
		try {
			await AddressRepository.delete(params.id);
			set.status = 204;
			return { message: "Address deleted successfully" };
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}
}

export { AddressController };
