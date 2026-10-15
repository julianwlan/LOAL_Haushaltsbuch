console.log("Hello from backend");

const api: string = "http://localhost:3000";
let path: string = "/api/data";
let id: number = 1;

interface Category {
    id: number;
    name: string;
}

interface Categories {
    incomeCategories: Category[];
    expenditureCategories: Category[];
}

let categories: Categories;

enum Type {
    INCOME,
    EXPENDITURE
}

interface Info {
    [key: string]: {
        id: number,
        date: Date,
        description: string,
        amount: number,
        type: Type,
        category: {
            id: number,
            name: string
        }
    }
}

async function getBackendMessage(): Promise<void> {
    try {
        const response = await fetch("/api");

        if (!response.ok) {
            console.log("Error: HTTP Response error");
        }

        const data: { success: boolean; message: string } =
            await response.json();

        console.log(data.message);
    } catch (error) {
        console.error("Fehler beim Abrufen des Backends:", error);
    }
}

const saveDataBtn: HTMLButtonElement = document.querySelector("#saveDataBtn") as HTMLButtonElement;
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
});

async function addBookingToJson(info: Info) {
    fetch(api + "/api/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    });
}

function addCategoriesFromUser(){
    const radio = document.querySelectorAll<HTMLInputElement>('input[name="category"]');

    const container: Element = document.querySelector("#incomeCategories") as Element;

    container.innerHTML = "";

    categories.incomeCategories.forEach(category => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "category";
        radio.value = String(category.id);

        const label : HTMLLabelElement = document.createElement("label");
        label.append(radio, category.name);

        container.appendChild(label);
    });
}

async function addCategoriesToJson(){
    addCategoriesFromUser();
    fetch(api + "/api/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categories)
    });
}

async function getCategoriesFromServer(){
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