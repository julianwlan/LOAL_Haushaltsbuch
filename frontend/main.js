"use strict";
console.log("Hello from backend");
const incomeCategories = ["Job", "Gift", "Investment", "Other"];
const expenditureCategories = ["Rent", "Food", "Transport", "Hobby", "Abonnement", "Health", "Other"];
const api = "http://localhost:3000";
let path = "/api/data";
var type;
(function (type) {
    type[type["INCOME"] = 0] = "INCOME";
    type[type["EXPENDITURE"] = 1] = "EXPENDITURE";
})(type || (type = {}));
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
const saveDataBtn = document.querySelector("#saveDataBtn");
/*saveDataBtn.addEventListener("click", e => {
    addBookingToJson();
});*/
async function addBookingToJson() {
    const id = await getIdFromServer();
    const info = {
        [`bk${id}`]: {
            id: id,
            date: "01.01.2001",
            description: "billa",
            amount: 50,
            type: "EXPENDITURE",
            category: {
                id: 2,
                name: "drinks"
            }
        }
    };
    fetch(api + "/api/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    });
}
async function getIdFromServer() {
    const response = await fetch(api + "/api/id");
    const id = await response.json();
    return id;
}
async function getJsonFile() {
    const data = await fetch(api + path);
    const response = await data.json();
    console.log(response);
}
getJsonFile();
addBookingToJson();
getBackendMessage();
