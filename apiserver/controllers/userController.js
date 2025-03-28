// controllers/userController.js

const { connection } = require('../dbHana');
const bcrypt = require('bcryptjs');
const authenticateToken = require('../middlewares/authMiddleware');  // Import the middleware
require('dotenv').config();

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 10;
const BCRYPT_SALT = process.env.BCRYPT_SALT || bcrypt.genSaltSync(BCRYPT_ROUNDS);

// Create a user [CREATE]
async function createUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const checkSql = `SELECT COUNT(*) AS COUNT FROM USERS WHERE EMAIL = ?`;
        const checkResult = await connection.exec(checkSql, [email]);

        if (checkResult[0].COUNT > 0) {
            return res.status(400).json({ message: `User with email ${email} already exists.` });
        }

        // Hash the password using provided salt
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);

        const sql = `INSERT INTO USERS (NAME, EMAIL, PASSWORDHASH, CREATEDAT) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;
        await connection.exec(sql, [name, email, hashedPassword]);

        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all users [READ]
async function getUsers(req, res) {
    try {
        const result = await connection.exec(`SELECT * FROM USERS`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get user by ID
async function getUsersByID(req, res) {
    const { id } = req.params; // Corrected from req.param to req.params

    try {
        const sql = `SELECT * FROM USERS WHERE USERID = ?`;
        const [rows] = await connection.execute(sql, [id]); // Assuming connection.execute() is the correct method
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a user [UPDATE]
async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const sql = `UPDATE USERS SET NAME = ?, EMAIL = ? WHERE USERID = ?`;
        await connection.exec(sql, [name, email, id]);
        res.json({ message: 'User updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a user [DELETE]
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const [result] = await connection.execute(`DELETE FROM USERS WHERE USERID = ?`, [id]);

        // Check if any rows were affected (deleted)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Protect routes with JWT validation (e.g., for deleting or updating a user)
async function protectedRouteExample(req, res) {
    res.json({ message: 'This route is protected', user: req.user });
}

// Export the functions
module.exports = { 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    getUsersByID, 
    protectedRouteExample 
};
