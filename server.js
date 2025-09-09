const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { ApolloServer } = require("apollo-server-express");

const app = express();
app.use(express.json());

// Importar rotas REST
const userRoutes = require("./api/rest/routes/userRoutes");
const taskRoutes = require("./api/rest/routes/taskRoutes");
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-Do List API",
      version: "1.0.0",
      description: "API de Gerenciamento de Tarefas com REST e GraphQL",
    },
    servers: [{ url: "http://localhost:4000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./api/rest/routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger na rota /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ApolloServer (GraphQL) – exemplo básico
async function startApollo() {
  const server = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello GraphQL",
      },
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}
startApollo();

// Porta
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
  console.log(`GraphQL Playground: http://localhost:${PORT}/graphql`);
});
