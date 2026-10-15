"use strict";
console.log("Hello from backend");
const api = "http://localhost:3000";
let path = "/api/data";
let id = 1;
let categories;
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
    const bookingId = id++;
    const date = new Date();
    const description = "billa";
    const amount = 50;
    const type = Type.EXPENDITURE;
    const categoryId = 5;
    const categoryName = "Food";
    const info = {
        [`bk${bookingId}`]: {
            id: bookingId,
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
/*async function getIdFromServer() {
    const response = await fetch(api + "/api/id");

    const id: number = await response.json();

    return id;
}*/
function addCategoriesFromUser() {
    const radio = document.querySelectorAll('input[name="category"]');
    const container = document.querySelector("#incomeCategories");
    container.innerHTML = "";
    categories.incomeCategories.forEach(category => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "category";
        radio.value = String(category.id);
        const label = document.createElement("label");
        label.append(radio, category.name);
        container.appendChild(label);
    });
}
async function addCategoriesToJson() {
    addCategoriesFromUser();
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
    addCategoriesFromUser();
}
// function getCategoriesFromUser()
async function getJsonFile() {
    const data = await fetch(api + path);
    const response = await data.json();
}
async function init() {
    await getCategoriesFromServer();
    //await addCategoriesToJson();
    await getJsonFile();
    await getBackendMessage();
}
init();
