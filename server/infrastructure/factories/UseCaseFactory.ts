import { MercadoPagoService } from "../services/MercadoPagoService.ts";
import { SupabaseAuthRepository } from "../repositories/SupabaseAuthRepository.ts";
/*import { SupabaseOrderRepository } from "../repositories/SupabaseOrderRepository.ts";
import { SupabaseProductRepository } from "../repositories/SupabaseProductRepository.ts";
import { SupabaseCustomerRepository } from "../repositories/SupabaseCustomerRepository.ts";
import { SupabasePaymentRepository } from "../repositories/SupabasePaymentRepository.ts";
import { SupabaseSupportTicketRepository } from "../repositories/SupabaseSupportTicketRepository.ts";
import { SupabaseWishlistRepository } from "../repositories/SupabaseWishlistRepository.ts";
import { SupabaseReviewRepository } from "../repositories/SupabaseReviewRepository.ts";
import { SupabaseRecommendationRepository } from "../repositories/SupabaseRecommendationRepository.ts";
import { SupabaseDeliveryRepository } from "../repositories/SupabaseDeliveryRepository.ts";

import { CreateOrderUseCase } from "../../application/use-cases/order/CreateOrderUseCase.ts";
import { UpdateOrderUseCase } from "../../application/use-cases/order/UpdateOrderUseCase.ts";
import { CancelOrderUseCase } from "../../application/use-cases/order/CancelOrderUseCase.ts";
import { ListOrdersUseCase } from "../../application/use-cases/order/ListOrdersUseCase.ts";
import { GetOrderDetailUseCase } from "../../application/use-cases/order/GetOrderDetailUseCase.ts";
import { TrackOrderUseCase } from "../../application/use-cases/order/TrackOrderUseCase.ts";

import { AddProductUseCase } from "../../application/use-cases/product/AddProductUseCase.ts";
import { UpdateProductUseCase } from "../../application/use-cases/product/UpdateProductUseCase.ts";
import { RemoveProductUseCase } from "../../application/use-cases/product/RemoveProductUseCase.ts";
import { ListProductsUseCase } from "../../application/use-cases/product/ListProductsUseCase.ts";
import { GetProductDetailUseCase } from "../../application/use-cases/product/GetProductDetailUseCase.ts";

import { RegisterCustomerUseCase } from "../../application/use-cases/customer/RegisterCustomerUseCase.ts";
import { UpdateCustomerUseCase } from "../../application/use-cases/customer/UpdateCustomerUseCase.ts";
import { RemoveCustomerUseCase } from "../../application/use-cases/customer/RemoveCustomerUseCase.ts";
import { ListCustomersUseCase } from "../../application/use-cases/customer/ListCustomersUseCase.ts";
import { GetCustomerDetailUseCase } from "../../application/use-cases/customer/GetCustomerDetailUseCase.ts";

import { ProcessPaymentUseCase } from "../../application/use-cases/payment/ProcessPaymentUseCase.ts";
import { RefundPaymentUseCase } from "../../application/use-cases/payment/RefundPaymentUseCase.ts";
import { GetPaymentDetailUseCase } from "../../application/use-cases/payment/GetPaymentDetailUseCase.ts";

import { CreateSupportTicketUseCase } from "../../application/use-cases/support/CreateSupportTicketUseCase.ts";
import { UpdateSupportTicketUseCase } from "../../application/use-cases/support/UpdateSupportTicketUseCase.ts";
import { CloseSupportTicketUseCase } from "../../application/use-cases/support/CloseSupportTicketUseCase.ts";
import { ListSupportTicketsUseCase } from "../../application/use-cases/support/ListSupportTicketsUseCase.ts";

// Wishlist Use Cases
import { CreateWishlistUseCase } from "../../application/use-cases/wishlist/CreateWishlistUseCase.ts";
import { AddToWishlistUseCase } from "../../application/use-cases/wishlist/AddToWishlistUseCase.ts";
import { RemoveFromWishlistUseCase } from "../../application/use-cases/wishlist/RemoveFromWishlistUseCase.ts";
import { ShareWishlistUseCase } from "../../application/use-cases/wishlist/ShareWishlistUseCase.ts";
import { ListWishlistsUseCase } from "../../application/use-cases/wishlist/ListWishlistsUseCase.ts";

// Review Use Cases
import { AddProductReviewUseCase } from "../../application/use-cases/review/AddProductReviewUseCase.ts";
import { UpdateProductReviewUseCase } from "../../application/use-cases/review/UpdateProductReviewUseCase.ts";
import { RemoveProductReviewUseCase } from "../../application/use-cases/review/RemoveProductReviewUseCase.ts";
import { ListProductReviewsUseCase } from "../../application/use-cases/review/ListProductReviewsUseCase.ts";

// Recommendation Use Cases
import { RecommendProductsUseCase } from "../../application/use-cases/recommendation/RecommendProductsUseCase.ts";
import { ListRelatedProductsUseCase } from "../../application/use-cases/recommendation/ListRelatedProductsUseCase.ts";

// Delivery Use Cases
import { ScheduleDeliveryUseCase } from "../../application/use-cases/delivery/ScheduleDeliveryUseCase.ts";
import { UpdateDeliveryDateUseCase } from "../../application/use-cases/delivery/UpdateDeliveryDateUseCase.ts";
import { NotifyDeliveryDelayUseCase } from "../../application/use-cases/delivery/NotifyDeliveryDelayUseCase.ts";
*/

// Auth Use Cases
import { LoginUseCase } from "../../application/use-cases/auth/LoginUseCase.ts";
import { LogoutUseCase } from "../../application/use-cases/auth/LogoutUseCase.ts";
import { RegisterAccountUseCase } from "../../application/use-cases/auth/RegisterAccountUseCase.ts";
import { RecoverPasswordUseCase } from "../../application/use-cases/auth/RecoverPasswordUseCase.ts";

export class UseCaseFactory {
    private static createMercadoPagoService(): MercadoPagoService {
        const accessToken = "YOUR_MERCADO_PAGO_ACCESS_TOKEN";
        return new MercadoPagoService(accessToken);
    }
/** 
    // Order Use Cases
    static createOrderUseCases() {
        const orderRepository = new SupabaseOrderRepository();
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
        const productRepository = new SupabaseProductRepository();
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
        const customerRepository = new SupabaseCustomerRepository();
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
        const paymentRepository = new SupabasePaymentRepository();
        const orderRepository = new SupabaseOrderRepository();
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
        const supportTicketRepository = new SupabaseSupportTicketRepository();
        return {
            create: new CreateSupportTicketUseCase(supportTicketRepository),
            update: new UpdateSupportTicketUseCase(supportTicketRepository),
            close: new CloseSupportTicketUseCase(supportTicketRepository),
            list: new ListSupportTicketsUseCase(supportTicketRepository),
        };
    }
    // Wishlist Use Cases
    static createWishlistUseCases() {
        const wishlistRepository = new SupabaseWishlistRepository();
        return {
            create: new CreateWishlistUseCase(wishlistRepository),
            add: new AddToWishlistUseCase(wishlistRepository),
            remove: new RemoveFromWishlistUseCase(wishlistRepository),
            share: new ShareWishlistUseCase(wishlistRepository),
            list: new ListWishlistsUseCase(wishlistRepository),
        };
    }

    // Review Use Cases
    static createReviewUseCases() {
        const reviewRepository = new SupabaseReviewRepository();
        return {
            add: new AddProductReviewUseCase(reviewRepository),
            update: new UpdateProductReviewUseCase(reviewRepository),
            remove: new RemoveProductReviewUseCase(reviewRepository),
            list: new ListProductReviewsUseCase(reviewRepository),
        };
    }

    // Recommendation Use Cases
    static createRecommendationUseCases() {
        const recommendationRepository = new SupabaseRecommendationRepository();
        return {
            recommend: new RecommendProductsUseCase(recommendationRepository),
            listRelated: new ListRelatedProductsUseCase(recommendationRepository),
        };
    }

    // Delivery Use Cases
    static createDeliveryUseCases() {
        const deliveryRepository = new SupabaseDeliveryRepository();
        return {
            schedule: new ScheduleDeliveryUseCase(deliveryRepository),
            updateDate: new UpdateDeliveryDateUseCase(deliveryRepository),
            notifyDelay: new NotifyDeliveryDelayUseCase(deliveryRepository),
        };
    }
*/
    // Auth Use Cases
    static createAuthUseCases() {
        const authRepository = new SupabaseAuthRepository();
        return {
            login: new LoginUseCase(authRepository),
            logout: new LogoutUseCase(authRepository),
            register: new RegisterAccountUseCase(authRepository),
            recoverPassword: new RecoverPasswordUseCase(authRepository),
            //updatePassword: new UpdatePasswordUseCase(authRepository),
            //delete: new DeleteUserUseCase(authRepository),
        };
    }
}