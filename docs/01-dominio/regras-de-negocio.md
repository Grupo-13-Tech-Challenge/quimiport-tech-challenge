# Regras de Negócio

## Produto Químico

- RN01 — Produto Químico não pode ser cadastrado sem nome.
- RN02 — Produto Químico não pode ser cadastrado sem classe de risco.
- RN03 — Produto Químico inativo não pode ser utilizado em novas cargas.

## Carga Química

- RN04 — Carga Química não pode ser registrada sem Produto Químico associado.
- RN05 — Carga Química não pode utilizar Produto Químico inativo.
- RN06 — Carga Química deve possuir classificação de risco válida.
- RN07 — Quantidade da carga deve ser maior que zero.
- RN08 — Toda carga deve possuir Responsável Técnico.

## Documentação e inspeção

- RN09 — Carga não pode ser liberada sem documentação obrigatória aprovada e válida.
- RN10 — Documentos vencidos impedem a liberação.
- RN11 — Carga deve possuir documentação preliminar habilitada antes da solicitação de inspeção.
- RN12 — Carga em inspeção não pode ser finalizada/liberada sem parecer favorável.

## Ciclo de vida

- RN13 — Carga bloqueada não pode ser movimentada nem liberada.
- RN14 — Carga cancelada não pode ser movimentada nem liberada.
- RN15 — Transições de status devem respeitar a máquina de estados da carga.
- RN16 — Toda alteração relevante de status deve ser registrada no histórico.

## Consulta e auditoria

- RN17 — Consultas devem respeitar o escopo de visualização permitido.
- RN18 — Histórico da carga deve ser imutável para garantir rastreabilidade e auditoria.
