const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = data

    next();
}

module.exports = fetchUser