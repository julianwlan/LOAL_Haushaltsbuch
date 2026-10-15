"use strict";
console.log("Hello from backend");
let categories;
const api = "http://localhost:3000";
let path = "/api/data";
var Type;
(function (Type) {
    Type[Type["INCOME"] = 0] = "INCOME";
    Type[Type["EXPENDITURE"] = 1] = "EXPENDITURE";
})(Type || (Type = {}));
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
saveDataBtn.addEventListener("click", async (e) => {
    const id = await getIdFromServer();
    const date = new Date();
    const description = "billa";
    const amount = 50;
    const type = Type.EXPENDITURE;
    const categoryId = 5;
    const categoryName = "Food";
    const info = {
        [`bk${id}`]: {
            id: id,
            date: date,
            description: description,
            amount: amount,
            type: type,
            category: {
                id: categoryId,
                name: categoryName
            }
        }
    };
    addBookingToJson(info);
});
async function addBookingToJson(info) {
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
async function addCategoriesToJson() {
    fetch(api + "/api/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categories)
    });
}
async function getCategoriesFromServer() {
    const response = await fetch(api + "/api/categories");
    const data = await response.json();
    categories = data.categories;
}
// function getCategoriesFromUser()
async function getJsonFile() {
    const data = await fetch(api + path);
    const response = await data.json();
    console.log(response);
}
getCategoriesFromServer();
//addCategoriesToJson();
getJsonFile();
getBackendMessage();
