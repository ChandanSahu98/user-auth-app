const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;

const db = mongoose.createConnection(DB_URL, {
    serverSelectionTimeoutMS: 30000,
    maxPoolSize: 10
});
module.exports = db;
