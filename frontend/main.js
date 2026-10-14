"use strict";
console.log("Hello from backend");
const incomeCategories = ["Job", "Gift", "Investment", "Other"];
const expenditureCategories = ["Rent", "Food", "Transport", "Hobby", "Abonnement", "Health", "Other"];
console.log(incomeCategories + " " + expenditureCategories);
const api = "http://localhost:3000";
let path = "/income";
async function getBackendMessage() {
    try {
        const response = await fetch("/api");
        if (!response.ok) {
            console.log("Error: HTTP Response error");
        }
        const data = await response.json();
        console.log(data.message);
    }
    catch (error) {
        console.error("Fehler beim Abrufen des Backends:", error);
    }
}
async function getIncome() {
    try {
        const response = await fetch("/income");
    }
    catch (error) {
        console.error("Error when calling backend: ", error);
    }
}
getBackendMessage();
