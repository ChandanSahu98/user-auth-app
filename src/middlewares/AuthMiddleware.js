const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
    const token = req.cookies.token;
    if (!token || token === "none") {
        return res
            .status(401)
            .json({ message: "Session expired or logged out. Please login again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ message: "Your session has expired. Please log in again." });
        }
        res.status(401).json({ message: "Invalid token." });
    }
};
