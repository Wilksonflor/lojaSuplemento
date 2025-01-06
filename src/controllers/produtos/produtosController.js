const client = require("../../models/db");

const getProdutos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const result = await client.query(
      "SELECT * FROM produtos LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    console.log("Produtos:", result);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Erro ao buscar produtos", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

const createProduto = async (req, res) => {
  const { nome, descricao, preco, categoria, quantidade = 0 } = req.body;
  // console.log("req.body", req.body);
  try {
    const result = await client.query(
      "INSERT INTO produtos (nome, descricao, preco, categoria, quantidade) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, descricao, preco, categoria || "Sem categoria", quantidade]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro no servidor ao criar produto" });
  }
};

const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, categoria } = req.body;

  try {
    const result = await client.query(
      "UPDATE produtos SET nome = $1, descricao = $2, categoria = $3, preco = $4, data_atualizacao = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *",
      [nome, descricao, categoria, preco, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Erro ao atualizar o produto", error);
    res.status(500).json({ error: "Erro no servidor ao atualizar o produto" });
  }
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID do produto não fornecido." });
  }

  try {
    const result = await client.query(
      "DELETE FROM produtos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro no servidor ao deletar produto" });
  }
};

module.exports = { getProdutos, createProduto, updateProduto, deleteProduto };
