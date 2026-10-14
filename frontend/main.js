"use strict";
console.log("Hello from backend");
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
getBackendMessage();
console.log("Halllo");
