# 9. Aplicação de JavaScript Avançado e TypeScript

A implementação futura do QuimiPort utilizará **TypeScript** como principal linguagem nas aplicações da solução, aproveitando o ecossistema JavaScript e adicionando verificação estática de tipos, contratos explícitos e recursos que auxiliam na manutenção e evolução do código.

Backend, frontend e mobile serão aplicações independentes e cada uma será organizada em **seu próprio monorepo**. Portanto, o compartilhamento entre essas aplicações acontecerá por contratos bem definidos, e não por importação direta de código entre os repositórios.

## 9.1 Uso de tipagem

O uso de TypeScript permite identificar, ainda durante o desenvolvimento, diversos erros relacionados a tipos que poderiam aparecer somente durante a execução em JavaScript.

Entre os benefícios considerados pelo grupo estão:

- redução de erros relacionados a tipos antes da execução;
- maior clareza sobre os dados esperados e retornados por funções;
- maior segurança durante refatorações;
- melhor suporte de autocomplete e IntelliSense em IDEs;
- melhor compreensão do código em projetos desenvolvidos por várias pessoas;
- apoio na revisão de código, inclusive quando parte dele for auxiliada por ferramentas de IA.

Como TypeScript é um superset de JavaScript, o conhecimento da linguagem pode ser aproveitado nas diferentes aplicações da solução, como backend, frontend e mobile.

> A tipagem reduz uma classe importante de erros em tempo de desenvolvimento, mas não substitui validações de entrada, tratamento de exceções ou testes.

## 9.2 Uso de interfaces e tipos

Interfaces e `types` serão utilizados para definir contratos de dados e tornar explícitas as dependências entre diferentes partes da aplicação.

Alguns usos previstos são:

- DTOs de entrada e saída;
- contratos utilizados pelos casos de uso;
- abstrações de repositórios e serviços;
- formatos de respostas;
- contratos utilizados na comunicação com APIs.

No backend, interfaces também poderão apoiar o **Dependency Inversion Principle (DIP)**, permitindo que as camadas internas dependam de abstrações em vez de implementações concretas.

Exemplo conceitual:

```ts
export interface CargaRepository {
  buscarPorId(id: string): Promise<CargaQuimica | null>;
  salvar(carga: CargaQuimica): Promise<void>;
}
```

A implementação concreta poderá permanecer em `Infrastructure`, sem criar dependência do domínio em uma tecnologia específica de persistência.

Interfaces também podem ser estendidas quando houver uma relação conceitual clara entre os contratos, evitando duplicação desnecessária.

## 9.3 Uso de classes, quando fizer sentido

Classes poderão ser utilizadas principalmente quando houver **identidade, comportamento, encapsulamento ou invariantes** que precisem ser protegidas.

No QuimiPort, esse uso poderá fazer sentido em:

- entidades;
- agregados;
- determinados Objetos de Valor;
- erros de domínio.

Classes também permitem controlar acesso por meio de modificadores como `private` e `protected`, quando necessário.

A injeção de dependências por construtor também poderá tornar dependências explícitas e substituíveis nas camadas em que esse padrão for necessário.

Entretanto, classes não serão utilizadas apenas por padronização. Para estruturas simples de dados, DTOs e contratos sem comportamento, poderão ser utilizados `interfaces` ou `types`.

## 9.4 Uso de enums para status e classificações

Enums ou tipos equivalentes poderão limitar o conjunto de valores aceitos para determinados conceitos do domínio, evitando a utilização de strings arbitrárias.

Para o status da carga, a enumeração deverá acompanhar a **versão final da máquina de estados definida pelo grupo**.

Com os estados já consolidados na modelagem atual, um exemplo seria:

```ts
export enum StatusCarga {
  PENDENTE_DOCUMENTACAO = "PENDENTE_DOCUMENTACAO",
  EM_INSPECAO = "EM_INSPECAO",
  LIBERADA = "LIBERADA",
  BLOQUEADA = "BLOQUEADA",
  CANCELADA = "CANCELADA"
}
```

Outros conceitos candidatos são:

```ts
export enum StatusProduto {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO"
}
```

Também poderão existir enumerações para tipos de documento, status de validação documental e classificações quando houver um conjunto fechado de valores.

> Caso o fluxo de status da carga seja ampliado antes da entrega, `StatusCarga` deverá ser atualizado para refletir exatamente o diagrama final.

## 9.5 Uso de funções puras para validações

Sempre que uma regra puder ser expressa sem dependência de estado externo, funções puras poderão ser utilizadas.

Esse tipo de função:

- depende somente dos parâmetros recebidos;
- não modifica estado global;
- produz resultados previsíveis;
- facilita testes unitários.

Um exemplo possível no domínio do QuimiPort é a validação de compatibilidade entre uma classe de risco e uma área de armazenamento.

```ts
function areaCompativel(
  classeRisco: ClasseRisco,
  classesPermitidas: ClasseRisco[]
): boolean {
  return classesPermitidas.includes(classeRisco);
}
```

Nem toda regra do domínio precisa necessariamente ser uma função pura. Regras que dependem do estado de uma entidade ou agregado podem permanecer encapsuladas nesses objetos.

## 9.6 Uso de módulos ES6+

A aplicação utilizará o sistema de módulos ES6+, com `import` e `export`, para organizar responsabilidades e controlar o que é exposto por cada módulo.

Benefícios esperados:

- encapsulamento;
- melhor organização;
- menor acoplamento;
- maior testabilidade;
- possibilidade de tree shaking nas aplicações em que houver processo de bundle.

A organização dos módulos deverá respeitar a arquitetura definida para cada aplicação, evitando que módulos externos acessem diretamente detalhes internos de outras camadas.

## 9.7 Uso de async/await em integrações futuras

Operações assíncronas serão necessárias principalmente em:

- acesso a banco de dados;
- consumo de APIs;
- leitura ou envio de arquivos;
- integrações com serviços externos.

O uso de `async/await` será priorizado por tornar fluxos assíncronos mais legíveis e facilitar o tratamento explícito de falhas.

Exemplo:

```ts
try {
  const carga = await cargaRepository.buscarPorId(cargaId);
  return carga;
} catch (error) {
  // tratamento adequado conforme a camada
}
```

No frontend e no mobile, bibliotecas específicas poderão abstrair parte dessas operações, como ferramentas de consulta e mutação de dados. A decisão sobre bibliotecas será tomada na fase de implementação.

## 9.8 Uso de generics, quando aplicável

Generics serão utilizados quando permitirem criar estruturas reutilizáveis sem perder informação de tipo e sem recorrer desnecessariamente a `any`.

Um exemplo é a padronização de respostas:

```ts
export interface ApiResponse<T> {
  success: boolean;
  timestamp: string;
  data: T;
  errors?: string[];
}
```

Dessa forma, cada operação poderá definir o tipo específico de `data`.

Generics também poderão ser utilizados em resultados paginados, contratos reutilizáveis e outras estruturas em que exista uma necessidade real de generalização.

## 9.9 Tratamento de erros

A aplicação deverá diferenciar erros de negócio, erros de aplicação e falhas de infraestrutura.

No domínio, poderão ser definidos **Domain Errors** com significado explícito.

Exemplo:

```ts
export class CargaBloqueadaError extends Error {
  constructor() {
    super("Carga bloqueada não pode ser movimentada.");
    this.name = "CargaBloqueadaError";
  }
}
```

Na camada de interface do backend, erros conhecidos poderão ser convertidos em respostas HTTP adequadas, por exemplo:

- `400 Bad Request` para entradas ou operações inválidas;
- `404 Not Found` para recursos inexistentes;
- outros códigos conforme o contrato definido pela API.

Falhas de infraestrutura devem ser tratadas sem expor detalhes internos da aplicação ao cliente.

Logs poderão registrar informações úteis para diagnóstico e auditoria, respeitando a necessidade de não registrar dados sensíveis de forma indevida.

## 9.10 Organização de contratos e tipos compartilhados

A estratégia definida pelo grupo prevê **monorepos independentes**:

```text
quimiport-backend/
quimiport-frontend/
quimiport-mobile/
```

Cada monorepo poderá possuir internamente seus próprios módulos ou pacotes compartilhados, mas frontend, backend e mobile **não importarão diretamente código uns dos outros**.

A comunicação entre as aplicações ocorrerá por contratos públicos, principalmente pela API do backend.

Esses contratos deverão definir, por exemplo:

- endpoints;
- payloads de entrada;
- formatos de resposta;
- códigos de erro;
- autenticação;
- versionamento da API.

De forma conceitual:

```text
Frontend ────┐
             │
             ▼
          API REST
             ▲
             │
Mobile ──────┘
             │
             ▼
          Backend
```

Para evitar divergência entre contratos, o grupo poderá utilizar documentação de API, como uma especificação OpenAPI, e futuramente avaliar a publicação de pacotes versionados de contratos quando houver benefício real.

A pasta `shared/`, quando utilizada dentro de um dos monorepos, deverá conter apenas elementos realmente compartilháveis **dentro daquele projeto**, evitando que se transforme em uma pasta genérica para código sem responsabilidade definida.

Essa estratégia preserva a independência de backend, frontend e mobile, permitindo que cada aplicação tenha dependências, versionamento, pipeline e implantação próprios.
