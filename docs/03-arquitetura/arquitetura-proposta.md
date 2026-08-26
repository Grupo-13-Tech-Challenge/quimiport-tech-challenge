# Arquitetura Proposta

O **backend do QuimiPort** será inicialmente estruturado como uma **arquitetura monolítica modular em camadas**, utilizando princípios de DDD e Clean Architecture.

A intenção é separar responsabilidades e evitar que regras de negócio dependam diretamente de banco de dados, frameworks ou interfaces externas.

## Domain

Núcleo do negócio do backend.

Contém:

- entidades;
- Objetos de Valor;
- agregados;
- regras de negócio;
- status e classificações.

Exemplos: `CargaQuimica`, `ProdutoQuimico`, `DocumentoCarga`, `Inspecao` e `AreaArmazenamento`.

## Application

Coordena os casos de uso e utiliza os elementos do Domain.

Exemplos:

- cadastrar/inativar Produto Químico;
- registrar Carga Química;
- validar documentação;
- solicitar/validar inspeção;
- liberar/bloquear/cancelar carga;
- consultar status e histórico.

## Interfaces

Responsável pela comunicação de usuários ou aplicações externas com o backend.

Futuramente poderá conter:

- controllers;
- rotas;
- DTOs;
- middlewares.

## Infrastructure

Contém detalhes técnicos externos ao núcleo do negócio:

- persistência;
- implementação de repositórios;
- banco de dados;
- integrações externas.

## Estratégia de aplicações

Backend, frontend e mobile serão aplicações independentes, cada uma mantida em seu próprio monorepo:

```text
quimiport-backend/
quimiport-frontend/
quimiport-mobile/
```

A comunicação entre frontend/mobile e backend ocorrerá por contratos de API, sem importação direta de código entre esses repositórios.

## Evolução

O backend começará como monólito modular. Uma evolução para microsserviços somente será avaliada quando houver necessidade concreta de escalabilidade, implantação independente ou autonomia entre contextos do domínio.
