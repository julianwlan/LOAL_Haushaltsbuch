import express = require("express");
import path = require("path");
import fs = require("fs");
import {Express} from "express";
import type {Request, Response} from "express";
import * as bookingRepo from "./repo/bookingRepo";
import type {Booking, BookingDto, BookingEntry} from "./models/booking";

const app: Express = express();
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

    res.status(201).json({success: true, message: "Booking gespeichert"});
});

app.get("/api/data", (req, res) => {
    res.sendFile(path.resolve(__dirname, "data/balance.json"));
});

app.get("/api/data/length", (req: Request, res: Response) => {
    res.json({message: bookingRepo.getLength()});
});

app.get("/api/data/:amount", (req: Request, res: Response) => {
    const amount: number = parseInt(req.params.amount as string);

    const bookings: BookingEntry[] = bookingRepo.getBookingsAmount(amount);

    return res.json(bookings);
});

app.post("/api/categories", (req, res) => {
    const  data = req.body;

    const filePath = path.resolve(__dirname, "data/categories.json");
    const file = fs.readFileSync(filePath, "utf-8");
    const dataFile = JSON.parse(file);

    if(data.incomeCategories != undefined) {
        for (const category of data.incomeCategories) {
            const incomeExists: boolean = dataFile.categories.incomeCategories
                .some((c: any) => c.id === category.id);

            if (!incomeExists) {
                dataFile.categories.incomeCategories.push(category);
            }
        }
    }

    if(data.expenditureCategories!= undefined) {
        for (const category of data.expenditureCategories) {
            const expenditureExists: boolean = dataFile.categories.expenditureCategories
                .some((c: any) => c.id === category.id);

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