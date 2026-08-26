# Objetos de Valor

A lista de Objetos de Valor foi reduzida para manter somente conceitos que possuem uso claro na modelagem atual do QuimiPort.

## Objetos de Valor adotados

| Objeto de Valor | Responsabilidade | Regra / observação |
|---|---|---|
| `Quantidade` | Representar a quantidade de produto presente na carga, acompanhada de sua unidade de medida quando aplicável. | O valor deve ser maior que zero. |
| `ClasseRisco` | Representar a classificação de risco associada ao Produto Químico. | É obrigatória para o cadastro do produto e utilização em uma carga. |
| `NumeroONU` | Representar o identificador padronizado internacionalmente para produtos/substâncias perigosas. | Faz parte da identificação do Produto Químico. |
| `ValidadeDocumento` | Representar a validade de um documento. | Documento vencido não pode habilitar a liberação da carga. |
| `RegistroProfissional` | Representar o registro profissional do Responsável Técnico. | Pode concentrar validações relacionadas ao formato/validade do registro. |
| `ParecerTecnico` | Representar o resultado e a justificativa de uma inspeção. | O parecer favorável é necessário para a liberação de uma carga em inspeção. |
| `CapacidadeArmazenamento` | Representar o limite de capacidade da Área de Armazenamento. | Mantido por estar associado à entidade `AreaArmazenamento`, embora sua operação detalhada seja evolução futura. |

## Elementos modelados de outra forma

Os seguintes conceitos não serão tratados como Value Objects independentes nesta fase:

- `Peso`: incorporado ao conceito de `Quantidade`, evitando duas abstrações para a mesma informação operacional.
- `Periculosidade`: representada pelos conceitos já existentes de `ClasseRisco` e `NumeroONU`.
- `ConcentracaoQuimica`: removida da modelagem porque não aparece nas regras ou casos de uso atuais.
- `Localizacao`: permanecerá como atributo simples da Área de Armazenamento até que surjam regras próprias que justifiquem um Value Object.

## Enums

Os enums não são Objetos de Valor, mas representam conjuntos fechados de valores do domínio:

### `StatusCarga`

- `PENDENTE_DOCUMENTACAO`
- `EM_INSPECAO`
- `LIBERADA`
- `BLOQUEADA`
- `CANCELADA`

### `StatusProduto`

- `ATIVO`
- `INATIVO`

Também poderão ser utilizados enums para `TipoDocumento` e `StatusValidacao`, conforme a implementação futura.
