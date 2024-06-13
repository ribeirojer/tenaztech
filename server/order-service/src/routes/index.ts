import express from 'express';
import CouponController from '../controllers/CouponController';
import NotificationController from '../controllers/NotificationController';
import OrderController from '../controllers/OrderController';
import PaymentController from '../controllers/PaymentController';
import ReviewController from '../controllers/ReviewController';
import ReportController from '../controllers/ReportController';
import UserCouponController from '../controllers/UserCouponController';

const router = express.Router();

// Rotas de pedidos
    router
        .post("/api/orders/", OrderController.createOrder)  // Processar novos pedidos
        .get("/api/orders/", OrderController.getOrders)  // Obter todos os pedidos
        .get("/api/orders/:id", OrderController.getOrder)  // Obter um pedido específico
        .put("/api/orders/:id/status", OrderController.updateOrderStatus)  // Atualizar status de entrega de um pedido
        .get("/api/orders/:id/track", OrderController.trackOrder)  // Rastrear envio de um pedido
        .delete("/api/orders/:id/cancel", OrderController.cancelOrder)  // Cancelar um pedido
        .post("/api/orders/:id/refund", OrderController.processRefund)  // Processar reembolso
        .get("/api/orders/:id/products", OrderController.getOrderProducts)  // Obter produtos de um pedido
        .post("/api/orders/:id/apply-coupon", OrderController.applyCoupon)  // Aplicar cupom a um pedido
        .delete("/api/orders/:id/remove-coupon", OrderController.removeCoupon)  // Remover cupom de um pedido

// Integração com serviços de logística
router.post("/api/orders/:id/logistics", OrderController.integrateLogistics);  // Integração com serviços de logística

// Integração com provedores de pagamento
    router
        .post("/api/payments/", PaymentController.processPayment)  // Processamento de pagamentos online
        .post("/api/payments/providers", PaymentController.configurePaymentProvider)  // Configuração de provedores de pagamento
        .get("/api/payments/providers", PaymentController.getPaymentProviders)  // Obter lista de provedores de pagamento
        .get("/api/payments/history", PaymentController.getPaymentHistory)  // Histórico de transações
        .get("/api/payments/:transactionId", PaymentController.getTransactionDetails);  // Detalhes de transação

// Rotas de cupons
router
    .post("/api/coupons/", CouponController.createCoupon)  // Gerar cupons
    .get("/api/coupons/", CouponController.getCoupons)  // Obter todos os cupons
    .get("/api/coupons/:id", CouponController.getCoupon)  // Obter um cupom específico
    .put("/api/coupons/:id", CouponController.updateCoupon)  // Atualizar um cupom
    .delete("/api/coupons/:id", CouponController.deleteCoupon)  // Deletar um cupom
    .post("/api/coupons/validate", CouponController.validateCoupon)  // Validar um cupom

// Rotas de cupons de usuário
router
    .post("/api/user-coupons/", UserCouponController.assignCouponToUser)  // Atribuir um cupom a um usuário
    .get("/api/user-coupons/", UserCouponController.getUserCoupons)  // Obter todos os cupons de usuários
    .get("/api/user-coupons/:id", UserCouponController.getUserCoupon)  // Obter um cupom de usuário específico
    .put("/api/user-coupons/:id", UserCouponController.updateUserCoupon)  // Atualizar um cupom de usuário
    .delete("/api/user-coupons/:id", UserCouponController.removeUserCoupon)  // Remover um cupom de usuário

// Rotas de notificações
router.get("/api/notifications/orders", NotificationController.getOrderNotifications);  // Notificações de pedidos

// Rotas de relatórios
    router
        .get("/api/reports/orders", ReportController.getOrderReports)  // Relatórios de pedidos
        .get("/api/reports/payments", ReportController.getPaymentReports);  // Relatórios de pagamentos

// Rotas de avaliações de pedidos
    router
        .post("/api/orders/:id/reviews/", ReviewController.createOrderReview)  // Avaliar um pedido
        .get("/api/orders/:id/reviews/", ReviewController.getOrderReviews);  // Obter avaliações de um pedido

export default router;

/*
### Explicação das Rotas:

1. **Pedidos (Orders):**
    - `POST /api/orders`: Cria um novo pedido. Esta rota deve processar as informações do pedido, validar os dados e criar o pedido no sistema.
    - `GET /api/orders`: Retorna todos os pedidos.
    - `GET /api/orders/:id`: Retorna um pedido específico pelo ID.
    - `PUT /api/orders/:id/status`: Atualiza o status de entrega de um pedido. Os possíveis status incluem "Em processamento", "Enviado", "Em trânsito" e "Entregue".
    - `GET /api/orders/:id/track`: Fornece informações de rastreamento para um pedido específico.

2. **Integração com Serviços de Logística:**
    - `POST /api/orders/:id/logistics`: Integra-se com serviços de logística para o pedido especificado. Esta rota pode enviar informações de entrega aos serviços de transporte para agendar retiradas e coordenar a entrega.

3. **Pagamentos (Payments):**
    - `POST /api/payments`: Processa um pagamento online. Esta rota deve lidar com a integração com provedores de pagamento e processar a transação financeira.
    - `POST /api/payments/providers`: Configura um novo provedor de pagamento.
    - `GET /api/payments/providers`: Retorna a lista de provedores de pagamento configurados.

4. **Cupons (Coupons):**
    - `POST /api/coupons`: Cria um novo cupom. Pode incluir cupons únicos por usuário, cupons de diferentes tipos de desconto, etc.
    - `GET /api/coupons`: Retorna todos os cupons.
    - `GET /api/coupons/:id`: Retorna um cupom específico pelo ID.
    - `PUT /api/coupons/:id`: Atualiza um cupom existente.
    - `DELETE /api/coupons/:id`: Deleta um cupom.
    - `POST /api/coupons/validate`: Valida um cupom com base em regras de uso, validade, restrições, etc.
    Cancelamento de Pedidos:
        DELETE /api/orders/:id/cancel - OrderController.cancelOrder
            Permite que um cliente cancele um pedido antes de ele ser processado ou enviado.

    Reembolso de Pedidos:
        POST /api/orders/:id/refund - OrderController.processRefund
            Processa um reembolso para um pedido, caso ele tenha sido cancelado ou retornado.

Rotas Adicionais de Pagamentos (Payments)

    Histórico de Transações:
        GET /api/payments/history - PaymentController.getPaymentHistory
            Retorna o histórico de transações de pagamento para um usuário específico ou para o administrador.

    Detalhes de Transação:
        GET /api/payments/:transactionId - PaymentController.getTransactionDetails
            Retorna os detalhes de uma transação específica.

Rotas Adicionais de Cupons (Coupons)

    Aplicação de Cupons a um Pedido:
        POST /api/orders/:id/apply-coupon - OrderController.applyCoupon
            Aplica um cupom a um pedido específico.

    Remoção de Cupons de um Pedido:
        DELETE /api/orders/:id/remove-coupon - OrderController.removeCoupon
            Remove um cupom de um pedido específico.

Rotas Adicionais de Notificações

    Notificações de Pedidos:
        GET /api/notifications/orders - NotificationController.getOrderNotifications
            Retorna notificações relacionadas a pedidos, como status de entrega e atualizações de pagamento.

Rotas Adicionais de Relatórios

    Relatórios de Pedidos:
        GET /api/reports/orders - ReportController.getOrderReports
            Gera relatórios de pedidos, incluindo vendas, status de entrega, etc.

    Relatórios de Pagamentos:
        GET /api/reports/payments - ReportController.getPaymentReports
            Gera relatórios de pagamentos, incluindo transações concluídas, falhas de pagamento, etc.

Rotas Adicionais de Produtos Relacionados a Pedidos

    Obter Produtos de um Pedido:
        GET /api/orders/:id/products - OrderController.getOrderProducts
            Retorna a lista de produtos associados a um pedido específico.

Rotas de Feedback e Avaliações

    Avaliações de Pedidos:
        POST /api/orders/:id/review - ReviewController.createOrderReview
            Permite que um cliente avalie e deixe um feedback sobre um pedido específico.

    Obter Avaliações de Pedidos:
        GET /api/orders/:id/reviews - ReviewController.getOrderReviews
            Retorna as avaliações e feedbacks associados a um pedido específico.
Essas rotas cobrem a maioria dos casos de uso especificados nos requisitos funcionais e não funcionais para o serviço de gestão de pedidos. Certifique-se de ajustar os controladores e métodos específicos conforme necessário para a sua aplicação.
*/