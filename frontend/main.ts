console.log("Hello from backend");

const incomeCategories: string[] = ["Job", "Gift", "Investment", "Other"];
const expenditureCategories: string[] = ["Rent", "Food", "Transport", "Hobby", "Abonnement", "Health", "Other"];

const api: string = "http://localhost:3000";
let path: string = "/api/data";

enum type {
    INCOME,
    EXPENDITURE
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

    const id: number = await response.json();

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