# Agregados

A definição dos agregados foi simplificada para refletir os casos de uso e as regras efetivamente modeladas nesta fase.

## 1. Agregado Carga Química

### Aggregate Root

`CargaQuimica`

A **Carga Química** é o principal Aggregate Root do QuimiPort. Ela controla o ciclo de vida operacional da carga e protege as regras que precisam permanecer consistentes durante alterações nesse fluxo.

### Entidades pertencentes ao agregado

- `DocumentoCarga`
- `Inspecao`

Essas entidades são tratadas dentro da fronteira da Carga Química porque sua existência e suas alterações fazem sentido no contexto de uma carga específica.

### Referências externas

A Carga Química pode referenciar outras entidades do domínio por seus identificadores, sem incorporá-las à mesma fronteira de consistência:

- `ProdutoQuimico`
- `ResponsavelTecnico`
- `AreaArmazenamento`

### Regras protegidas pelo agregado

- impedir registro sem Produto Químico associado;
- impedir registro com Produto Químico inativo;
- exigir classificação de risco válida;
- garantir quantidade maior que zero;
- exigir Responsável Técnico;
- impedir liberação com documentação obrigatória incompleta, inválida ou vencida;
- exigir parecer favorável da inspeção antes da liberação;
- impedir movimentação ou liberação de carga bloqueada;
- impedir liberação ou movimentação de carga cancelada;
- validar as transições da máquina de estados;
- registrar alterações relevantes no histórico da carga.

## 2. Agregado Produto Químico

### Aggregate Root

`ProdutoQuimico`

O Produto Químico possui identidade e ciclo de vida próprios, sendo cadastrado e inativado independentemente da Carga Química. Por isso, foi mantido como Aggregate Root separado.

### Regras protegidas pelo agregado

- nome comercial é obrigatório;
- classe de risco é obrigatória;
- o status deve ser controlado entre `ATIVO` e `INATIVO`;
- produto inativo não pode ser utilizado em novos registros de carga.

## Elementos que não foram tratados como Aggregate Roots nesta fase

### Inspeção

Permanece como entidade pertencente ao agregado Carga Química. O resultado da inspeção influencia a liberação da carga, mas o projeto atual não possui um ciclo de vida independente que justifique um agregado separado.

### Área de Armazenamento

Permanece como entidade referenciada. O documento da FIAP sugere sua presença na modelagem, mas os casos de uso atuais não incluem operações próprias de cadastro ou manutenção da área que exijam a definição de um agregado independente nesta fase.

### Responsável Técnico

Permanece como entidade referenciada pela Carga Química. O projeto exige sua associação à carga, porém o cadastro e a manutenção desse profissional não fazem parte dos casos de uso desta fase.

Essa modelagem poderá ser revista nas próximas fases caso novos casos de uso criem fronteiras de consistência independentes.
