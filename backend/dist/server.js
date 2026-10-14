"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../frontend")));
app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running!"
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found"
    });
});
app.listen(3000, "0.0.0.0", () => {
    console.log("Hinterende rennt auf http://localhost:3000.");
});
