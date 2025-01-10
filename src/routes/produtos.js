const express = require("express");
const {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} = require("../controllers/produtos/produtosController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   preco:
 *                     type: number
 *                   quantidade:
 *                     type: number
 *                   categoria:
 *                     type: string
 *                   ativo:
 *                     type: boolean
 *                   criado_em:
 *                     type: string
 *                     format: date-time
 *                   atualizado_em:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               quantidade:
 *                 type: number
 *               categoria:
 *                 type: string
 *               ativo:
 *                 type: boolean
 *             example:
 *               nome: "Produto A"
 *               descricao: "Descrição do produto"
 *               preco: 25.5
 *               quantidade: 10
 *               categoria: "Suplementos"
 *               ativo: true
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               quantidade:
 *                 type: number
 *               categoria:
 *                 type: string
 *               ativo:
 *                 type: boolean
 *             example:
 *               nome: "Produto Atualizado"
 *               descricao: "Descrição atualizada"
 *               preco: 30.0
 *               quantidade: 15
 *               categoria: "Vitaminas"
 *               ativo: true
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 */

router.get("/", authMiddleware, getProdutos);
router.post("/", authMiddleware, createProduto);
router.put("/:id", authMiddleware, updateProduto);
router.delete("/:id", authMiddleware, deleteProduto);

module.exports = router;
