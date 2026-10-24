# Relatório de Segurança - Lista de Compras

## Achados de Segurança

### Validação de Entrada
- **Severidade:** Média
- **Arquivo:** `src/app.js:10`
- **Descrição:** O campo `name` não possui limites de tamanho. Um atacante pode enviar uma string extremamente longa, causando problemas de memória ou negação de serviço (DoS).
- **Correção:** Implementar um limite máximo de caracteres para o campo `name` na validação do `POST /items`.

- **Severidade:** Média
- **Arquivo:** `src/app.js:26`
- **Descrição:** O ID do item é convertido para `parseInt` sem validação se o resultado é um número válido (NaN) ou se está dentro do intervalo esperado.
- **Correção:** Validar se `id` é um número positivo e válido antes de processar.

### Autenticação/Autorização
- **Severidade:** Alta
- **Arquivo:** `src/app.js`
- **Descrição:** Não há nenhum mecanismo de autenticação ou autorização nos endpoints. Qualquer usuário pode criar, visualizar, alterar ou excluir itens da lista.
- **Correção:** Implementar um sistema de autenticação (ex: JWT) e verificar permissões antes de executar ações nos itens.

### Segredos no Código
- **Severidade:** Baixa
- **Arquivo:** `src/models/item.js:3`
- **Descrição:** O uso de `Math.random()` para gerar IDs não é seguro para identificadores únicos em ambientes de produção, embora não seja um segredo exposto diretamente.
- **Correção:** Utilizar uma biblioteca de UUID ou um gerador de IDs criptograficamente seguro.

### Dependências com Vulnerabilidade Conhecida
- **Severidade:** Baixa (Dependente de análise de ferramentas)
- **Arquivo:** `package.json`
- **Descrição:** As versões de `express` e `body-parser` devem ser verificadas regularmente contra vulnerabilidades conhecidas.
- **Correção:** Executar `npm audit` regularmente e atualizar as dependências para as versões mais recentes e seguras.

### Logs com Dados Sensíveis
- **Severidade:** Nenhuma
- **Descrição:** Não foram detectados logs de dados sensíveis no código atual.
