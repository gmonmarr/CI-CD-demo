// routes/userRoutes.js

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, getUsersByID } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');  // Import the JWT validation middleware

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # JWT token required
 *     responses:
 *       200:
 *         description: Returns all users
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Server error
 */
router.get('/', authenticateToken, getUsers);  // Auth required

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # JWT token required
 *     responses:
 *       200:
 *         description: Returns a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 USERID:
 *                   type: integer
 *                   description: The user ID
 *                 NAME:
 *                   type: string
 *                   description: The user's full name
 *                 EMAIL:
 *                   type: string
 *                   description: The user's email address
 *                 PASSWORDHASH:
 *                   type: string
 *                   description: The hashed password of the user
 *                 LASTLOGIN:
 *                   type: string
 *                   format: date-time
 *                   description: The last login timestamp of the user
 *                 CREATEDAT:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was created
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticateToken, getUsersByID);  // Auth required

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *               password:
 *                 type: string
 *                 example: jane123
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: General error
 */
router.post('/', createUser);  // No Auth required

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: janenew@example.com
 *               password:
 *                 type: string
 *                 example: jane234
 *     security:
 *       - bearerAuth: []  # JWT token required
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.put('/:id', authenticateToken, updateUser);  // Auth required

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     security:
 *       - bearerAuth: []  # JWT token required
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: User not found
 */
router.delete('/:id', authenticateToken, deleteUser);  // Auth required

module.exports = router;
