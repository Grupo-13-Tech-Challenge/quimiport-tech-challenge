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
- **Fastify:** framework para construção da API.
- **PostgreSQL:** banco de dados relacional.
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

O fluxo de status deve impedir transições incompatíveis com as regras de negócio definidas para a aplicação.

## Endpoints da API

Os endpoints abaixo representam as operações previstas para o sistema. Os caminhos e métodos devem corresponder às rotas efetivamente implementadas no código.

### Produtos químicos

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/produtos-quimicos` | Cadastrar produto químico |
| GET | `/produtos-quimicos` | Listar produtos químicos |
| GET | `/produtos-quimicos/:id` | Consultar produto por ID |
| PUT | `/produtos-quimicos/:id` | Atualizar produto químico |
| PATCH | `/produtos-quimicos/:id/inativar` | Inativar produto químico |

### Cargas químicas

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/cargas-quimicas` | Cadastrar carga química |
| GET | `/cargas-quimicas` | Listar cargas químicas |
| GET | `/cargas-quimicas/:id` | Consultar carga por ID |
| PATCH | `/cargas-quimicas/:id/status` | Atualizar status da carga |
| PATCH | `/cargas-quimicas/:id/bloquear` | Bloquear carga |
| PATCH | `/cargas-quimicas/:id/liberar` | Liberar carga |
| PATCH | `/cargas-quimicas/:id/cancelar` | Cancelar carga |

**Observação:** confira os endpoints acima com as rotas existentes no projeto antes da entrega.

## Banco de dados

O projeto utiliza PostgreSQL como banco de dados relacional, com TypeORM e o driver `pg` para integração com a aplicação.

O repositório contém o arquivo `script.sql`, destinado a comandos SQL relacionados à estrutura ou à manipulação dos dados.

O modelo de persistência deve contemplar os produtos químicos, as cargas, o relacionamento entre eles e as informações necessárias para o controle das operações.

## Instalação e execução

### Pré-requisitos

- Node.js instalado.
- npm.
- PostgreSQL configurado e acessível pela aplicação.

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd QUIMIPORT-TECH-CHALLENGE
```

Substitua `<URL_DO_REPOSITORIO>` pelo endereço real do repositório Git.

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Utilize o arquivo `.env.example` como referência para configurar o arquivo `.env`.

Preencha as variáveis necessárias para a conexão com o banco de dados e para a execução da aplicação.

Não compartilhe senhas ou credenciais no repositório.

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

O diretório `docs/` está destinado à documentação complementar do projeto.

A documentação da API deve apresentar os endpoints implementados, métodos HTTP, parâmetros, exemplos de requisições e respostas, códigos de erro e regras de negócio relevantes.

Caso exista uma ferramenta de documentação interativa configurada, como Swagger, seu endereço de acesso deverá ser informado nesta seção.

## Docker

Caso a execução com Docker faça parte da implementação, devem ser disponibilizados os arquivos de configuração necessários, como `Dockerfile` e `docker-compose.yml`, acompanhados das instruções para executar a API e o banco de dados.

Os comandos de inicialização e encerramento devem ser documentados após a configuração desses arquivos.

## Integração contínua

A integração contínua pode automatizar a instalação das dependências, a análise estática do código e a execução dos testes.

Caso o GitHub Actions esteja configurado no repositório, esta seção deverá apresentar o workflow utilizado e as verificações executadas pelo pipeline.

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