import express = require("express");
import path = require("path");
import fs = require("fs");
import {Express} from "express";

let id: number = 1;

const app: Express = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../frontend")));

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running!"
    });
});

app.get("/api/id", (req, res) => {
    res.send(id++);
});

app.post("/api/data", (req, res) => {
    const data = req.body;
    // Gibt den namen vom objekt in data zurück
    const name = Object.keys(data)[0];

    const filePath = path.resolve(__dirname, "data/balance.json");
    const file = fs.readFileSync(filePath, "utf-8");
    const dataFile = JSON.parse(file);

    dataFile.bookings[name] = data[name];

    fs.writeFileSync(filePath, JSON.stringify(dataFile, null, 2));
    console.log(data);
    console.log(fs.readFileSync(path.resolve(__dirname, "data/balance.json"), "utf-8"));
});

app.get("/api/data", (req, res) => {
    res.sendFile(path.resolve(__dirname, "data/balance.json"));
});

app.get("/categories", (req, res) => {

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