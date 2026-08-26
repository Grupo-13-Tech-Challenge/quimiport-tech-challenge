# Organização do Projeto

Nesta fase, este repositório concentra os **artefatos técnicos e a documentação** do Tech Challenge.

Na implementação futura, a solução será organizada em três monorepos independentes:

```text
quimiport-backend/
quimiport-frontend/
quimiport-mobile/
```

## Estrutura interna prevista para o backend

```text
src/
├── domain/
├── application/
├── infrastructure/
├── interfaces/
└── shared/

tests/
```

### `domain/`

Núcleo do negócio: entidades, Objetos de Valor, agregados, regras e máquina de estados.

### `application/`

Casos de uso e contratos necessários para coordenar operações.

### `infrastructure/`

Persistência, implementação de repositórios, banco de dados e integrações externas.

### `interfaces/`

Controllers, rotas, DTOs e demais mecanismos de entrada de uma futura API.

### `shared/`

Somente elementos realmente genéricos e compartilháveis **dentro do monorepo do backend**, sem regra específica de domínio.

### `tests/`

Testes unitários e, futuramente, testes de integração.

## Frontend e mobile

Frontend e mobile terão seus próprios monorepos e estruturas internas adequadas às suas tecnologias.

Não haverá uma pasta `shared/` única importada diretamente entre backend, frontend e mobile. A integração entre as aplicações ocorrerá por contratos de API e, futuramente, por pacotes versionados caso exista benefício real.
