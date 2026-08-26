# Plano de Qualidade de Software

O plano abaixo define como as regras e os fluxos do QuimiPort poderão ser testados nas próximas fases.

## Regras críticas a testar

- Produto sem classe de risco deve ser rejeitado.
- Carga com Produto Químico inativo deve ser rejeitada.
- Carga com quantidade menor ou igual a zero deve ser rejeitada.
- Carga sem Responsável Técnico deve ser rejeitada.
- Liberação sem documentação obrigatória deve ser rejeitada.
- Documento vencido deve impedir liberação.
- Inspeção com parecer desfavorável deve impedir liberação.
- Carga bloqueada não pode ser movimentada ou liberada.
- Carga cancelada não pode ser liberada ou movimentada.
- Transições inválidas de `StatusCarga` devem ser rejeitadas.
- Histórico deve registrar alterações relevantes e permanecer imutável.

## Casos de uso mais críticos

1. UC03 — Registrar Carga Química.
2. UC04 — Validar Documentação.
3. UC05 — Solicitar Inspeção.
4. UC05B — Validar Inspeção.
5. UC06 — Liberar Carga Química.
6. UC07 — Bloquear Carga Química.
7. UC08 — Atualizar Status da Carga.
8. UC09 — Cancelar Carga Química.

## Tipos de teste planejados

### Testes unitários

Serão priorizados para:

- Objetos de Valor;
- entidades;
- regras e invariantes dos agregados;
- funções puras;
- máquina de estados;
- validações documentais.

### Testes de integração

Serão adicionados quando a infraestrutura estiver implementada, validando:

- repositórios;
- persistência;
- API;
- banco de dados;
- integrações externas.

## Validação dos fluxos principais

Os cenários poderão ser organizados no formato Given/When/Then, cobrindo caminhos de sucesso e falha para:

- cadastro de Produto Químico;
- registro de Carga Química;
- validação documental;
- solicitação e validação de inspeção;
- liberação;
- bloqueio;
- cancelamento;
- consulta por status;
- histórico.

## Mocks e dados simulados

Factories, fixtures e mocks poderão representar:

- Produto Químico ativo e inativo;
- Carga em cada valor de `StatusCarga`;
- documentos válidos e vencidos;
- inspeções com parecer favorável/desfavorável;
- atores com diferentes escopos de visualização.

## Decisões futuras não obrigatórias nesta fase

A escolha do framework de testes e de metas de cobertura será realizada quando a implementação iniciar. Essas decisões não alteram a estratégia de qualidade definida nesta fase.
