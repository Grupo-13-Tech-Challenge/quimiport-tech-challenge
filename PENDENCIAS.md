# Pendências antes da entrega

Após a revisão técnica do repositório e a sincronização com os últimos alinhamentos do grupo, **não restam pendências técnicas obrigatórias identificadas na documentação/modelagem**.

Os itens abaixo dependem de informações ou ações que precisam ser realizadas pelo próprio grupo.

## 🔴 Pendências restantes

### 1. Preencher integrantes e RMs

O README ainda possui placeholders para os RMs.

**Ação:** substituir `TODO` pelos RMs corretos de cada integrante.

### 2. Gravar e publicar o vídeo demonstrativo

O vídeo deve ter entre **5 e 10 minutos** e apresentar:

- problema e contexto;
- proposta do QuimiPort;
- usuários;
- linguagem ubíqua;
- entidades, Objetos de Valor e agregados;
- casos de uso;
- regras de negócio;
- arquitetura;
- diagramas;
- plano de qualidade;
- roadmap de evolução.

**Ação:** após a publicação, adicionar o link do vídeo ao README.

## 🟡 Melhorias opcionais

Os itens abaixo são complementares e não são obrigatórios para a fase:

- Diagrama de Contexto;
- Diagrama conceitual de entidades e relacionamentos, além do Diagrama de Domínio já existente;
- revisões visuais adicionais nos diagramas;
- definição antecipada de framework de testes e meta de cobertura.

## ✅ Consolidações realizadas

- Diagrama de Domínio revisado com Aggregate Roots e fronteiras de agregados.
- Fluxo de Transição de Status finalizado.
- `StatusCarga` consolidado em cinco estados.
- Status documental separado do status da Carga Química.
- Agregados revisados e justificados.
- Objetos de Valor reduzidos aos conceitos utilizados no domínio atual.
- UC05 separado em Solicitar Inspeção e Validar Inspeção.
- UC08 definido como comportamento interno sem ator direto.
- UC09 corrigido para Operador Portuário.
- UC10 corrigido para incluir Responsável Técnico.
- UC11 mantido sem Responsável Técnico e Auditores.
- Casos de uso reorganizados em `docs/02-casos-de-uso/`.
- Diagrama consolidado de casos de uso criado.
- Plano de Qualidade consolidado.
- Tópico 9 de JavaScript/TypeScript consolidado.
- Tópico 10 de Decisões Arquiteturais consolidado.
- Estratégia de monorepos independentes para backend, frontend e mobile refletida na documentação.
- Excalidraw atualizado com os últimos alinhamentos.
