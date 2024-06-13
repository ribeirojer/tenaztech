import { OrderRepository } from "../repositories/OrderRepository";

class OrderController {
    static async getOrders({ set }: any) {
        try {
            const orders = await OrderRepository.getAll();
            set.status = 200;
            return orders;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async getOrder({ params, set }: any) {
        try {
            const order = await OrderRepository.getById(params.id);
            set.status = 200;
            return order;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }
}

export { OrderController };