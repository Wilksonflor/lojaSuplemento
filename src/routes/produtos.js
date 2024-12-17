const express = require("express");
const router = express.Router();
const {
  getProdutos,
  createProduto,
  updateProduto,
  deletProduto,
} = require("../controllers/produtos/produtosController");



router.get("/produtos", getProdutos);
router.post("/produto", createProduto);
router.put("/produto/:id", updateProduto);
router.delete("/produto/:id", deletProduto);




module.exports = router;
