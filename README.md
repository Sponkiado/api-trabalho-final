# API de Gerenciamento de Tarefas (To-Do List)

**Trabalho Final da Disciplina de Automação de Testes na Camada de Serviço (API)**

API de gerenciamento de tarefas com **REST** e **GraphQL**, desenvolvida com **Node.js + Express**, utilizando **Apollo Server** e **JWT** para autenticação, e documentada com **Swagger**.

--- 

Inclui testes automatizados com **Mocha, Chai, Supertest e Sinon**.
## Pré-requisitos

- Node.js >= 18
- npm
- Git
## 1. Clonar o repositório

Para clonar o repositório e entrar na pasta do projeto:

git clone https://github.com/Sponkiado/api-trabalho-final.git
cd api-trabalho-final
## 2. Instalar dependências

Execute o comando abaixo para instalar todas as dependências do projeto:

npm install

Dependências principais:
- express
- swagger-ui-express
- swagger-jsdoc
- jsonwebtoken
- apollo-server-express
- graphql

Dependências de desenvolvimento:
- mocha
- chai
- supertest
- sinon
## 3. Rodar a API localmente

Para iniciar a API:

node server.js

A API estará disponível em:

- Swagger: http://localhost:4000/api-docs
- GraphQL Playground: http://localhost:4000/graphql

No Swagger, você pode testar os endpoints **register**, **login** e tarefas.  
Para rotas de tarefas, é necessário **informar o token JWT** retornado pelo login no botão "Authorize".
## 4. Rodar os testes

Os testes automatizados estão organizados em **External** (integração) e **Controller** (unitários).

### Executar todos os testes

npm run test

### Executar apenas testes External (REST)

npm run test.external

### Executar apenas testes Controller

npm run test.controller
