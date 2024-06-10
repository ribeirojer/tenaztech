# Requisitos Funcionais e Não Funcionais - Serviço de Gestão de Pedidos

## Requisitos Funcionais

1. **Processamento de Novos Pedidos:**
   - O sistema deve ser capaz de receber e processar novos pedidos feitos pelos clientes, incluindo informações como produtos, quantidade, endereço de entrega e método de pagamento.
   - Deve ser possível validar os pedidos para garantir que todas as informações necessárias estejam presentes e corretas antes do processamento.
   - Exemplo de caso de uso: Um cliente realiza um pedido de produtos no site e o sistema o processa com sucesso.

2. **Atualização de Status de Entrega:**
   - O sistema deve permitir a atualização do status de entrega de cada pedido, informando aos clientes sobre o progresso de suas entregas.
   - Os status de entrega devem incluir etapas como "Em processamento", "Enviado", "Em trânsito" e "Entregue".
   - Exemplo de caso de uso: Um administrador atualiza o status de entrega de um pedido para "Enviado" após despachá-lo para o transporte.

3. **Rastreamento de Envio:**
   - Deve ser possível rastrear o envio de cada pedido em tempo real, fornecendo informações detalhadas sobre a localização e o status atual da entrega.
   - Os clientes devem poder acessar facilmente as informações de rastreamento através do site ou aplicativo.
   - Exemplo de caso de uso: Um cliente visualiza o progresso de entrega de seu pedido através de um link de rastreamento fornecido pelo sistema.

4. **Integração com Serviços de Logística:**
   - O sistema deve integrar-se a serviços de logística para facilitar o transporte e entrega dos pedidos aos clientes.
   - Deve ser possível enviar informações de entrega diretamente aos serviços de transporte para agendar retiradas e coordenar a entrega.
   - Exemplo de caso de uso: O sistema envia automaticamente os detalhes de entrega de um pedido a um serviço de entrega terceirizado para processamento.

## Requisitos Não Funcionais

1. **Segurança:**
   - O sistema deve garantir a segurança das informações dos pedidos e dos clientes durante todo o ciclo de vida do pedido.
   - A autenticação e autorização adequadas devem ser implementadas para proteger contra acesso não autorizado aos dados do pedido.

2. **Desempenho:**
   - O sistema deve ser otimizado para um desempenho rápido e responsivo ao processar pedidos e atualizar o status de entrega.
   - Deve ser implementado cache de dados para reduzir o tempo de resposta do sistema e melhorar a experiência do usuário.

3. **Escalabilidade:**
   - O sistema deve ser projetado para ser escalável e capaz de lidar com um grande volume de pedidos e atualizações de status simultâneas.
   - Deve ser possível adicionar novos recursos conforme necessário para lidar com aumentos na demanda por pedidos.

4. **Disponibilidade:**
   - O sistema deve ser altamente disponível e resiliente a falhas, garantindo que os clientes possam acessar informações sobre seus pedidos a qualquer momento.
   - Deve ser implementado um sistema de monitoramento para detectar e responder a falhas de forma proativa.

5. **Conformidade:**
   - O sistema deve estar em conformidade com regulamentações de proteção de dados, como GDPR, e padrões de segurança da indústria para proteger as informações dos pedidos e dos clientes.
   - Deve ser implementado um processo para garantir a conformidade com as políticas de privacidade e segurança do usuário.

## Tecnologias Utilizadas

- **Framework Backend:** SlimPHP
- **Banco de Dados:** PlanetScale
- **Serviços de Logística:** Integração com serviços de transporte terceirizados
- **Protocolo de Segurança:** HTTPS
- **Ferramentas de Monitoramento:** Prometheus, Grafana
- **Cache de Dados:** Redis
- **Ferramenta de Testes:** PHPUnit

# Requisitos Funcionais e Não Funcionais - Serviço de Processamento de Pagamentos

## Requisitos Funcionais

1. **Integração com Provedores de Pagamento:**
   - O sistema deve integrar-se a provedores de pagamento para processar transações financeiras de forma segura e eficiente.
   - Deve ser possível configurar e gerenciar múltiplos provedores de pagamento para oferecer opções aos usuários.
   - Exemplo de caso de uso: Um usuário escolhe um método de pagamento durante o checkout e o sistema processa a transação através do provedor selecionado.

2. **Processamento de Pagamentos Online:**
   - Os usuários devem poder realizar pagamentos online de forma rápida e conveniente, utilizando métodos como cartão de crédito, débito, transferência bancária, entre outros.
   - O sistema deve fornecer uma interface de pagamento intuitiva e fácil de usar para os usuários completarem suas transações.
   - Exemplo de caso de uso: Um usuário realiza um pagamento online ao finalizar a compra de itens no carrinho.

3. **Segurança das Transações:**
   - O sistema deve garantir a segurança das transações financeiras dos usuários, protegendo as informações sensíveis durante todo o processo.
   - Deve ser implementada criptografia e outras medidas de segurança para proteger os dados dos cartões de crédito e outras informações pessoais dos usuários.
   - Exemplo de caso de uso: Um usuário fornece suas informações de pagamento durante o checkout e o sistema as processa de forma segura.

4. **Garantia de Conclusão das Transações:**
   - O sistema deve garantir que todas as transações sejam concluídas com sucesso e que os pagamentos sejam processados sem problemas.
   - Deve ser possível lidar com situações de falha, como pagamentos recusados, e fornecer feedback adequado aos usuários.
   - Exemplo de caso de uso: Um usuário recebe uma confirmação de que seu pagamento foi processado com sucesso após finalizar a transação.

## Requisitos Não Funcionais

1. **Segurança:**
   - O sistema deve garantir a segurança das informações dos usuários e das transações financeiras durante todo o processo de pagamento.
   - Deve ser implementado um processo de conformidade com padrões de segurança da indústria, como PCI DSS, para proteger os dados do cartão de crédito.

2. **Desempenho:**
   - O sistema deve ser otimizado para um desempenho rápido e responsivo ao processar transações financeiras e interagir com os provedores de pagamento.
   - Deve ser implementado cache de dados e outras técnicas de otimização para reduzir o tempo de resposta do sistema e melhorar a experiência do usuário.

3. **Escalabilidade:**
   - O sistema deve ser projetado para ser escalável e capaz de lidar com um grande volume de transações financeiras simultâneas.
   - Deve ser possível adicionar novos recursos conforme necessário para lidar com aumentos na demanda por processamento de pagamentos.

4. **Disponibilidade:**
   - O sistema deve ser altamente disponível e resiliente a falhas, garantindo que os usuários possam realizar pagamentos a qualquer momento.
   - Deve ser implementado um sistema de monitoramento para detectar e responder a falhas de forma proativa.

5. **Conformidade:**
   - O sistema deve estar em conformidade com regulamentações de proteção de dados, como GDPR, e padrões de segurança da indústria para proteger as informações dos usuários e das transações financeiras.
   - Deve ser implementado um processo para garantir a conformidade com as políticas de privacidade e segurança do usuário.

## Tecnologias Utilizadas

- **Framework Backend:** Bun elysia
- **Banco de Dados:** PlanetScale
- **Provedores de Pagamento:** Integração com provedores de pagamento como Stripe, PayPal, etc.
- **Protocolo de Segurança:** HTTPS
- **Ferramentas de Monitoramento:** Prometheus, Grafana
- **Cache de Dados:** Redis
- **Ferramenta de Testes:** Bun test


Geração de Cupons:

    Cupons Únicos por Usuário:
        Gerar cupons únicos para cada usuário, associando-os a contas de cliente.
        Garantir que cada cupom seja válido apenas para o usuário ao qual foi atribuído.

    Cupons por Tipo de Desconto:
        Criar diferentes tipos de cupons, como porcentagem de desconto, desconto fixo em valor monetário, frete grátis, etc.
        Gerar cupons específicos para promoções sazonais ou eventos especiais.

Validação de Cupons:

    Validade dos Cupons:
        Verificar a data de validade dos cupons para garantir que estejam dentro do período de uso.

    Restrições de Uso:
        Implementar regras de uso, como valor mínimo de compra, uso único ou múltiplo, restrição a produtos específicos, entre outros.

Aplicação de Descontos:

    Aplicação Automática:
        Descontos automáticos aplicados ao subtotal do carrinho de compras quando um cupom válido é inserido.

    Cálculo do Desconto:
        Calcular o desconto com base no tipo de cupom (porcentagem ou valor fixo) e aplicar ao total da compra.

Regras de Uso:

    Exclusões e Restrições:
        Implementar regras de exclusão para determinados produtos, categorias ou marcas em que o cupom não pode ser aplicado.

    Cumulatividade de Cupons:
        Definir se os cupons podem ser combinados com outras ofertas ou cupons.