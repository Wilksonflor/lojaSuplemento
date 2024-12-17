const express = require("express");
const router = express.Router();
const {
  getMovimentacoes,
  createMovimentacoes,
  updateMovimentacoes,
} = require("../controllers/movimentacoes/movimentacoesController");

router.get("/movimentacoes", getMovimentacoes);
router.post("/movimentacoes", createMovimentacoes);
router.put("/movimentacoes/:id", updateMovimentacoes);
// router.delete('/movimentacoes/:id', getMovimentacoes)

module.exports = router;
