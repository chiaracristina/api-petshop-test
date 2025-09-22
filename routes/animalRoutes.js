import express from 'express';
import { createAnimal, listAnimals } from '../controllers/animalController.js';
import { authenticateToken } from '../auth/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Animal:
 *       type: object
 *       required:
 *         - nome
 *         - especie
 *         - dono
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         especie:
 *           type: string
 *         raca:
 *           type: string
 *         idade:
 *           type: integer
 *         dono:
 *           type: string
 */

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Cadastrar um novo animal
 *     tags: [Animais]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 */
router.post('/', authenticateToken, createAnimal);

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Listar todos os animais cadastrados
 *     tags: [Animais]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de animais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 */
router.get('/', authenticateToken, listAnimals);

export default router;
