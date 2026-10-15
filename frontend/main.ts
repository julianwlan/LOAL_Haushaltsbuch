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

async function addBookingToJson(info: Info) {
    fetch(api + "/api/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    });
}

function convertCategoriesToRadios(selector: string){
    const container: HTMLDivElement = document.querySelector("#radio-div") as HTMLDivElement;
    container.innerHTML = "";

    if(selector == "Income") {
        categories.incomeCategories.forEach(category => {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "incomeCategory";
            radio.value = String(category.id);

            const label: HTMLLabelElement = document.createElement("label");
            label.append(radio, category.name);

            container.appendChild(label);
        });
    } else if(selector == "Expenditure"){

        categories.expenditureCategories.forEach(category => {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "expenditureCategory";
            radio.value = String(category.id);

            const label: HTMLLabelElement = document.createElement("label");
            label.append(radio, category.name);

            container.appendChild(label);
    });
    }
}

async function addCategoriesToJson(){
    convertCategoriesToRadios("Income");
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
}

function addCategory(type: string) {
    //const categorys: HTML
    if (type === "Income") {
        //categories = categorys.categories.incomeCategories;
    } else if (type === "Expenditure") {
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

const showCategoryInput = document.querySelector<HTMLButtonElement>("#showCategoryInput");

const categoryInputContainer = document.querySelector<HTMLDivElement>("#categoryInputContainer");

const categoryNameInput = document.querySelector<HTMLInputElement>("#categoryName");

const addCategoryBtn = document.querySelector<HTMLButtonElement>("#addCategoryBtn");

const cancelCategoryBtn = document.querySelector<HTMLButtonElement>("#cancelAddCategoryBtn");

const saveDataBtn: HTMLButtonElement = document.querySelector("#saveDataBtn") as HTMLButtonElement;

showCategoryInput?.addEventListener("click", () => {
    categoryInputContainer!.hidden = false;
    categoryNameInput?.focus();
});

cancelCategoryBtn?.addEventListener("click", () => {
    categoryInputContainer!.hidden = true;

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

    const selectedType: HTMLInputElement = document.querySelector<HTMLInputElement>('input[name="categoryType"]:checked') as HTMLInputElement;

    if (!selectedType) {
        alert("Please select Income or Expenditure!");
        return;
    }

    await addCategory(selectedType.value);

    categoryInputContainer!.hidden = true;
});

saveDataBtn?.addEventListener("click", async e => {
    const bookingId = id++;
    const date: Date = new Date(document.querySelector<HTMLInputElement>("#date-input")!.value);
    const description: string = document.querySelector<HTMLInputElement>("#descr-input")!.value.trim();
    const amount: number = Number (document.querySelector<HTMLInputElement>("#amnt-input")!.value);
    const type: Type = Type.EXPENDITURE;
    const categoryId: number = Number (document.querySelector<HTMLInputElement>('input[name="expenditureCategory"]:checked')!.value);
    const categoryName: string = document.querySelector<HTMLInputElement>('input[name="expenditureCategory"]:checked')!.parentElement!.textContent!.trim();

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

init();