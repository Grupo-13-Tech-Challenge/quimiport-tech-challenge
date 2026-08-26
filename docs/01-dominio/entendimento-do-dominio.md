# Entendimento do Domínio

## Problema

O QuimiPort busca eliminar o controle manual e descentralizado da gestão de cargas químicas, centralizando informações e permitindo a validação das regras de segurança.

A solução deve garantir que nenhuma carga química seja movimentada sem classificação de risco adequada, documentação obrigatória, responsável técnico definido e aprovação das etapas exigidas.

## Usuários envolvidos

- Operador Portuário
- Responsável Técnico
- Analista de Documentação
- Analista de Qualidade / Segurança
- Gestor Operacional
- Administrador do Sistema

## Informações controladas

- Dados cadastrais dos Produtos Químicos
- Classes de risco
- Número ONU
- Quantidade/volume das cargas
- Tipo de carga/acondicionamento
- Status do ciclo de vida
- Documentos obrigatórios, laudos e licenças
- Histórico de inspeções
- Área de armazenamento
- Responsável Técnico
- Origem e destino da carga
- Histórico de alterações

## Processos

### Homologação e Cadastro de Produtos Químicos
O Administrador cadastra o Produto Químico e informa seus dados e classe de risco, definindo sua situação cadastral.

### Registro e Abertura da Carga Química
O Operador Portuário registra a carga associando-a a um Produto Químico ativo, informando quantidade, tipo, origem, destino e Responsável Técnico.

### Gestão e Validação de Documentação
O Analista de Documentação revisa e valida licenças, laudos e certificados obrigatórios.

### Inspeção e Segurança
O Operador solicita a inspeção e o Analista de Qualidade / Segurança realiza ou valida a inspeção, registrando o parecer correspondente.

### Liberação ou Bloqueio
O Gestor Operacional decide pela liberação ou bloqueio conforme as regras e resultados das etapas anteriores.

### Monitoramento e Histórico
O sistema acompanha o ciclo de vida e mantém o histórico das alterações para rastreabilidade.

## Riscos e restrições

- Movimentação de cargas perigosas sem validação.
- Documentação ausente, inválida ou vencida.
- Classificação de risco inexistente ou incorreta.
- Uso de Produto Químico inativo.
- Ausência de Responsável Técnico.
- Liberação indevida de carga bloqueada, cancelada ou sem inspeção favorável.
- Transições inválidas de status.
- Perda de rastreabilidade das alterações.

## Evoluções futuras identificadas

- Automação de fluxos.
- Aplicação mobile para operações em campo.
- Integrações com sistemas portuários, transportadoras e órgãos reguladores.
- Dashboards operacionais.
- Alertas e notificações.
- IA como apoio à decisão.
- Evolução arquitetural quando houver necessidade real de escalabilidade.
