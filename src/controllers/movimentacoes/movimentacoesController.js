const client = require("../../models/db");

const createMovimentacao = async (req, res) => {
  const { usuario_id, tipo, produtos } = req.body;

  if (
    !usuario_id ||
    !tipo ||
    !Array.isArray(produtos) ||
    produtos.length === 0
  ) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    await client.query("BEGIN");

    // Insere a movimentação
    const result = await client.query(
      "INSERT INTO movimentacoes (usuario_id, tipo) VALUES ($1, $2) RETURNING *",
      [usuario_id, tipo]
    );

    const movimentacaoId = result.rows[0].id;

    // Insere os produtos relacionados
    for (const produto of produtos) {
      const { produto_id, quantidade } = produto;
      await client.query(
        "INSERT INTO movimentacao_produtos (movimentacao_id, produto_id, quantidade) VALUES ($1, $2, $3)",
        [movimentacaoId, produto_id, quantidade]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "Movimentação criada com sucesso!" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao criar movimentação:", error);
    res.status(500).json({ error: "Erro no servidor ao criar movimentação" });
  }
};

const getMovimentacoes = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM movimentacoes");
    res.status(200).json(result.rows);
    console.log("resultado:", result);
  } catch (error) {
    console.log("Erro ao resgatar as movimentações");
    res.status(500).json({ error: "Erro ao resgatar as movimentações" });
  }
};
module.exports = { getMovimentacoes, createMovimentacao };
