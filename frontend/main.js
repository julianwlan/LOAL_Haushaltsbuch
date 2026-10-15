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
/* const saveDataBtn: HTMLButtonElement = document.querySelector("#saveDataBtn") as HTMLButtonElement;
saveDataBtn.addEventListener("click", async e => {
    const bookingId = id++;
    const date: Date = new Date();
    const description: string = "billa";
    const amount: number = 50;
    const type: Type = Type.EXPENDITURE;
    const categoryId: number = 5;
    const categoryName: string = "Food";

    const info: Info = {
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
    }
    addBookingToJson(info);
});*/
async function addBookingToJson(info) {
    fetch(api + "/api/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    });
}
function convertCategoriesToRadios(selector) {
    const container = document.querySelector("#radio-div");
    container.innerHTML = "";
    if (selector == "Income") {
        categories.incomeCategories.forEach(category => {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "incomeCategory";
            radio.value = String(category.id);
            const label = document.createElement("label");
            label.append(radio, category.name);
            container.appendChild(label);
        });
    }
    else if (selector == "Expenditure") {
        categories.expenditureCategories.forEach(category => {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "expenditureCategory";
            radio.value = String(category.id);
            const label = document.createElement("label");
            label.append(radio, category.name);
            container.appendChild(label);
        });
    }
}
async function addCategoriesToJson() {
    convertCategoriesToRadios("Income");
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
function addCategory(type) {
    //const categorys: HTML
    if (type === "Income") {
        //categories = categorys.categories.incomeCategories;
    }
    else if (type === "Expenditure") {
        //categories = categorys.categories.expenditureCategories;
    }
}
async function getJsonFile() {
    const data = await fetch(api + path);
    const response = await data.json();
}
async function init() {
    await getCategoriesFromServer();
    convertCategoriesToRadios("Expenditure");
    //await addCategoriesToJson();
    await getJsonFile();
    await getBackendMessage();
}
init();
