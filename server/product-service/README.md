# Requisitos Funcionais e Não Funcionais - Serviço de Catálogo de Produtos

## Requisitos Funcionais

1. **Cadastro de Produtos:**
   - Os administradores devem poder adicionar novos produtos ao catálogo, fornecendo informações como nome, descrição, imagens, preço, categorias, avaliações, disponibilidade em estoque e especificações técnicas.
   - Deve ser possível definir múltiplas categorias e subcategorias para cada produto, permitindo uma organização eficiente do catálogo.
   - Exemplo de caso de uso: Um administrador adiciona um novo produto ao catálogo com todas as informações relevantes.

2. **Atualização de Produtos:**
   - Os administradores devem poder editar as informações dos produtos existentes, incluindo preço, disponibilidade em estoque, descrição, imagens, etc.
   - Todas as alterações feitas nos produtos devem ser refletidas instantaneamente no catálogo para garantir consistência de dados.
   - Exemplo de caso de uso: Um administrador atualiza o preço de um produto existente no catálogo.

3. **Visualização de Produtos:**
   - Os usuários devem poder visualizar os detalhes de cada produto no catálogo, incluindo nome, descrição, imagens, preço, categorias, avaliações e especificações técnicas.
   - Deve ser possível pesquisar produtos por nome, categoria, preço, etc., para facilitar a navegação e a descoberta de produtos.
   - Exemplo de caso de uso: Um usuário navega pelo catálogo e visualiza os detalhes de um produto específico.

4. **Avaliação de Produtos:**
   - Os usuários devem poder avaliar e deixar comentários sobre os produtos que compraram ou experimentaram.
   - As avaliações dos usuários devem ser exibidas junto com os detalhes do produto para fornecer informações úteis aos outros clientes.
   - Exemplo de caso de uso: Um usuário deixa uma avaliação e um comentário sobre um produto após usá-lo.

## Requisitos Não Funcionais

1. **Segurança:**
   - O sistema deve garantir a segurança das informações dos produtos, incluindo preços, imagens e especificações técnicas, protegendo contra acesso não autorizado e modificação indevida.
   - A autenticação e autorização adequadas devem ser implementadas para garantir que apenas usuários autorizados possam adicionar, editar ou excluir produtos do catálogo.

2. **Desempenho:**
   - O sistema deve ser otimizado para um desempenho rápido e responsivo, garantindo tempos de resposta baixos ao carregar páginas de produtos e realizar pesquisas no catálogo.
   - Deve ser implementado cache de dados para reduzir o tempo de carregamento das páginas e melhorar a experiência do usuário.

3. **Escalabilidade:**
   - O sistema deve ser projetado para ser escalável e capaz de lidar com um grande número de produtos e usuários simultâneos.
   - Deve ser possível adicionar novos servidores e recursos conforme necessário para lidar com aumentos na demanda por produtos.

4. **Disponibilidade:**
   - O sistema deve ser altamente disponível e resiliente a falhas, garantindo que os usuários possam acessar o catálogo 24/7 sem interrupções significativas.
   - Deve ser implementado um sistema de monitoramento para detectar e responder a falhas de forma proativa.

5. **Conformidade:**
   - O sistema deve estar em conformidade com regulamentações de proteção de dados, como GDPR, e padrões de segurança da indústria para proteger as informações dos usuários e dos produtos.
   - Deve ser implementado um processo para garantir a conformidade com as políticas de privacidade e segurança do usuário.

## Tecnologias Utilizadas

- **Linguagem de Programação:** TypeScript
- **Framework Backend:** Node.js com Express
- **Banco de Dados:** Supabase
- **Armazenamento de Imagens:** Supabase Storage
- **Protocolo de Segurança:** HTTPS
- **Ferramentas de Monitoramento:** Prometheus, Grafana
- **Cache de Dados:** Redis
- **Ferramenta de Testes:** Jest



# Requisitos Funcionais e Não Funcionais - Serviço de Gestão de Inventário e Estoque

## Requisitos Funcionais

1. **Monitoramento de Níveis de Estoque:**
   - O sistema deve monitorar constantemente os níveis de estoque de cada produto disponível para venda.
   - Deve ser capaz de rastrear a quantidade atual de cada item em estoque e atualizá-la conforme as compras são feitas.
   - Exemplo de caso de uso: O sistema atualiza automaticamente o nível de estoque de um produto após uma compra ser realizada.

2. **Atualização de Estoque:**
   - O sistema deve permitir a atualização manual dos níveis de estoque, caso seja necessário adicionar ou remover itens do inventário por motivos como reposição de estoque ou ajustes de inventário.
   - Deve ser possível editar a quantidade de cada item em estoque de forma precisa e eficiente.
   - Exemplo de caso de uso: Um administrador adiciona novos itens ao estoque após receber um novo lote de produtos.

3. **Informações sobre Disponibilidade de Produtos:**
   - O sistema deve fornecer informações em tempo real sobre a disponibilidade de cada produto no estoque.
   - Deve ser possível visualizar a quantidade disponível de cada item e sua disponibilidade para compra.
   - Exemplo de caso de uso: Um cliente verifica a disponibilidade de um produto antes de realizar a compra.

4. **Prevenção de Vendas de Produtos Esgotados:**
   - O sistema deve evitar que produtos esgotados sejam vendidos, garantindo que apenas produtos com estoque disponível estejam disponíveis para compra.
   - Deve ser possível configurar alertas para notificar os administradores quando um produto estiver com estoque baixo.
   - Exemplo de caso de uso: Um cliente tenta adicionar um produto esgotado ao carrinho, mas o sistema impede a ação e exibe uma mensagem informativa.

## Requisitos Não Funcionais

1. **Segurança:**
   - O sistema deve garantir a segurança das informações do estoque e dos produtos, protegendo contra acesso não autorizado e manipulação indevida.
   - Deve ser implementada autenticação e autorização adequadas para proteger os dados do estoque.

2. **Desempenho:**
   - O sistema deve ser otimizado para um desempenho rápido e responsivo ao monitorar e atualizar os níveis de estoque.
   - Deve ser implementado cache de dados e outras técnicas de otimização para reduzir o tempo de resposta do sistema e melhorar a experiência do usuário.

3. **Escalabilidade:**
   - O sistema deve ser projetado para ser escalável e capaz de lidar com um grande volume de transações de atualização de estoque e consultas de disponibilidade de produtos.
   - Deve ser possível adicionar novos recursos conforme necessário para lidar com aumentos na demanda por produtos.

4. **Disponibilidade:**
   - O sistema deve ser altamente disponível e resiliente a falhas, garantindo que as informações sobre o estoque e a disponibilidade dos produtos estejam sempre acessíveis.
   - Deve ser implementado um sistema de monitoramento para detectar e responder a falhas de forma proativa.

5. **Conformidade:**
   - O sistema deve estar em conformidade com regulamentações de proteção de dados, como GDPR, e padrões de segurança da indústria para proteger as informações do estoque.
   - Deve ser implementado um processo para garantir a conformidade com as políticas de privacidade e segurança do usuário.

## Tecnologias Utilizadas

- **Framework Backend:** Flask
- **Banco de Dados:** Firebase Firestore
- **Protocolo de Segurança:** HTTPS
- **Ferramentas de Monitoramento:** Firebase Performance Monitoring
- **Cache de Dados:** Redis
- **Ferramenta de Testes:** pytest
