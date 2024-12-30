const jwt = require("jsonwebtoken");

// Lista para armazenar tokens revogados
const revokedTokens = [];

 //Verifica se o token JWT fornecido é válido e não foi revogado.
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  // Verifica se o token foi fornecido
  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
  }

  // Verifica se o token está na lista de revogados
  if (revokedTokens.includes(token)) {
    return res.status(401).json({ error: "Token inválido ou revogado." });
  }

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona as informações do usuário decodificadas ao objeto `req`
    req.user = decoded;

    // Permite o acesso ao próximo middleware ou rota
    next();
  } catch (error) {
    // Lida com erros relacionados ao token
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

/**
 * Função para revogar tokens.
 * Adiciona o token à lista de tokens revogados.
 */
const logoutUsuario = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "Token não fornecido." });
  }

  try {
    revokedTokens.push(token); // Adiciona o token à lista de revogados
    res.status(200).json({ message: "Logout bem-sucedido." });
  } catch (error) {
    console.error("Erro ao revogar o token:", error);
    res.status(500).json({ error: "Erro no servidor ao fazer logout." });
  }
};

module.exports = { authMiddleware, revokedTokens, logoutUsuario };
