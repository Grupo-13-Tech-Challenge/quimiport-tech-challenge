# QuimiPort — API de Gestão de Cargas Químicas

## Sobre o projeto

O **QuimiPort** é uma API REST desenvolvida como parte do Tech Challenge da Pós-Tech FIAP em Full Stack Development. O projeto tem como objetivo auxiliar no gerenciamento de produtos químicos e cargas químicas em contexto portuário, aplicando regras de negócio relacionadas à segurança, documentação e controle operacional.

A aplicação busca centralizar as informações dos produtos e das cargas, permitindo o gerenciamento dos dados e o controle das operações conforme as regras definidas para o domínio.

## Objetivos

- Gerenciar produtos químicos.
- Cadastrar e consultar cargas químicas.
- Associar cargas aos respectivos produtos.
- Controlar quantidade, unidade, origem, destino e responsável técnico.
- Validar a documentação necessária para liberação.
- Controlar os status das cargas.
- Implementar operações de bloqueio, liberação e cancelamento.
- Garantir a persistência dos dados.
- Aplicar uma arquitetura organizada em camadas.
- Desenvolver testes automatizados.

## Tecnologias utilizadas

- **Node.js:** ambiente de execução.
- **TypeScript:** linguagem de desenvolvimento.
- **Fastify:** framework da API. Foi escolhido pela validação de entrada com Zod, pelo Swagger no mesmo processo e pelo log de requisição já integrado. A API obrigatória desta fase é REST.
- **PostgreSQL:** banco relacional. A carga referencia produto, responsável técnico e documentos por chave estrangeira, e o status da carga é um enum com transições controladas pela aplicação.
- **TypeORM:** mapeamento objeto-relacional.
- **pg:** driver de conexão com PostgreSQL.
- **Zod:** validação de dados.
- **Vitest:** testes automatizados.
- **tsx:** execução do TypeScript durante o desenvolvimento.
- **tsup:** compilação da aplicação.
- **ESLint:** análise estática do código.
- **Prettier:** formatação do código.
- **dotenv:** gerenciamento de variáveis de ambiente.

## Estrutura do projeto

```text
QUIMIPORT-TECH-CHALLENGE/
├── docs/
├── src/
│   ├── application/
│   ├── domain/
│   ├── env/
│   ├── infrastructure/
│   ├── interfaces/
│   │   ├── controllers/
│   │   ├── dtos/
│   │   └── errors/
│   ├── shared/
│   ├── app.ts
│   └── server.ts
├── tests/
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── package-lock.json
├── script.sql
├── seed.sql
├── Dockerfile
├── docker-compose.yml
├── prometheus.yml
├── .github/workflows/ci.yml
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Arquitetura

O projeto está organizado em camadas, separando as responsabilidades de domínio, aplicação, infraestrutura e interfaces, com o objetivo de facilitar a manutenção e a evolução do sistema.

- **Domain:** concentra as entidades, os conceitos e as regras de negócio do domínio de cargas químicas.
- **Application:** organiza os casos de uso e a coordenação das operações da aplicação.
- **Infrastructure:** reúne os componentes relacionados à infraestrutura, incluindo o acesso aos dados.
- **Interfaces:** contém controllers, DTOs e componentes relacionados à comunicação com a aplicação e ao tratamento de erros.
- **Shared:** reúne recursos compartilhados entre diferentes partes do sistema.
- **Tests:** contém os testes automatizados.
- **Docs:** armazena a documentação complementar.
- **app.ts:** arquivo relacionado à configuração da aplicação.
- **server.ts:** arquivo de inicialização do servidor.

## Regras de negócio

### Produtos químicos

- O produto deve possuir nome e classificação de risco válidos.
- Produtos inativos não podem ser associados a novas cargas.
- Os dados devem ser validados antes de serem persistidos.

### Cargas químicas

- Toda carga deve estar associada a um produto válido e ativo.
- A quantidade deve ser maior que zero.
- O responsável técnico deve ser informado.
- A liberação depende do atendimento aos requisitos documentais obrigatórios.
- Cargas bloqueadas não podem seguir para movimentação.
- Cargas canceladas não podem ser liberadas.
- Uma carga em inspeção não pode ser finalizada sem passar por liberada e depois por movimentação.
- As alterações de status devem respeitar as transições permitidas pelas regras de negócio.

### Status das cargas

Os status previstos para o gerenciamento das cargas químicas são:

- Registrada
- Em análise
- Em inspeção
- Liberada
- Bloqueada
- Em movimentação
- Finalizada
- Cancelada

Na API esses status são `REGISTERED`, `UNDER_ANALYSIS`, `UNDER_INSPECTION`, `RELEASED`, `BLOCKED`, `IN_TRANSIT`, `COMPLETED` e `CANCELED`. A carga nasce `REGISTERED`. A tabela de transições permitidas e proibidas está em [`docs/06-diagramas/fluxo-status-carga/README.md`](docs/06-diagramas/fluxo-status-carga/README.md).

## Endpoints da API

Os caminhos estão em inglês. O desafio sugere rotas em português, e a API mantém o mesmo recurso e o mesmo método.

### Produtos químicos

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/chemical-product` | Cadastrar produto químico |
| GET | `/chemical-product` | Listar produtos químicos |
| GET | `/chemical-product/:id` | Consultar produto por ID |
| PUT | `/chemical-product/:id` | Atualizar produto químico |
| PATCH | `/chemical-product/:id/inactivate` | Inativar produto químico |

### Cargas químicas

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/chemical-cargo` | Cadastrar carga química |
| GET | `/chemical-cargo` | Listar cargas químicas |
| GET | `/chemical-cargo/:id` | Consultar carga por ID |
| PATCH | `/chemical-cargo/:id/status` | Atualizar status da carga |
| PATCH | `/chemical-cargo/:id/block` | Bloquear carga |
| PATCH | `/chemical-cargo/:id/release` | Liberar carga |
| PATCH | `/chemical-cargo/:id/cancel` | Cancelar carga |

## Banco de dados

O projeto utiliza PostgreSQL como banco de dados relacional, com TypeORM e o driver `pg` para integração com a aplicação.

O arquivo `script.sql` cria as tabelas `chemical_product`, `technical_responsible`, `chemical_cargo` e `cargo_document`, com as chaves estrangeiras da carga para o produto e para o responsável técnico, e do documento para a carga. O status do produto e o status da carga são enums no banco. O arquivo `seed.sql` insere um produto ativo, um responsável técnico e uma carga em inspeção com documento válido, para o cadastro e a liberação poderem ser exercitados num banco novo.

## Instalação e execução

### Pré-requisitos

- Node.js instalado.
- npm.
- PostgreSQL configurado e acessível pela aplicação.

### 1. Clonar o repositório

```bash
git clone git@github.com:Grupo-13-Tech-Challenge/quimiport-tech-challenge.git
cd quimiport-tech-challenge
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Copie `.env.example` para `.env`. A aplicação lê:

| Variável | Uso |
|---|---|
| `NODE_ENV` | `development`, `production` ou `test`. O padrão é `development`. |
| `PORT` | Porta HTTP da API. No exemplo, `3000`. |
| `DATABASE_USER` | Usuário do PostgreSQL. |
| `DATABASE_PASSWORD` | Senha do PostgreSQL. |
| `DATABASE_HOST` | No Compose, o serviço usa `postgres`. Na máquina, use `localhost`. |
| `DATABASE_NAME` | Nome do banco. No exemplo, `quimiport`. |
| `DATABASE_PORT` | No Compose, `5432`. Na máquina, a porta publicada é `5433`. |

O arquivo `.env` não entra no Git. O exemplo traz só os valores de desenvolvimento.

### 4. Executar em desenvolvimento

```bash
npm run start:dev
```

Esse comando utiliza `tsx watch` para iniciar o servidor e acompanhar alterações nos arquivos durante o desenvolvimento.

### 5. Gerar o build

```bash
npm run build
```

O comando utiliza `tsup` para gerar os arquivos compilados no diretório `build/`.

### 6. Executar a aplicação compilada

```bash
npm start
```

Execute esse comando após gerar o build e confirmar que o arquivo `build/server.js` foi produzido corretamente.

## Testes automatizados

O projeto utiliza Vitest para executar os testes automatizados.

### Executar os testes

```bash
npm test
```

### Executar os testes em modo de acompanhamento

```bash
npm run test:watch
```

### Gerar relatório de cobertura

```bash
npm run test:coverage
```

Os testes devem validar os principais comportamentos e regras de negócio da aplicação, incluindo:

- Cadastro e validação de produtos químicos.
- Validação de campos obrigatórios.
- Cadastro de cargas químicas.
- Impedimento de associação com produtos inativos.
- Validação de quantidade maior que zero.
- Requisitos documentais para liberação.
- Atualização de status.
- Transições permitidas e proibidas.
- Bloqueio e cancelamento de cargas.

A cobertura efetiva depende dos testes implementados no diretório `tests/`.

## Qualidade e padronização do código

O projeto utiliza ESLint e Prettier para auxiliar na qualidade e na padronização do código.

### Executar o ESLint

```bash
npm run lint
```

### Formatar os arquivos

```bash
npm run format
```

O comando de formatação pode alterar os arquivos abrangidos pela configuração do Prettier.

## Documentação da API

Com a API no ar, o Swagger fica em [http://localhost:3000/docs](http://localhost:3000/docs). Ele lista os endpoints, os corpos, os exemplos e os códigos de erro. As regras de status estão em [`docs/06-diagramas/fluxo-status-carga/README.md`](docs/06-diagramas/fluxo-status-carga/README.md).

O Fastify registra cada requisição. Cadastro de produto, inativação, registro de carga, mudança de status, liberação, bloqueio e cancelamento também geram uma linha de log depois que a operação é gravada.

## Docker

O `Dockerfile` gera a imagem da API. O `docker-compose.yml` sobe a API, o PostgreSQL, o Prometheus e o Grafana. Na primeira criação do volume, o Postgres executa `script.sql` e `seed.sql`.

```bash
docker compose up -d --build
```

A API fica em [http://localhost:3000](http://localhost:3000) e a documentação em [http://localhost:3000/docs](http://localhost:3000/docs). O Prometheus usa a porta `9090` e o Grafana a porta `3001`.

```bash
docker compose down
```

## Integração contínua

O workflow `.github/workflows/ci.yml` roda em push para `develop` e `master`, e em pull request. O job `Install, build and test` instala as dependências, faz o typecheck, gera o build e executa os testes. O job `Docker build and compose` valida o Compose, sobe a API com o Postgres e consulta `/docs`. Não há deploy nesta fase.

## Equipe

- **Bruno Pioltini Paiva** — RM375998
- **Ebert de Carvalho Rodrigues Neto** — RM375253
- **Leandro Cavalcanti de Souza Lima** — RM376777
- **Milena Porto Coyado** — RM377078
- **Vinicius Silva Santos** — RM375576

## Instituição

**FIAP — Pós Tech**  
**Curso:** Full Stack Development  
**Tech Challenge:** Fase 2