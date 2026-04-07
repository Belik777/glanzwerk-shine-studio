import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    createRoot(rootElement).render(<App />);
  } catch (err) {
    console.error("Failed to mount app:", err);
    rootElement.innerHTML =
      '<div style="padding:2rem;font-family:sans-serif;color:#333">' +
      "<h1>Fehler beim Laden</h1>" +
      "<p>Bitte laden Sie die Seite neu.</p>" +
      "</div>";
  }
} else {
  console.error("Root element #root not found in document.");
}
