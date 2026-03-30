import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { MiddleEastPage } from "./MiddleEastPage.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/middle-east" element={<MiddleEastPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

