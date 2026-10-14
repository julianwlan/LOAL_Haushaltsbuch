console.log("Hello from backend");

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

getBackendMessage();