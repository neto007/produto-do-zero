# Spec: Lista de Compras

## Requisitos (EARS)

| ID | Critério de Aceite (Intent) | Requisito EARS |
|---|---|---|
| AC1 | O sistema deve permitir adicionar um item à lista com nome e quantidade. | **Quando** um usuário solicitar a inclusão de um item, **o sistema deve** criar um registro contendo um nome e uma quantidade. |
| AC2 | O sistema deve permitir alterar o status de um item para "comprado" através do seu ID. | **Quando** o sistema receber um ID de item válido, **o sistema deve** atualizar o status do referido item para "comprado". |
| AC3 | O sistema deve fornecer um endpoint que retorne exclusivamente os itens que ainda não foram marcados como comprados. | **Quando** o usuário solicitar a lista de pendências, **o sistema deve** retornar apenas os itens com status "pendente". |
| AC4 | O sistema deve fornecer um endpoint para excluir permanentemente todos os itens que já foram marcados como comprados. | **Quando** o usuário solicitar a limpeza de itens comprados, **o sistema deve** remover permanentemente todos os itens cujo status seja "comprado". |
| AC5 | O sistema deve retornar erro 400 ao tentar adicionar um item com nome vazio ou quantidade negativa. | **Se** o nome do item estiver vazio ou a quantidade for menor que zero, **o sistema deve** retornar um erro de validação (400 Bad Request). |

## Cenários (Gherkin)

### Adicionar Item
**Dado** que a lista de compras está vazia
**Quando** eu adicionar um item com nome "Leite" e quantidade 2
**Então** o sistema deve retornar 201 Created e o item deve constar na lista com status "pendente"

### Adicionar Item Inválido
**Dado** que a lista de compras está vazia
**Quando** eu adicionar um item com nome "" (vazio)
**Então** o sistema deve retornar 400 Bad Request

**Dado** que a lista de compras está vazia
**Quando** eu adicionar um item com nome "Pão" e quantidade -1
**Então** o sistema deve retornar 400 Bad Request

### Marcar como Comprado
**Dado** que existe um item "Café" com ID `123` e status "pendente"
**Quando** eu enviar uma requisição para atualizar o status do item `123` para "comprado"
**Então** o sistema deve retornar 200 OK e o status do item deve ser "comprado"

### Consultar Pendentes
**Dado** que a lista contém os itens:
- ID `1`: "Leite" (pendente)
- ID `2`: "Pão" (comprado)
**Quando** eu solicitar os itens pendentes
**Então** o sistema deve retornar apenas o item "Leite"

### Limpar Comprados
**Dado** que a lista contém os itens:
- ID `1`: "Leite" (pendente)
- ID `2`: "Pão" (comprado)
**Quando** eu solicitar a exclusão de itens comprados
**Então** o sistema deve retornar 204 No Content e apenas o item "Leite" deve permanecer na lista

## Tabela de API

| Método | Endpoint | Descrição | Request Body | Sucesso | Erros |
|---|---|---|---|---|---|
| POST | `/items` | Adiciona um novo item | `{"name": string, "quantity": number}` | 201 Created | 400 (nome vazio/qtd < 0) |
| PATCH | `/items/:id/status` | Altera status para comprado | `{"status": "comprado"}` | 200 OK | 404 (não encontrado), 400 (status inválido) |
| GET | `/items/pending` | Lista apenas pendentes | N/A | 200 OK | - |
| DELETE | `/items/bought` | Remove todos os comprados | N/A | 204 No Content | - |

## Dados e Restrições

| Campo | Tipo | Restrições |
|---|---|---|
| `id` | UUID / Integer | Gerado automaticamente pelo sistema |
| `name` | String | Obrigatório, não pode ser vazio, máx 100 chars |
| `quantity` | Integer | Obrigatório, deve ser > 0 |
| `status` | Enum | "pendente" (default), "comprado" |

## Estados da Lista
- **Vazia**: Nenhum item presente.
- **Pendentes**: Itens com `status: "pendente"`.
- **Comprados**: Itens com `status: "comprado"`.
- **Limpa**: Estado após exclusão de todos os itens com status "comprado".

## Decisões

| Decisão | Alternativas Descartadas | Motivo |
|---|---|---|
| Persistência em Memória | Banco de Dados (PostgreSQL/SQLite) | Simplicidade para o Ciclo 1 (v1). |
| IDs numéricos auto-incrementais | UUIDs | UUIDs evitam exposição de volume de dados, embora numéricos sejam mais simples para memória. |
| Sem suporte a categorias | Categorias (Açougue, etc) | Fora do escopo definido no intent para evitar complexidade inicial. |
| Sem edição de quantidade | Endpoint de Update de Quantidade | Fora do escopo definido no intent. |
