console.log("Hello from backend");

const api: string = "http://localhost:3000";
let path: string = "/api/data";
let id: number = 1;
let isIncome: boolean = true;

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
    convertCategoriesToRadios(isIncome ? "Income" : "Expenditure");
    //await addCategoriesToJson();
    await getJsonFile();
    await getBackendMessage();
}

const showCategoryInput = document.querySelector<HTMLButtonElement>("#showCategoryInput");
const categoryInputContainer = document.querySelector<HTMLDivElement>("#categoryInputContainer");
const categoryNameInput = document.querySelector<HTMLInputElement>("#categoryName");
const addCategoryBtn = document.querySelector<HTMLButtonElement>("#addCategoryBtn");
const cancelCategoryBtn = document.querySelector<HTMLButtonElement>("#cancelAddCategoryBtn");
const incomeToggle: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#income-toggle") as HTMLButtonElement;
const expenseToggle: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#expense-toggle") as HTMLButtonElement;
const bookingForm: HTMLFormElement = document.querySelector<HTMLFormElement>("#booking-form") as HTMLFormElement;

function setBookingType(income: boolean): void {
    isIncome = income;

    incomeToggle?.classList.toggle("clicked", isIncome);
    incomeToggle?.setAttribute("aria-pressed", String(isIncome));
    expenseToggle?.classList.toggle("clicked", !isIncome);
    expenseToggle?.setAttribute("aria-pressed", String(!isIncome));

    if (categories) {
        convertCategoriesToRadios(isIncome ? "Income" : "Expenditure");
    }
}

incomeToggle?.addEventListener("click", () => setBookingType(true));

expenseToggle?.addEventListener("click", () => setBookingType(false));

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

bookingForm?.addEventListener("submit", async e => {
    e.preventDefault();

    const date: Date = new Date();
    const description: string = document.querySelector<HTMLInputElement>("#descr-input")!.value.trim();
    const amount: number = Number (document.querySelector<HTMLInputElement>("#amnt-input")!.value);
    const type: Type = isIncome ? Type.INCOME : Type.EXPENDITURE;
    const categoryInputName = isIncome ? "incomeCategory" : "expenditureCategory";
    const selectedCategory = document.querySelector<HTMLInputElement>(`input[name="${categoryInputName}"]:checked`);

    if (!selectedCategory || !description || !amount) {
        const form: HTMLFormElement = document.querySelector("#booking-form") as HTMLFormElement;
        const errorText: HTMLDivElement = document.createElement("div");
        errorText.textContent = "Either the Description, the Amount or the Category is empty!";
        errorText.classList.add("err-msg");
        form.appendChild(errorText);
        //alert("Please select a category!");
        // TODO error message
        return;
    }

    const bookingId: number = id++;
    const categoryId: number = Number(selectedCategory.value);
    const categoryName: string = selectedCategory.parentElement!.textContent!.trim();

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
    await addBookingToJson(info);

    bookingForm.reset();

    setBookingType(true);
});

init();