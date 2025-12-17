const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/AuthRoutes");
const authMiddleware = require("./middlewares/AuthMiddleware");
const errorMiddleware = require("./middlewares/ErrorMiddleware");
const cors = require("cors");
const app = express();

// 1. Set Security HTTP Headers (Helps prevent XSS)
app.use(helmet());

// 2. Body Parser (Reading data from body into req.body)
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3001', 
    credentials: true
}))

// Routes
app.use("/", (req, res) => {
    res.status(200).json({
        Text: "Hello World!"
    })
})
app.use("/api/v1/auth", authRoutes);

// Protected Route Example
app.get("/api/protected", authMiddleware.verify, (req, res) => {
    console.log(req.url)
    res.json({ message: "You have access to this protected route" });
});

// Catch-all for undefined routes
app.use((req, res, next) => {
    const err = new Error(`Can't find on ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    err.status = "fail";
    next(err);
});

// Global Error Handler
app.use(errorMiddleware);



module.exports = app;
