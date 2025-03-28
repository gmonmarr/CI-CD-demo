// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT token validation middleware
function authenticateToken(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to the request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = authenticateToken;
