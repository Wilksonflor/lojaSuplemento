const express = require("express");
const cors = require("cors");
const produtosRoutes = require("./src/routes/produtos");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota para a raiz
app.get("/", (req, res) => {
  res.send("API funcionando! Acesse /api para as rotas de produtos.");
});

// Roteamento para produtos
app.use("/api", produtosRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
