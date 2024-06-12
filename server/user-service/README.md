# Requisitos Funcionais e Não Funcionais - Serviço de Autenticação e Gerenciamento de Usuários

## Requisitos Funcionais

1. **Registro de Usuário:**
   - Os usuários devem poder se registrar no sistema fornecendo um nome de usuário, endereço de e-mail e senha.
   - O sistema deve validar os dados fornecidos durante o registro, incluindo a verificação da disponibilidade do nome de usuário e a validade do endereço de e-mail.
   - Após o registro bem-sucedido, o sistema deve criar um perfil de usuário e armazenar as informações fornecidas.
   - Exemplo de caso de uso: Um novo usuário se registra no sistema fornecendo suas informações pessoais.

2. **Login de Usuário:**
   - Os usuários registrados devem poder fazer login no sistema fornecendo seu nome de usuário/e-mail e senha.
   - O sistema deve autenticar as credenciais fornecidas pelo usuário e conceder acesso ao sistema se forem válidas.
   - Deve ser implementado um mecanismo de segurança para proteger contra ataques de força bruta e outras tentativas de login não autorizadas.
   - Exemplo de caso de uso: Um usuário registrado faz login no sistema para acessar sua conta.

3. **Recuperação de Senha:**
   - Os usuários devem poder recuperar suas senhas caso as esqueçam.
   - O sistema deve oferecer opções de recuperação de senha, como redefinição por e-mail ou SMS.
   - Após a verificação bem-sucedida, o sistema deve permitir que o usuário defina uma nova senha.
   - Exemplo de caso de uso: Um usuário solicita a redefinição de sua senha por e-mail e segue as instruções para criar uma nova senha.

4. **Gestão de Perfis de Usuário:**
   - Os usuários devem poder visualizar e editar seu próprio perfil, incluindo informações como nome, endereço, número de telefone, entre outros.
   - O sistema deve permitir que os usuários atualizem suas informações de perfil de forma segura.
   - Exemplo de caso de uso: Um usuário atualiza seu endereço de entrega em seu perfil após uma mudança de residência.

5. **Gestão de Permissões:**
   - Deve ser implementado um sistema de controle de acesso baseado em papéis para gerenciar as permissões dos usuários.
   - O sistema deve definir diferentes níveis de acesso com base nos papéis dos usuários (por exemplo, administrador, cliente, funcionário) e nas suas necessidades de acesso às funcionalidades do sistema.
   - Exemplo de caso de uso: Um administrador concede permissões de acesso elevadas a um novo funcionário.

6. **Histórico de Pedidos e Informações de Pagamento:**
   - O sistema deve manter um registro dos pedidos feitos pelos usuários, incluindo detalhes como itens pedidos, datas de compra, status do pedido, entre outros.
   - Deve ser possível visualizar o histórico de pedidos e as informações de pagamento associadas a cada usuário.
   - Exemplo de caso de uso: Um usuário visualiza o histórico de pedidos em sua conta para acompanhar suas compras anteriores.

7. **Autenticação de Dois Fatores (2FA):**
   - Deve ser oferecida a opção de habilitar a autenticação de dois fatores para aumentar a segurança das contas dos usuários.
   - Os usuários devem poder configurar e gerenciar métodos de autenticação de dois fatores, como SMS, e-mail ou aplicativos de autenticação.
   - Exemplo de caso de uso: Um usuário habilita a autenticação de dois fatores em sua conta para proteger suas informações.

8. **Gerenciamento de Sessões:**
   - O sistema deve gerenciar as sessões de usuário de forma segura, garantindo que os usuários permaneçam autenticados enquanto estiverem ativos e que sejam desconectados automaticamente após um período de inatividade.
   - Exemplo de caso de uso: Um usuário permanece conectado ao sistema enquanto navega pelo site e é automaticamente desconectado após ficar inativo por um determinado período de tempo.

## Requisitos Não Funcionais

1. **Segurança:**
   - O sistema deve garantir a segurança das informações dos usuários, incluindo senhas e informações de pagamento, utilizando técnicas adequadas de hashing, criptografia e proteção contra ataques.
   - Todas as comunicações entre o cliente e o servidor devem ser protegidas por HTTPS para garantir a confidencialidade e integridade dos dados em trânsito.

2. **Escalabilidade:**
   - O sistema deve ser projetado para ser escalável e capaz de lidar com um grande número de usuários e transações simultâneas.
   - Deve ser possível adicionar novos servidores e recursos conforme necessário para lidar com aumentos na demanda.

3. **Disponibilidade:**
   - O sistema deve ser altamente disponível e resiliente a falhas, garantindo que os usuários possam acessá-lo 24/7 sem interrupções significativas.
   - Deve ser implementado um sistema de monitoramento para detectar e responder a falhas de forma proativa.

4. **Desempenho:**
   - O sistema deve ser otimizado para um desempenho rápido e responsivo, garantindo tempos de resposta baixos para as solicitações dos usuários.
   - Deve ser implementado cache de dados para reduzir a carga nos servidores e melhorar a escalabilidade e o desempenho geral do sistema.

5. **Conformidade:**
   - O sistema deve estar em conformidade com regulamentações de proteção de dados, como GDPR, e padrões de segurança da indústria.
   - Deve ser implementado um processo para garantir a conformidade com as políticas de privacidade e segurança do usuário.

6. **Facilidade de Manutenção:**
   - O código do sistema deve ser bem estruturado, modular e de fácil manutenção.
   - Deve ser implementado um processo de deploy contínuo para facilitar a entrega de atualizações e correções de bugs de forma rápida e eficiente.

## Tecnologias Utilizadas

- **Linguagem de Programação:** JavaScript/TypeScript
- **Framework Backend:** Bun elysia
- **Serviço de Autenticação:** Supabase Auth
- **Banco de Dados:** PostgreSQL
- **Protocolo de Segurança:** HTTPS
- **Ferramentas de Monitoramento:** Prometheus, Grafana
- **Cache de Dados:** Redis
- **Ferramenta de Testes:** Jest

# Requisitos Funcionais e Não Funcionais - Serviço de Carrinho de Compras

## Requisitos Funcionais

1. **Adição de Itens ao Carrinho:**
   - Os usuários devem poder adicionar itens ao carrinho de compras, especificando a quantidade desejada de cada item.
   - Deve ser possível adicionar itens individualmente ou em lotes, dependendo das preferências do usuário.
   - Exemplo de caso de uso: Um usuário adiciona um novo item ao carrinho de compras enquanto navega pelo catálogo de produtos.

2. **Remoção de Itens do Carrinho:**
   - Os usuários devem poder remover itens do carrinho de compras, seja individualmente ou removendo todos os itens de uma vez.
   - Deve ser possível editar a quantidade de itens no carrinho antes de finalizar a compra.
   - Exemplo de caso de uso: Um usuário remove um item específico do carrinho de compras antes de fazer o checkout.

4. **Gestão de Promoções e Cupons:**
   - O sistema deve ser capaz de aplicar promoções ou cupons de desconto aos itens do carrinho, se aplicável.
   - Os usuários devem poder inserir códigos de cupom durante o checkout para receber descontos em suas compras.
   - Exemplo de caso de uso: Um usuário aplica um cupom de desconto válido ao carrinho antes de finalizar a compra.

## Requisitos Não Funcionais

1. **Segurança:**
   - O sistema deve garantir a segurança das informações do carrinho de compras e dos usuários durante toda a interação.
   - A autenticação e autorização adequadas devem ser implementadas para proteger contra acesso não autorizado aos dados do carrinho.

2. **Desempenho:**
   - O sistema deve ser otimizado para um desempenho rápido e responsivo ao adicionar, remover e calcular itens no carrinho de compras.
   - Deve ser implementado cache de dados para reduzir o tempo de resposta do sistema e melhorar a experiência do usuário.

3. **Escalabilidade:**
   - O sistema deve ser projetado para ser escalável e capaz de lidar com um grande volume de interações de usuários simultâneas.
   - Deve ser possível adicionar novos recursos conforme necessário para lidar com aumentos na demanda por itens no carrinho.

4. **Disponibilidade:**
   - O sistema deve ser altamente disponível e resiliente a falhas, garantindo que os usuários possam interagir com seus carrinhos de compras a qualquer momento.
   - Deve ser implementado um sistema de monitoramento para detectar e responder a falhas de forma proativa.

5. **Conformidade:**
   - O sistema deve estar em conformidade com regulamentações de proteção de dados, como GDPR, e padrões de segurança da indústria para proteger as informações do carrinho e dos usuários.
   - Deve ser implementado um processo para garantir a conformidade com as políticas de privacidade e segurança do usuário.

## Tecnologias Utilizadas

- **Framework Backend:** Nest.js
- **Banco de Dados:** Firebase Firestore
- **Armazenamento de Imagens:** Firebase Storage
- **Protocolo de Segurança:** HTTPS
- **Ferramentas de Monitoramento:** Firebase Performance Monitoring
- **Cache de Dados:** Firebase Realtime Database
- **Ferramenta de Testes:** Jest


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
