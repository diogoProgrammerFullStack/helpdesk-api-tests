# 🚀 API Test Automation - Cypress

Projeto desenvolvido para automação de testes da API de **Users** e **Tickets**, utilizando **Cypress** com foco em:

- ✅ Testes de funcionalidades (CRUD)
- ✅ Testes negativos (validações de erros)
- ✅ Validação de contrato (Schema Validation) com AJV

---

## ⚙️ Tecnologias utilizadas

- ✅ [Cypress](https://www.cypress.io/) - Framework de automação de testes
- ✅ [AJV](https://ajv.js.org/) - Validação de schemas JSON
- ✅ [Faker.js](https://fakerjs.dev/) - Geração de dados dinâmicos
- ✅ Node.js (NPM)

---

## 🚀 Como executar os testes
🔧 Pré-requisitos

✅ Node.js (versão 16 ou superior)

✅ NPM ou Yarn instalado

✅ Clonar este repositório

## 🔥 Instalação das dependências
Execute no terminal:
```
npm install
```
---
▶️ Executar os testes no terminal (modo headless)
```
npx cypress run
```
---
▶️ Executar os testes com interface gráfica (modo interativo)
```
npx cypress open
```
Selecione os arquivos de teste desejados, como:

- /e2e/users.cy.js

- /e2e/tickets.cy.js

---
# ✅ Funcionalidades cobertas nos testes
🧑‍💻 Users

🔹 Criação de usuários

🔹 Busca de usuário por ID

🔹 Atualização de usuários

🔹 Exclusão de usuários

🔹 Testes negativos:
---
🔹 ID inexistente ou vazio

🔹 Campos obrigatórios ausentes

🔹 Dados duplicados

---
🎫 Tickets

🔹 Criação de tickets

🔹 Busca de ticket por ID

🔹 Atualização de status do ticket

🔹 Exclusão de tickets

---
🔹 Testes negativos:

🔹 ID inexistente ou vazio

🔹 Campos obrigatórios ausentes

Schema
---
🔹 Validação de contrato (schema)

📑 Validação de Contrato (Schemas)
---
As respostas da API são validadas contra schemas JSON localizados na pasta: 
```
/cypress/support/schemas
```
✔️ Schemas disponíveis:

- ✅ userSchema.json — Schema de usuário

- ✅ ticketSchema.json — Schema de ticket

- ✅ successMessageSchema.json — Schema para mensagens de sucesso (PUT, DELETE)

- ✅ errorSchema.json — Schema para mensagens de erro (404, 400)

---

## 💡 Sugestões de melhorias para a API

🔧 Validação de tipos de dados:
Atualmente permite enviar name: 123 ou email: true. A API deveria validar tipo dos campos e retornar 400 Bad Request.

🔧 Documentação da API:
Sugere-se a inclusão de Swagger, Postman Collection ou README com exemplos de requisições.

## 🚀 Melhorias futuras na automação
- 🚀 Execução em paralelo para ganho de performance
- 🚀 Testes de performance (K6, JMeter, Gatling)
- 🚀 Testes de autenticação e autorização, se aplicável

## 🧑‍💻 Autor
- Diogo Oliveira
