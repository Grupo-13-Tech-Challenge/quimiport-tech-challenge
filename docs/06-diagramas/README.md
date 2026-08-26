# Diagramas

Esta pasta reúne os diagramas gerais utilizados para representar o domínio, o ciclo de vida e a arquitetura proposta do QuimiPort.

## Obrigatórios para a entrega

- [x] **Diagrama de Domínio — Agregados / Entidades**
- [x] **Fluxo de Transição de Status da Carga Química**

## Complementares já produzidos

- [x] Diagrama Consolidado de Casos de Uso
- [x] Diagrama de Arquitetura em Camadas

## Complementares opcionais

- [ ] Diagrama de Contexto
- [ ] Diagrama de Entidades e Relacionamentos Conceituais

Esses dois diagramas são opcionais nesta fase e não são tratados como pendências obrigatórias.

## Organização

```text
06-diagramas/
│
├── diagrama-arquitetura/
├── diagrama-casos-de-uso/
├── diagrama-dominio/
├── fluxo-status-carga/
├── model.excalidraw
└── README.md
```

### `diagrama-dominio/`

Contém o Diagrama de Domínio, destacando Aggregate Roots, entidades, Objetos de Valor e relacionamentos relevantes.

### `fluxo-status-carga/`

Contém a máquina de estados adotada para a Carga Química.

### `diagrama-casos-de-uso/`

Contém somente a visão **consolidada** dos casos de uso.

Os diagramas e especificações individuais estão em:

```text
docs/02-casos-de-uso/
```

### `diagrama-arquitetura/`

Contém a arquitetura em camadas proposta para o backend do QuimiPort.

### `model.excalidraw`

Arquivo-fonte editável consolidado, atualizado com os alinhamentos mais recentes do grupo.
