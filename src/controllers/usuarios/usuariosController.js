const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client = require("../../models/db");

const createUsuario = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  try {
    const existingAdmins = await client.query(
      "SELECT * FROM usuarios WHERE role = 'admin'"
    );
    const isInitialSetup = existingAdmins.rows.length === 0;

    if (isInitialSetup) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(senha, salt);

      const result = await client.query(
        "INSERT INTO usuarios (nome, email, senha, role) VALUES ($1, $2, $3, $4) RETURNING *",
        [nome, email, hashedPassword, "admin"]
      );

      return res.status(201).json({
        message: "Primeiro administrador criado com sucesso!",
        usuario: result.rows[0],
      });
    }

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        error: "Acesso negado. Apenas administradores podem criar usuários.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const result = await client.query(
      "INSERT INTO usuarios (nome, email, senha, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, email, hashedPassword, role || "user"]
    );

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      usuario: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro no servidor ao criar usuário." });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const result = await client.query(
      "SELECT id, nome, email, role, ativo FROM usuarios"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ error: "Erro no servidor ao listar usuários." });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await client.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const usuario = result.rows[0];
    const isMatch = await bcrypt.compare(senha, usuario.senha);

    if (!isMatch) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

const logoutUsuario = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "Token não fornecido." });
  }

  try {
    revokedTokens.push(token);
    res.status(200).json({ message: "Logout bem-sucedido." });
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    res.status(500).json({ error: "Erro no servidor ao fazer logout." });
  }
};

const deleteUsuarios = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro no servidor ao deletar usuário." });
  }
};

module.exports = {
  createUsuario,
  loginUsuario,
  logoutUsuario,
  deleteUsuarios,
  getUsuarios,
};
