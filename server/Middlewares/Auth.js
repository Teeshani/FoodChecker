const jwt = require('jsonwebtoken');

// Middleware to ensure the user is authenticated with a valid JWT token
const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;  // Attach decoded user data to the request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
};

module.exports = ensureAuthenticated;
