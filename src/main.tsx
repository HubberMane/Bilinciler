// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";   // DİKKAT: .jsx dosyasını import ediyoruz
import "./styles.css";         // bizim yazdığımız CSS

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
