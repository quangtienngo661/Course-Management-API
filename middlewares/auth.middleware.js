const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = (req, res, next) => {
    const bearer = req.headers.authorization;
    console.log(bearer)
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    const token = bearer.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            msg: "Error verifying token", 
            error: error.message
        })
    }
}

module.exports = auth;