---
inclusion: always
---

# Ciclo SDLC

Todo trabalho neste repositório segue seis etapas. Cada uma tem um artefato e um portão; não avance sem o portão.

| Etapa | Artefato | Portão |
|---|---|---|
| Planejar | `.sdlc/<ciclo>/intent.md` | usuário aceita o intent |
| Desenhar | `.sdlc/<ciclo>/spec.md` | `spec-review.json` com `verdict: APPROVED` |
| Construir | `plan.md` + código | testes verdes a cada tarefa |
| Testar | `test-report.json`, `security.md` | `green: true` |
| Implantar | PR + `release.md` | CI verde + revisão aprovada → GO |
| Manter | incidente → novo `intent.md` | reabre o ciclo em Planejar |

- Um ciclo por pasta em `.sdlc/<ciclo>/`; nomes curtos em kebab-case.
- Requisitos sempre rastreáveis a um critério de aceite do intent.
- Cada pasta em `.sdlc/` é uma versão do produto, com o número SemVer no campo `versao` do `meta.json`: a primeira é 1.0.0; correção sobe o patch, funcionalidade nova sobe o minor e quebra de compatibilidade sobe o major. O PR aberto é o candidato `X.Y.Z-rc.N` e o GO torna a versão final.
- Nunca faça merge; o PO decide GO/NO-GO no PR.
- Quando precisar de uma decisão da pessoa (aceite, escolha entre caminhos), pergunte com a ferramenta user_input, quando ela existir, e dê as opções: a pessoa responde com um clique.
