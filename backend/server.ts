import express = require("express");
import {Express} from "express";

const app: Express = express();
app.use(express.json());

app.use(express.static("../frontend"));

app.get("/", (req, res) => {
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