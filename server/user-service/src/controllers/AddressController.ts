import { AddressRepository } from "../repositories/AddressRepository";

class AddressController {
    static async getAddresses({ set }: any) {
        try {
            const addresses = await AddressRepository.getAll();
            set.status = 200;
            return addresses;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async getAddress({ params, set }: any) {
        try {
            const address = await AddressRepository.getById(params.id);
            set.status = 200;
            return address;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async createAddress({ body, set }: any) {
        try {
            const address = await AddressRepository.create(body);
            set.status = 201;
            return address;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async updateAddress({ params, body, set }: any) {
        try {
            const address = await AddressRepository.update(params.id, body);
            set.status = 200;
            return address;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async deleteAddress({ params, set }: any) {
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
