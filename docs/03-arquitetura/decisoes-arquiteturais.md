# 10. Decisões Arquiteturais

Durante a modelagem do QuimiPort, foram tomadas decisões arquiteturais com o objetivo de manter a aplicação organizada, desacoplada, testável e preparada para evoluir ao longo das próximas fases do projeto.

A solução será inicialmente baseada em uma **arquitetura monolítica modular em camadas**, utilizando princípios de **Domain Driven Design (DDD)**, **SOLID** e **Clean Architecture**.

Além disso, backend, frontend e mobile serão tratados como aplicações independentes, cada uma organizada em seu próprio monorepo.

## Por que separar Domain, Application, Interfaces e Infrastructure?

Um dos principais benefícios dessa separação é manter o núcleo da aplicação independente das tecnologias utilizadas nas camadas externas.

A camada de **Domain** concentra os principais conceitos do negócio, como entidades, Objetos de Valor, agregados e regras de negócio. Dessa forma, alterações relacionadas a banco de dados, frameworks, APIs ou mecanismos de entrada não devem provocar alterações nas regras centrais da aplicação.

Essa organização também facilita a evolução do sistema, pois novas funcionalidades poderão ser adicionadas com menor impacto sobre outros módulos e menor risco de regressões.

Outro benefício está relacionado aos testes. Como as regras de negócio não dependerão diretamente de banco de dados, servidor ou framework, será possível testar o domínio de forma isolada.

A direção das dependências seguirá os princípios da Clean Architecture:

```text
Interfaces
    ↓
Application
    ↓
Domain

Infrastructure → implementações de contratos utilizados pelas camadas internas
```

O **Domain** não deverá conhecer detalhes de Infrastructure, banco de dados ou frameworks.

Essa decisão busca manter o núcleo da aplicação estável mesmo que tecnologias externas sejam substituídas durante a evolução do projeto.

## Por que concentrar regras de negócio no Domain ou nos casos de uso?

A concentração das regras de negócio no Domain e nos casos de uso tem como objetivo proteger os comportamentos centrais da aplicação e impedir que essas regras fiquem espalhadas em controllers, banco de dados ou outras tecnologias externas.

As regras diretamente relacionadas às entidades, Objetos de Valor e agregados deverão permanecer no **Domain**.

Exemplos:

- a quantidade da carga deve ser maior que zero;
- um Produto Químico inativo não pode ser utilizado em uma nova carga;
- uma carga bloqueada não pode ser movimentada;
- uma carga cancelada não pode ser liberada;
- as alterações de status devem respeitar a máquina de estados da carga.

Já a camada de **Application** ficará responsável principalmente pela coordenação dos casos de uso.

Exemplo conceitual:

```text
Receber solicitação
        ↓
Buscar informações necessárias
        ↓
Executar comportamento do domínio
        ↓
Persistir alterações
        ↓
Retornar resultado
```

Dessa forma, o Domain concentra as invariantes e regras que precisam ser protegidas, enquanto os casos de uso coordenam as operações necessárias para executar determinado fluxo.

## Por que utilizar TypeScript?

O TypeScript foi escolhido por permitir o aproveitamento do ecossistema JavaScript com o benefício adicional da verificação estática de tipos durante o desenvolvimento.

Entre os principais benefícios considerados estão:

- detecção antecipada de erros relacionados a tipos;
- maior segurança durante manutenção e refatorações;
- definição explícita de contratos;
- utilização de tipos e interfaces;
- melhor experiência de desenvolvimento com autocomplete e IntelliSense;
- possibilidade de utilização em backend, frontend e mobile;
- maior clareza na modelagem dos conceitos do domínio.

No QuimiPort, TypeScript poderá representar conceitos como `StatusCarga`, `StatusProduto`, `ClasseRisco`, `TipoDocumento` e `StatusValidacao`, além de DTOs, contratos de repositórios e entradas e saídas dos casos de uso.

## Por que iniciar com uma arquitetura monolítica modular?

Nesta primeira etapa, o backend do QuimiPort será desenvolvido como um **monólito modular**.

A escolha evita introduzir prematuramente a complexidade operacional de uma arquitetura distribuída enquanto o domínio ainda está sendo consolidado.

Mesmo sendo um monólito, a aplicação será organizada em módulos e camadas com responsabilidades bem definidas.

Essa abordagem oferece:

- menor complexidade inicial;
- facilidade de desenvolvimento e execução local;
- maior simplicidade nos testes;
- menor complexidade de implantação;
- comunicação simples entre módulos;
- possibilidade de evolução arquitetural futura.

Caso surjam necessidades concretas de escalabilidade, implantação independente ou autonomia entre partes do domínio, determinados módulos poderão futuramente ser extraídos para serviços independentes.

## Estratégia de organização dos repositórios

Backend, frontend e mobile serão mantidos em **monorepos independentes**.

A estrutura conceitual prevista é:

```text
quimiport-backend/
    └── aplicação e módulos relacionados ao backend

quimiport-frontend/
    └── aplicação web e pacotes relacionados ao frontend

quimiport-mobile/
    └── aplicação mobile e pacotes relacionados ao mobile
```

Cada aplicação poderá possuir:

- ciclo de desenvolvimento próprio;
- dependências próprias;
- versionamento independente;
- pipeline de CI/CD próprio;
- processo de implantação independente;
- bibliotecas internas específicas de seu contexto.

Backend, frontend e mobile não representam camadas da Clean Architecture; são **aplicações distintas da solução**.

Dentro do backend, por exemplo, continuarão existindo as camadas `Interfaces`, `Application`, `Domain` e `Infrastructure`.

A comunicação entre os diferentes monorepos será realizada por contratos bem definidos, principalmente por meio da API disponibilizada pelo backend.

## Como o projeto poderá evoluir para backend?

O backend poderá disponibilizar uma **API REST única**, consumida inicialmente tanto pelo frontend web quanto pela aplicação mobile.

O backend será mantido em um monorepo próprio e continuará seguindo internamente a arquitetura definida nesta fase:

```text
Interfaces
    ↓
Application
    ↓
Domain
    ↑
Infrastructure
```

A camada de **Interfaces** poderá conter:

- controllers;
- rotas;
- DTOs;
- middlewares.

A camada **Application** ficará responsável pela coordenação dos casos de uso.

A camada **Domain** continuará concentrando entidades, agregados, Objetos de Valor e regras de negócio.

A **Infrastructure** será responsável por detalhes tecnológicos, como persistência, banco de dados, implementação de repositórios e integrações externas.

O monorepo do backend poderá organizar diferentes módulos e pacotes internos relacionados à própria aplicação, sem misturar dependências específicas de frontend ou mobile.

Serão utilizados princípios de SOLID, DDD e Clean Architecture para preservar a separação de responsabilidades e reduzir o acoplamento.

## Como o projeto poderá evoluir para frontend?

O frontend será desenvolvido em um **monorepo próprio**, independente do backend e da aplicação mobile.

A aplicação web consumirá os serviços disponibilizados pela API REST do QuimiPort.

O frontend deverá considerar:

- utilização de TypeScript;
- tratamento padronizado de erros;
- testes unitários;
- design responsivo;
- organização de componentes reutilizáveis;
- separação entre apresentação, gerenciamento de estado e comunicação com serviços externos.

O monorepo do frontend poderá concentrar a aplicação web e outros pacotes ou bibliotecas específicos dessa frente.

Princípios de SOLID e de separação de responsabilidades inspirados na Clean Architecture poderão ser utilizados para manter a aplicação organizada e facilitar sua evolução.

## Como o projeto poderá evoluir para mobile?

A aplicação mobile também será mantida em um **monorepo próprio**, separado dos projetos de frontend e backend.

Inicialmente, o mobile poderá consumir a mesma API disponibilizada pelo backend.

A aplicação deverá considerar:

- utilização de TypeScript;
- compatibilidade com dispositivos móveis;
- otimização de desempenho;
- tratamento de erros;
- testes;
- separação de responsabilidades;
- experiência adequada para operações realizadas em campo.

No contexto do QuimiPort, o mobile poderá futuramente permitir funcionalidades como:

- consulta de cargas;
- acompanhamento de status;
- realização ou apoio às inspeções;
- registro de ocorrências;
- envio ou consulta de documentos;
- consulta de informações operacionais em campo.

## Como frontend, backend e mobile irão se comunicar?

Como as três aplicações estarão em monorepos diferentes, não será utilizada importação direta de código entre os repositórios.

A comunicação acontecerá por contratos definidos entre as aplicações.

```text
Frontend ──────┐
               │
               ▼
            API REST
               ▲
               │
Mobile ────────┘
               │
               ▼
            Backend
```

O backend será responsável por expor contratos que poderão definir:

- endpoints;
- formatos de requisição;
- formatos de resposta;
- códigos de erro;
- regras de autenticação;
- versionamento da API.

Frontend e mobile deverão utilizar esses contratos sem conhecer detalhes internos da implementação do backend.

Caso futuramente exista a necessidade de compartilhar código entre os diferentes monorepos, poderão ser avaliados pacotes versionados e publicados de forma independente.

## Como o projeto poderá evoluir para microsserviços?

Neste momento, o backend permanecerá como um **monólito modular dentro de seu próprio monorepo**.

A utilização de monorepos separados para backend, frontend e mobile não significa que o backend já esteja dividido em microsserviços. São decisões arquiteturais diferentes.

Uma eventual evolução para microsserviços deverá acontecer de forma gradual e somente quando surgirem necessidades concretas, como:

- escalabilidade independente;
- implantação independente;
- autonomia entre diferentes capacidades do sistema;
- necessidades diferentes de disponibilidade;
- aumento significativo da complexidade do domínio.

A decomposição deverá considerar principalmente os **Bounded Contexts** identificados no domínio.

Não será adotada a regra de transformar automaticamente cada entidade ou agregado em um microsserviço.

Contextos que poderão ser avaliados futuramente incluem, por exemplo:

- Gestão de Produtos;
- Gestão de Cargas;
- Documentação;
- Inspeções.

Esses limites deverão ser validados conforme o domínio evoluir.

Quando houver necessidade de maior desacoplamento entre serviços, poderá ser utilizada comunicação assíncrona baseada em eventos.

Cada microsserviço também poderá possuir sua própria persistência, evitando o compartilhamento direto de banco de dados entre serviços.

A decisão de migrar para microsserviços deverá ser baseada em necessidades reais do projeto, evitando adicionar complexidade distribuída sem benefício claro.

## Como o grupo pretende evitar acoplamento excessivo?

O grupo pretende evitar acoplamento excessivo tanto **dentro das aplicações** quanto **entre backend, frontend e mobile**.

No backend, serão utilizados princípios da Clean Architecture e do **Dependency Inversion Principle**.

As camadas internas deverão depender de contratos e abstrações, evitando dependência direta de tecnologias específicas.

Por exemplo, o Domain não deverá depender diretamente de tecnologias como PostgreSQL, MongoDB, Prisma, Express, NestJS ou outro framework específico.

A comunicação com Infrastructure poderá ocorrer por contratos:

```text
Application
     ↓
CargaRepository
     ↑
Infrastructure
     ↓
Implementação concreta do repositório
```

Isso permite que a implementação do repositório ou o banco de dados sejam alterados sem modificar diretamente as regras de negócio.

Também serão adotadas práticas como:

- responsabilidades bem definidas entre módulos;
- contratos e interfaces entre camadas;
- DTOs nas fronteiras da aplicação;
- ausência de acesso direto ao banco de dados fora de Infrastructure;
- entidades sem dependência direta de frameworks;
- módulos com responsabilidades específicas;
- comunicação entre aplicações por contratos públicos.

Entre os diferentes monorepos, a relação será:

```text
quimiport-frontend
        │
        │ API
        ▼
quimiport-backend
        ▲
        │ API
        │
quimiport-mobile
```

Frontend e mobile não terão acesso direto ao banco de dados ou às regras internas do backend.

Da mesma forma, alterações internas na implementação do backend não deverão exigir mudanças nas outras aplicações enquanto os contratos públicos da API forem preservados.

## Direção das dependências

Como princípio geral, as dependências deverão apontar para as camadas mais internas.

O **Domain** será a camada mais independente e não deverá conhecer Interfaces ou Infrastructure.

A Application utilizará os elementos definidos pelo Domain.

Interfaces e Infrastructure ficarão responsáveis por adaptar tecnologias e mecanismos externos às necessidades das camadas internas.

Essa decisão busca garantir que mudanças em banco de dados, frameworks, APIs ou interfaces tenham o menor impacto possível sobre as regras de negócio do QuimiPort.

## Resumo das principais decisões

As principais decisões arquiteturais tomadas nesta fase são:

- utilização inicial de uma arquitetura monolítica modular no backend;
- aplicação dos princípios de DDD, SOLID e Clean Architecture;
- separação entre Domain, Application, Interfaces e Infrastructure;
- concentração das invariantes e regras centrais no Domain;
- utilização dos casos de uso para coordenar os fluxos da aplicação;
- utilização de TypeScript nas diferentes aplicações;
- backend disponibilizando uma API REST;
- monorepo independente para backend;
- monorepo independente para frontend;
- monorepo independente para mobile;
- comunicação entre as aplicações por contratos bem definidos;
- proteção do Domain contra dependências de frameworks e infraestrutura;
- eventual evolução para microsserviços somente mediante necessidade real;
- utilização de Bounded Contexts como referência para uma futura decomposição do backend.
