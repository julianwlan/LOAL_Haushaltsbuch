console.log("Hello from backend");

const incomeCategories: string[] = ["Job", "Gift", "Investment", "Other"];
const expenditureCategories: string[] = ["Rent", "Food", "Transport", "Hobby", "Abonnement", "Health", "Other"];

const api: string = "http://localhost:3000";
let path: string = "/api/data";

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
    const id = await getIdFromServer();
    const date: Date = new Date();
    const description: string = "billa";
    const amount: number = 50;
    const type: Type = Type.EXPENDITURE;
    const categoryId: number = 5;
    const categoryName: string = "Food";

    const info: Info = {
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

async function getIdFromServer() {
    const response = await fetch(api + "/api/id");

    const id: number = await response.json();

    return id;
}

async function getJsonFile() {
    const data = await fetch(api + path);

    const response = await data.json();
    console.log(response);
}

getJsonFile();
getBackendMessage();