# Intent: Lista de Compras

## Problema
Usuários têm dificuldade em organizar e controlar itens de uma lista de compras doméstica, perdendo a noção do que já foi adquirido ou da quantidade necessária, resultando em compras duplicadas ou esquecimentos.

## Público
Usuários domésticos e famílias que desejam uma forma simples e eficiente de gerenciar listas de compras.

## Escopo
### Dentro
- Criação de itens de lista com nome e quantidade.
- Marcação de itens como "comprados".
- Consulta de itens pendentes (não comprados).
- Limpeza de itens já comprados da lista.
- API REST construída com Node.js e TypeScript.
- Testes automatizados para todos os endpoints.

### Fora
- Interface de usuário (Frontend).
- Integração com APIs de supermercados.
- Sistema de preços e orçamento total.
- Sincronização em tempo real entre múltiplos usuários.

## Critérios de Aceite
1. O sistema deve permitir adicionar um item à lista com nome e quantidade.
2. O sistema deve permitir alterar o status de um item para "comprado" através do seu ID.
3. O sistema deve fornecer um endpoint que retorne exclusivamente os itens que ainda não foram marcados como comprados.
4. O sistema deve fornecer um endpoint para excluir permanentemente todos os itens que já foram marcados como comprados.
5. O sistema deve retornar erro 400 ao tentar adicionar um item com nome vazio ou quantidade negativa.
6. O sistema deve possuir testes automatizados passando para todas as funcionalidades descritas.

## Riscos
- Perda de dados em caso de reinicialização do servidor (persistência em memória na v1).
- Concorrência de atualização de status de um mesmo item por múltiplos usuários.

## Suposições
- A persistência inicial será em memória para validação do ciclo.
- O identificador do item será gerado automaticamente pelo sistema.

## Perguntas em Aberto
- Deve haver suporte para categorias (ex: Açougue, Padaria)?
- É necessário suporte para edição de quantidades após a criação?
