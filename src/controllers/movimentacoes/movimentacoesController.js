const client = require("../../models/db");

const createMovimentacoes = async (req, res) => {
  const { tipo, quantidade, data_movimentacao } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO movimentacoes (produto_id,tipo, quantidade, data_movimentacao) VALUES ($1,$2,$3,$4) RETURNING *",
      [produto_id, tipo, quantidade, data_movimentacao]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Erro ao listar as movimentações");
    res
      .status(500)
      .json({ error: "Erro no servidor ao listar as movimentaçoes" });
  }
};

const getMovimentacoes = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM movimentacoes");
    res.status(result.rows);
    console.log("resultado:", result);
  } catch (error) {
    console.log("Erro ao resgatar as movimentações");
    res.status(500).json({ error: "Erro ao resgatar as movimentações" });
  }
};
module.exports = { getMovimentacoes, createMovimentacoes };
