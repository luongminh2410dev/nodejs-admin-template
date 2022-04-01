const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/jwt');

module.exports = function authentication(req, res, next) {
    // Find JWT in Headers
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send("Access denied");
    }
    else {
        // Validate JWT
        const tokenBody = token.slice(7);
        jwt.verify(tokenBody, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send('Error: Access denied');
            }
            // No error, JWT is good!
            next();
        })
    }
}