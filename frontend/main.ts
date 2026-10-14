console.log("Hello from backend");

const incomeCategories: string[] = ["Job", "Gift", "Investment", "Other"];
const expenditureCategories: string[] = ["Rent", "Food", "Transport", "Hobby", "Abonnement", "Health", "Other"];

const api: string = "http://localhost:3000";
let path: string = "/income";

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
saveDataBtn.addEventListener("click", e => {

});

getBackendMessage();