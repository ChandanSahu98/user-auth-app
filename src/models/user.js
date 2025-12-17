const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            default: uuidv4,
            unique: true
        },
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true }
    },
    { timestamps: true, versionKey: false }
);

// Password hashing before save.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = db.model("user", userSchema);
