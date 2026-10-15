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
const showCategoryInput = document.querySelector("#showCategoryInput");
const categoryInputContainer = document.querySelector("#categoryInputContainer");
const categoryNameInput = document.querySelector("#categoryName");
const addCategoryBtn = document.querySelector("#addCategoryBtn");
const cancelCategoryBtn = document.querySelector("#cancelAddCategoryBtn");
const saveDataBtn = document.querySelector("#saveDataBtn");
showCategoryInput?.addEventListener("click", () => {
    categoryInputContainer.hidden = false;
    categoryNameInput?.focus();
});
cancelCategoryBtn?.addEventListener("click", () => {
    categoryInputContainer.hidden = true;
    if (categoryNameInput) {
        categoryNameInput.value = "";
    }
});
addCategoryBtn?.addEventListener("click", async () => {
    const name = categoryNameInput?.value.trim();
    if (!name) {
        alert("Please enter a category name!");
        return;
    }
    const selectedType = document.querySelector('input[name="categoryType"]:checked');
    if (!selectedType) {
        alert("Please select Income or Expenditure!");
        return;
    }
    await addCategory(selectedType.value);
    categoryInputContainer.hidden = true;
});
saveDataBtn?.addEventListener("click", async (e) => {
    const bookingId = id++;
    const date = new Date(document.querySelector("#date-input").value);
    const description = document.querySelector("#descr-input").value.trim();
    const amount = Number(document.querySelector("#amnt-input").value);
    const type = Type.EXPENDITURE;
    const categoryId = Number(document.querySelector('input[name="expenditureCategory"]:checked').value);
    const categoryName = document.querySelector('input[name="expenditureCategory"]:checked').parentElement.textContent.trim();
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
init();
