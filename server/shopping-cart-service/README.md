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

3. **Cálculo de Subtotal e Total:**
   - O sistema deve calcular automaticamente o subtotal e o total do carrinho com base nos itens adicionados, seus preços e quantidades.
   - Quaisquer descontos, promoções ou cupons aplicados devem ser refletidos nos cálculos do subtotal e do total.
   - Exemplo de caso de uso: Um usuário visualiza o subtotal e o total atualizados após adicionar ou remover itens do carrinho.

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
