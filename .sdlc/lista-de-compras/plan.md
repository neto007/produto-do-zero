# Plan: Lista de Compras

Este plano descreve as tarefas necessárias para implementar o sistema de Lista de Compras conforme a especificação aprovada.

## Tarefas

### 1. Setup Inicial
- [ ] 1.1 Criar estrutura de pastas e arquivos base.
- [ ] 1.2 Configurar servidor Express básico e rotas.

### 2. Modelagem e Memória
- [ ] 2.1 Definir a estrutura do objeto `Item`.
- [ ] 2.2 Implementar armazenamento em memória (lista de itens).

### 3. Funcionalidades de Itens
- [ ] 3.1 Implementar `POST /items` para adicionar novos itens com validação (AC1, AC5).
- [ ] 3.2 Implementar `PATCH /items/:id/status` para marcar como comprado (AC2).
- [ ] 3.3 Implementar `GET /items/pending` para listar pendentes (AC3).
- [ ] 3.4 Implementar `DELETE /items/bought` para limpar comprados (AC4).

### 4. Testes e Refinamento
- [ ] 4.1 Validar todos os endpoints com testes de integração.
- [ ] 4.2 Revisar validações e mensagens de erro.
