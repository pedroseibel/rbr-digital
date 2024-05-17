# Dashboard de gerenciamento de funcionários RBR Digital (Teste Full Stack)

Este repositório contém um aplicativo de dashboard administrativo para gerenciar registros de funcionários.

## Como executar

1. Clone o repositório do GitHub.
2. Instale as dependências usando `npm install`.
3. Renomeie o arquivo `.env.example` para `.env` no diretório `server`.
4. Inicie o servidor back-end:
 - Dentro do diretório `server` execute `npm run dev`.
5. Inicie o aplicativo front-end:
 - Navegue até o diretório `client`.
 - Execute `npm run dev`.
6. Acesse a aplicação em `http://localhost:3000`.

## Endpoints

- `GET /api/employees` - Recupera todos os funcionários.
- `GET /api/employees/:id` - Recupera um único funcionário por ID.
- `POST /api/employees` - Cria um novo funcionário.
- `PUT /api/employees/:id` - Atualiza um funcionário por ID.
- `DELETE /api/employees/:id` - Exclui um funcionário por ID.

## Informações adicionais

- O aplicativo usa Chakra UI para estilização e componentes de UI.
- TypeScript.
- MongoDB (Mongoose) é usado como banco de dados.
- O frontend se comunica com o backend por meio de um proxy no Next.js para o Express.js.