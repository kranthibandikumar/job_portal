const jwt = require("jsonwebtoken")
require("dotenv").config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const AuthMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided" })
    }

    try {
        jwt.verify(token, JWT_SECRET_KEY, function (err, decoded) {
    
            if (err) {
                return res.status(403).json({ message: "Restricted access" })
            }
    
            req.user = decoded
            next()
    
        });
    } catch (error) {
        res.status(400).json({message:"Invalid token"});
    }
};

module.exports = AuthMiddleware