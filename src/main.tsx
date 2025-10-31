import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SkinProvider } from "./contexts/SkinContext";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <SkinProvider>
      <App />
    </SkinProvider>
  </LanguageProvider>
);
