# Fluxo de Transição de Status da Carga Química

A carga nasce com status `REGISTERED`. O cliente não escolhe o status no cadastro. A máquina abaixo é a implementada na API e segue o controle de status da Fase 2.

| Status na API | Status no desafio |
|---|---|
| `REGISTERED` | Registrada |
| `UNDER_ANALYSIS` | Em análise |
| `UNDER_INSPECTION` | Em inspeção |
| `RELEASED` | Liberada |
| `BLOCKED` | Bloqueada |
| `IN_TRANSIT` | Em movimentação |
| `COMPLETED` | Finalizada |
| `CANCELED` | Cancelada |

## Fluxo principal

`REGISTERED` → `UNDER_ANALYSIS` → `UNDER_INSPECTION` → `RELEASED` → `IN_TRANSIT` → `COMPLETED`

## Transições permitidas

| Estado atual | Próximo estado | Condição |
|---|---|---|
| `REGISTERED` | `UNDER_ANALYSIS` | Transição da máquina |
| `REGISTERED` | `CANCELED` | Motivo informado no cancelamento |
| `UNDER_ANALYSIS` | `UNDER_INSPECTION` | Transição da máquina |
| `UNDER_ANALYSIS` | `CANCELED` | Motivo informado no cancelamento |
| `UNDER_INSPECTION` | `RELEASED` | Documentação obrigatória válida e não vencida |
| `UNDER_INSPECTION` | `BLOCKED` | Motivo informado no bloqueio |
| `UNDER_INSPECTION` | `CANCELED` | Motivo informado no cancelamento |
| `RELEASED` | `IN_TRANSIT` | Transição da máquina |
| `RELEASED` | `CANCELED` | Motivo informado no cancelamento |
| `BLOCKED` | `CANCELED` | Motivo informado no cancelamento |
| `IN_TRANSIT` | `COMPLETED` | Transição da máquina |

`COMPLETED` e `CANCELED` são estados terminais. Nenhuma transição sai deles.

A passagem para `RELEASED` pelo `PATCH /chemical-cargo/:id/status` usa a mesma condição do `PATCH /chemical-cargo/:id/release`: sem documentação válida a API responde 409 e o status não muda.

## Transições proibidas

| Estado atual | Destino recusado |
|---|---|
| `CANCELED` | `RELEASED` |
| `COMPLETED` | `IN_TRANSIT` |
| `BLOCKED` | `IN_TRANSIT` |
| `REGISTERED` | `COMPLETED` |
| `UNDER_INSPECTION` | `COMPLETED` |
| `RELEASED` | `REGISTERED` |

`UNDER_INSPECTION` não vai direto para `COMPLETED`. O caminho passa por `RELEASED` e depois `IN_TRANSIT`. `BLOCKED` só pode ir para `CANCELED`.
