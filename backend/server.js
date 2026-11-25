"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const fs = require("fs");
const bookingRepo = __importStar(require("./repo/bookingRepo"));
const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../frontend")));
app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running!"
    });
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
    res.status(201).json({ success: true, message: "Booking gespeichert" });
});
app.get("/api/data", (req, res) => {
    res.sendFile(path.resolve(__dirname, "data/balance.json"));
});
app.get("/api/data/length", (req, res) => {
    res.json({ message: bookingRepo.getLength() });
});
app.get("/api/data/:amount", (req, res) => {
    const amount = parseInt(req.params.amount);
    const bookings = bookingRepo.getBookingsAmount(amount);
    return res.json(bookings);
});
app.post("/api/categories", (req, res) => {
    const data = req.body;
    const filePath = path.resolve(__dirname, "data/categories.json");
    const file = fs.readFileSync(filePath, "utf-8");
    const dataFile = JSON.parse(file);
    if (data.incomeCategories != undefined) {
        for (const category of data.incomeCategories) {
            const incomeExists = dataFile.categories.incomeCategories
                .some((c) => c.id === category.id);
            if (!incomeExists) {
                dataFile.categories.incomeCategories.push(category);
            }
        }
    }
    if (data.expenditureCategories != undefined) {
        for (const category of data.expenditureCategories) {
            const expenditureExists = dataFile.categories.expenditureCategories
                .some((c) => c.id === category.id);
            if (!expenditureExists) {
                dataFile.categories.expenditureCategories.push(category);
            }
        }
    }
    fs.writeFileSync(filePath, JSON.stringify(dataFile, null, 2));
});
app.get("/api/categories", (req, res) => {
    res.sendFile(path.resolve(__dirname, "data/categories.json"));
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});
app.get("/analysis", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "analysis.html"));
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
