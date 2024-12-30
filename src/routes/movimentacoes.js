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
 */
router.get("/", authMiddleware, getMovimentacoes);

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
 *     responses:
 *       201:
 *         description: Movimentação criada com sucesso
 */
router.post("/", authMiddleware, createMovimentacao);

module.exports = router;
