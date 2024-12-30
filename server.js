const express = require("express");
const cors = require("cors");
const produtosRoutes = require("./src/routes/produtos");
const movimentacoesRoutes = require("./src/routes/movimentacoes");
const usuariosRoutes = require("./src/routes/usuarios");
const { swaggerDocs, swaggerUi } = require("./swagger");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota para a raiz
app.get("/", (req, res) => {
  res.send("API funcionando! Acesse /api-docs para a documentação.");
});

// Roteamento para produtos e movimentações
app.use("/api/produtos", produtosRoutes);
app.use("/api/movimentacoes", movimentacoesRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
