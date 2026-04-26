// import jwt (used to verify authentication token)
const jwt = require('jsonwebtoken');

// middleware function (runs before protected routes)
const protect = (req, res, next) => {
    // get token from request header. ( header format: "Authorization: Bearer TOKEN")
    const token = req.headers.authorization?.split(" ")[1];

    // if no token then user is not authorized
    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }
    console.log(token);

    try {
        // verify the token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("JWT SECRET (middleware):", process.env.JWT_SECRET);
        // attach decoded user data to request object
        // so it can be used in controllers (req.user.id)
        req.user = decoded;
        // move next
        next();
    } catch (error) {
        // if token is invalid or expired
        res.status(401).json({ message: "Token failed" });
    }
};

// export middleware
module.exports = protect;
