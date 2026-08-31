# QuimiPort

> Sistema para gestão de cargas químicas em contexto portuário.

**FIAP Pós Tech — Full Stack Development**  
**Tech Challenge — Fase 1**

## Sobre o projeto

O **QuimiPort** é uma proposta de aplicação full stack para gerenciamento de cargas químicas em ambiente portuário, inspirada em operações logísticas do Porto de Santos.

Nesta primeira fase, o projeto está concentrado na compreensão do domínio, modelagem com Domain Driven Design (DDD), regras de negócio, casos de uso, arquitetura, organização do projeto e planejamento de qualidade. Não há necessidade de frontend, backend ou banco de dados funcional nesta etapa.

O objetivo central é evitar que cargas químicas sejam movimentadas sem atender aos requisitos de classificação de risco, documentação, responsabilidade técnica, inspeção e demais regras de segurança definidas pelo domínio.

## Navegação

| Área | Documento |
|---|---|
| Entendimento do domínio | [`docs/01-dominio/entendimento-do-dominio.md`](./docs/01-dominio/entendimento-do-dominio.md) |
| Linguagem ubíqua | [`docs/01-dominio/linguagem-ubiqua.md`](./docs/01-dominio/linguagem-ubiqua.md) |
| Entidades | [`docs/01-dominio/entidades.md`](./docs/01-dominio/entidades.md) |
| Objetos de valor | [`docs/01-dominio/objetos-de-valor.md`](./docs/01-dominio/objetos-de-valor.md) |
| Agregados | [`docs/01-dominio/agregados.md`](./docs/01-dominio/agregados.md) |
| Regras de negócio | [`docs/01-dominio/regras-de-negocio.md`](./docs/01-dominio/regras-de-negocio.md) |
| Casos de uso | [`docs/02-casos-de-uso/README.md`](./docs/02-casos-de-uso/README.md) |
| Arquitetura proposta | [`docs/03-arquitetura/arquitetura-proposta.md`](./docs/03-arquitetura/arquitetura-proposta.md) |
| Organização do projeto | [`docs/03-arquitetura/organizacao-projeto.md`](./docs/03-arquitetura/organizacao-projeto.md) |
| Decisões arquiteturais | [`docs/03-arquitetura/decisoes-arquiteturais.md`](./docs/03-arquitetura/decisoes-arquiteturais.md) |
| Plano de qualidade | [`docs/04-qualidade/plano-de-qualidade.md`](./docs/04-qualidade/plano-de-qualidade.md) |
| JavaScript / TypeScript | [`docs/05-typescript/estrategia-javascript-typescript.md`](./docs/05-typescript/estrategia-javascript-typescript.md) |
| Diagramas | [`docs/06-diagramas/README.md`](./docs/06-diagramas/README.md) |
| Roteiro do vídeo | [`docs/07-video/roteiro-video.md`](./docs/07-video/roteiro-video.md) |
| Pendências | [`PENDENCIAS.md`](./PENDENCIAS.md) |

## Usuários envolvidos

- Operador Portuário
- Responsável Técnico
- Analista de Documentação
- Analista de Qualidade / Segurança
- Gestor Operacional
- Administrador do Sistema

## Principais processos

1. Homologação e cadastro de Produtos Químicos.
2. Registro e abertura de Cargas Químicas.
3. Gestão e validação de documentação obrigatória.
4. Inspeção e validação de segurança.
5. Decisão de liberação ou bloqueio.
6. Monitoramento do ciclo de vida e histórico.

## Modelagem DDD

A modelagem contempla:

- Entidades
- Objetos de Valor
- Agregados
- Casos de uso
- Regras de negócio
- Linguagem ubíqua

A **Carga Química** é o agregado principal da proposta, pois concentra o ciclo de vida operacional e protege regras relacionadas ao produto associado, quantidade, documentação, responsável técnico, inspeção, status, liberação, bloqueio, cancelamento e histórico.

## Casos de uso

| ID | Caso de uso | Ator / acionamento |
|---|---|---|
| UC01 | Cadastrar Produto Químico | Administrador do Sistema |
| UC02 | Inativar Produto Químico | Administrador do Sistema |
| UC03 | Registrar Carga Química | Operador Portuário |
| UC04 | Validar Documentação da Carga | Analista de Documentação |
| UC05 | Solicitar Inspeção | Operador Portuário |
| UC05B | Validar Inspeção | Analista de Qualidade / Segurança |
| UC06 | Liberar Carga Química | Gestor Operacional |
| UC07 | Bloquear Carga Química | Gestor Operacional |
| UC08 | Atualizar Status da Carga | Interno, sem ator direto |
| UC09 | Cancelar Carga Química | Operador Portuário |
| UC10 | Consultar Cargas por Status | Perfis autorizados, incluindo Responsável Técnico |
| UC11 | Consultar Histórico da Carga | Operador, Analistas, Gestor e Administrador |

## Regras de negócio centrais

- Produto Químico deve possuir nome e classe de risco.
- Produto Químico inativo não pode ser utilizado em novas cargas.
- Carga Química deve possuir Produto Químico associado e ativo.
- Carga Química deve possuir classificação de risco válida.
- Quantidade da carga deve ser maior que zero.
- Toda carga deve possuir Responsável Técnico.
- Documentação obrigatória deve estar aprovada e válida antes da liberação.
- Documentos vencidos impedem a liberação.
- Carga precisa atender às condições documentais antes da inspeção.
- Inspeção precisa possuir parecer favorável para permitir a liberação.
- Carga bloqueada não pode ser movimentada ou liberada.
- Carga cancelada não pode ser movimentada ou liberada.
- Transições de status devem respeitar a máquina de estados.
- Consultas devem respeitar o escopo de visualização do usuário.
- Histórico de eventos deve ser imutável.

## Ciclo de vida da carga

Fluxo principal:

```text
PENDENTE_DOCUMENTACAO
          ↓
     EM_INSPECAO
          ↓
       LIBERADA
```

Estados adicionais previstos:

```text
BLOQUEADA
CANCELADA
```

`APROVADO` pertence ao status da validação documental e não ao `StatusCarga`.

A atualização de status não é tratada como uma seleção arbitrária feita por um ator. Uma operação de negócio válida provoca uma transição e o QuimiPort valida a mudança por meio da máquina de estados.

📄 [Ver fluxo completo de transição de status](./docs/06-diagramas/fluxo-status-carga/)

## Arquitetura

O **backend** será inicialmente um **monólito modular em camadas**, com princípios de DDD e Clean Architecture:

```text
Interfaces
    ↓
Application
    ↓
Domain
    ↑
Infrastructure
```

- `domain/`: núcleo do negócio.
- `application/`: coordenação dos casos de uso.
- `interfaces/`: entrada da aplicação, como controllers e rotas futuras.
- `infrastructure/`: persistência, repositórios e integrações.
- `shared/`: recursos realmente genéricos e reutilizáveis dentro do backend.
- `tests/`: testes unitários e, futuramente, integração.

Frontend, backend e mobile serão mantidos em monorepos independentes e se comunicarão por contratos de API.

## Diagramas obrigatórios

Para a entrega da fase, devem estar presentes:

- [**Diagrama de Domínio (Agregados / Entidades)**](./docs/06-diagramas/diagrama-dominio/)
- [**Fluxo de Transição de Status da Carga Química**](./docs/06-diagramas/fluxo-status-carga/)

Os demais diagramas são complementares.

## Integrantes

| Integrante | RM |
|---|---|
| Bruno Pioltini Paiva | RM375998​
| Ebert de Carvalho Rodrigues Neto | RM375253​
| Leandro Cavalcanti de Souza Lima | RM376777​
| Milena Porto Coyado | RM377078​
| Vinicius Silva Santos | RM375576​


## Vídeo Demonstrativo

**Acesse aqui:** https://drive.google.com/file/d/1EOIrPqv-O8w-J40VcYWlb0fkAHQqgbYm/view?usp=drive_link

## Instituição

**FIAP — Pós Tech**  
**Curso:** Full Stack Development  
**Tech Challenge:** Fase 1
