const express = require("express");
const {
  getMovimentacoes,
  createMovimentacao,
} = require("../controllers/movimentacoes/movimentacoesController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movimentações
 *   description: Gerenciamento de movimentações
 */

/**
 * @swagger
 * /api/movimentacoes:
 *   get:
 *     summary: Lista todas as movimentações
 *     tags: [Movimentações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimentações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   usuario_id:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   criado_em:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /api/movimentacoes:
 *   post:
 *     summary: Cria uma nova movimentação
 *     tags: [Movimentações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: string
 *               tipo:
 *                 type: string
 *               produtos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produto_id:
 *                       type: string
 *                     quantidade:
 *                       type: number
 *             example:
 *               usuario_id: "12345"
 *               tipo: "entrada"
 *               produtos:
 *                 - produto_id: "67890"
 *                   quantidade: 5
 *     responses:
 *       201:
 *         description: Movimentação criada com sucesso
 */

router.get("/", authMiddleware, getMovimentacoes);
router.post("/", authMiddleware, createMovimentacao);

module.exports = router;
