# Entidades

## Carga Química

**Responsabilidade:** representar uma carga registrada para movimentação e controlar seu ciclo de vida.

**Principais atributos**
- id (UUID)
- produto químico
- quantidade
- tipo de carga
- origem
- destino
- responsável técnico
- status

**Regras relacionadas**
- deve possuir Produto Químico associado;
- Produto Químico deve estar ativo;
- deve possuir classificação de risco;
- quantidade deve ser maior que zero;
- deve possuir Responsável Técnico;
- não pode ser liberada sem documentação válida;
- não pode ser movimentada quando bloqueada ou cancelada.

## Produto Químico

**Responsabilidade:** representar o produto utilizado nas operações.

**Principais atributos**
- id (UUID)
- nome comercial
- fórmula química
- Número ONU
- classe de risco
- status

**Regras relacionadas**
- nome é obrigatório;
- classe de risco é obrigatória;
- produtos inativos não podem ser utilizados em novas cargas.

## Responsável Técnico

**Responsabilidade:** representar o profissional tecnicamente responsável pela carga.

**Principais atributos**
- id
- nome
- registro profissional
- contato

## Documento da Carga

**Responsabilidade:** representar documentos legais, laudos e licenças associados à carga.

**Principais atributos**
- id
- tipo
- número
- data de validade
- arquivo digital
- status de validação

## Inspeção

**Responsabilidade:** registrar a avaliação física ou documental realizada sobre a carga.

**Principais atributos**
- id
- carga
- data
- responsável
- parecer
- observações

## Área de Armazenamento

**Responsabilidade:** representar as áreas destinadas ao armazenamento das cargas químicas.

**Principais atributos**
- id
- identificação/código
- localização
- capacidade
- classes de risco compatíveis
