Resumo das responsabilidades e tecnologias:

### 1. **User Service 🧑** 
**Tecnologias:** Bun - Elysia - Supabase
   - **Responsabilidades:**
     - **User Registration:** Registro de novos usuários.
     - **User Authentication:** Autenticação de usuários existentes.
     - **User Profile Management:** Gerenciamento de perfis de usuários.
     - **Wishlist:** Gerenciamento de listas de desejos dos usuários.
     - **Shopping Cart:** Gerenciamento do carrinho de compras.
     - **OAuth Integration:** Integração com provedores de autenticação OAuth.
     - **Multi-factor Authentication:** Autenticação multifator para segurança adicional.
   - **Interações:** 
     - Interage com **Order Service** para autenticação de usuários durante o checkout.
     - Interage com **Notification Service** para enviar notificações de login, registro, etc.

### 2. **Product Service 📦** 
**Tecnologias:** Deno - Oak - Supabase
   - **Responsabilidades:**
     - **Product Catalog:** Gerenciamento do catálogo de produtos.
     - **Product Search:** Funcionalidade de busca de produtos.
     - **Product Reviews:** Gerenciamento de avaliações de produtos.
   - **Interações:**
     - Interage com **Order Service** para fornecer informações de produtos durante o processo de compra.
     - Interage com **Analytics Service** para fornecer dados de visualização de produtos e avaliações.

### 3. **Order Service 🛒** 
**Tecnologias:** Node - Express - Supabase
   - **Responsabilidades:**
     - **Order Creation:** Criação de novos pedidos.
     - **Order Tracking:** Rastreamento do status dos pedidos.
     - **Order History:** Histórico de pedidos dos usuários.
     - **Coupons Management:** Gerenciamento de cupons e promoções.
     - **Payment Processing:** Processamento de pagamentos.
     - **Payment Gateway Integration:** Integração com provedores de pagamento.
     - **Refund Management:** Gerenciamento de reembolsos.
   - **Interações:**
     - Interage com **User Service** para autenticação e informações do usuário.
     - Interage com **Product Service** para verificar disponibilidade de produtos.
     - Interage com **Notification Service** para enviar confirmações de pedidos e atualizações de status.
     - Interage com **Analytics Service** para fornecer dados de pedidos e transações.

### 4. **Analytics Service 📊** 
**Tecnologias:** Flask - MongoDB Atlas
   - **Responsabilidades:**
     - **User Behavior Analysis:** Análise do comportamento dos usuários.
     - **Sales Analysis:** Análise de vendas.
     - **Performance Metrics:** Métricas de desempenho.
   - **Interações:**
     - Coleta dados de **User Service**, **Product Service**, e **Order Service** para análises.
     - Fornece dados analíticos para todos os serviços e para o dashboard de administração.
