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
