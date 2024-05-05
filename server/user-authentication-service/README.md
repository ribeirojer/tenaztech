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
