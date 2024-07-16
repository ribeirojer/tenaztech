import { OrderRepositoryImpl } from "../repositories/OrderRepositoryImpl.ts";
import { ProductRepositoryImpl } from "../repositories/ProductRepositoryImpl.ts";
import { CustomerRepositoryImpl } from "../repositories/CustomerRepositoryImpl.ts";
import { PaymentRepositoryImpl } from "../repositories/PaymentRepositoryImpl.ts";
import { SupportTicketRepositoryImpl } from "../repositories/SupportTicketRepositoryImpl.ts";
import { MercadoPagoService } from "../services/MercadoPagoService.ts";

import { CreateOrderUseCase } from "../../use-cases/order/CreateOrderUseCase.ts";
import { UpdateOrderUseCase } from "../../use-cases/order/UpdateOrderUseCase.ts";
import { CancelOrderUseCase } from "../../use-cases/order/CancelOrderUseCase.ts";
import { ListOrdersUseCase } from "../../use-cases/order/ListOrdersUseCase.ts";
import { GetOrderDetailUseCase } from "../../use-cases/order/GetOrderDetailUseCase.ts";
import { TrackOrderUseCase } from "../../use-cases/order/TrackOrderUseCase.ts";

import { AddProductUseCase } from "../../use-cases/product/AddProductUseCase.ts";
import { UpdateProductUseCase } from "../../use-cases/product/UpdateProductUseCase.ts";
import { RemoveProductUseCase } from "../../use-cases/product/RemoveProductUseCase.ts";
import { ListProductsUseCase } from "../../use-cases/product/ListProductsUseCase.ts";
import { GetProductDetailUseCase } from "../../use-cases/product/GetProductDetailUseCase.ts";

import { RegisterCustomerUseCase } from "../../use-cases/customer/RegisterCustomerUseCase.ts";
import { UpdateCustomerUseCase } from "../../use-cases/customer/UpdateCustomerUseCase.ts";
import { RemoveCustomerUseCase } from "../../use-cases/customer/RemoveCustomerUseCase.ts";
import { ListCustomersUseCase } from "../../use-cases/customer/ListCustomersUseCase.ts";
import { GetCustomerDetailUseCase } from "../../use-cases/customer/GetCustomerDetailUseCase.ts";

import { ProcessPaymentUseCase } from "../../use-cases/payment/ProcessPaymentUseCase.ts";
import { RefundPaymentUseCase } from "../../use-cases/payment/RefundPaymentUseCase.ts";
import { GetPaymentDetailUseCase } from "../../use-cases/payment/GetPaymentDetailUseCase.ts";

import { CreateSupportTicketUseCase } from "../../use-cases/support/CreateSupportTicketUseCase.ts";
import { UpdateSupportTicketUseCase } from "../../use-cases/support/UpdateSupportTicketUseCase.ts";
import { CloseSupportTicketUseCase } from "../../use-cases/support/CloseSupportTicketUseCase.ts";
import { ListSupportTicketsUseCase } from "../../use-cases/support/ListSupportTicketsUseCase.ts";

export class UseCaseFactory {
	private static createMercadoPagoService(): MercadoPagoService {
		const accessToken = "YOUR_MERCADO_PAGO_ACCESS_TOKEN";
		return new MercadoPagoService(accessToken);
	}

	// Order Use Cases
	static createOrderUseCases() {
		const orderRepository = new OrderRepositoryImpl();
		return {
			create: new CreateOrderUseCase(orderRepository),
			update: new UpdateOrderUseCase(orderRepository),
			cancel: new CancelOrderUseCase(orderRepository),
			list: new ListOrdersUseCase(orderRepository),
			detail: new GetOrderDetailUseCase(orderRepository),
			track: new TrackOrderUseCase(orderRepository),
		};
	}

	// Product Use Cases
	static createProductUseCases() {
		const productRepository = new ProductRepositoryImpl();
		return {
			add: new AddProductUseCase(productRepository),
			update: new UpdateProductUseCase(productRepository),
			remove: new RemoveProductUseCase(productRepository),
			list: new ListProductsUseCase(productRepository),
			detail: new GetProductDetailUseCase(productRepository),
		};
	}

	// Customer Use Cases
	static createCustomerUseCases() {
		const customerRepository = new CustomerRepositoryImpl();
		return {
			register: new RegisterCustomerUseCase(customerRepository),
			update: new UpdateCustomerUseCase(customerRepository),
			remove: new RemoveCustomerUseCase(customerRepository),
			list: new ListCustomersUseCase(customerRepository),
			detail: new GetCustomerDetailUseCase(customerRepository),
		};
	}

	// Payment Use Cases
	static createPaymentUseCases() {
		const paymentRepository = new PaymentRepositoryImpl();
		const orderRepository = new OrderRepositoryImpl();
		const mercadoPagoService = this.createMercadoPagoService();
		return {
			process: new ProcessPaymentUseCase(
				paymentRepository,
				orderRepository,
				mercadoPagoService,
			),
			refund: new RefundPaymentUseCase(paymentRepository, mercadoPagoService),
			detail: new GetPaymentDetailUseCase(
				paymentRepository,
				mercadoPagoService,
			),
		};
	}

	// Support Ticket Use Cases
	static createSupportTicketUseCases() {
		const supportTicketRepository = new SupportTicketRepositoryImpl();
		return {
			create: new CreateSupportTicketUseCase(supportTicketRepository),
			update: new UpdateSupportTicketUseCase(supportTicketRepository),
			close: new CloseSupportTicketUseCase(supportTicketRepository),
			list: new ListSupportTicketsUseCase(supportTicketRepository),
		};
	}
}
