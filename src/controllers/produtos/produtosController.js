const client = require("../../models/db");

const getProdutos = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM produtos");
    res.json(result.rows);
  } catch (error) {
    console.log("Erro ao buscar produtos", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

const createProduto = async (req, res) => {
  const { nome, descricao, preco } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO produtos (nome, descricao, preco) VALUES ($1,$2,$3) RETURNING *",
      [nome, descricao, preco]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Erro ao criar produto", error);
    res.status(500).json({ error: "Erro no servidor ao criar produto" });
  }
};

const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;

  try {
    const result = await client.query(
      "UPDATE produtos SET nome = $1, descricao = $2, preco = $3,data_atualizacao = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *"[
        (nome, descricao, preco, id)
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    }
    res.status(200).json(result.rows[0]); //retorna o preço atualizado
  } catch (error) {
    console.log("erro ao atualziar o produto", error);
    res.status(500).json({ error: "Erro no servidor ao atualizar o produto" });
  }
};

const deletProduto = async (req, res) => {
  const { id } = req.params; //o ID do produto será passado como parametros na url

  try {
    const result = await client.query(
      "DELETE FROM produtos WHERE id = $1 RETURNING *"[id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    }
    res.status(200).json({message: "Produto deletado com sucesso!"})
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
};

module.exports = { getProdutos, createProduto, updateProduto, deletProduto };
