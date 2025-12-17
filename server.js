const app = require("./src/app");
const db = require("./src/config/database");
const http = require("http");
require("dotenv").config();

const server = http.createServer(app);
db.on("connected", () => {
    console.log("Connect to DB");
    server.listen(process.env.PORT, () => {
        console.log(`Server started listening on PORT: ${process.env.PORT}`);
    });
});

db.on("disconnected", () => {
    console.log(`DB disconnected from MongoDB`);
});

db.on("error", (err) => {
    console.error("Failed to connect to DB", err);
});
