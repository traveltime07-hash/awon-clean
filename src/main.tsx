import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

window.addEventListener("error", (e) => console.error("[GlobalError]", e.error || e.message));
window.addEventListener("unhandledrejection", (e) => console.error("[PromiseRejection]", e.reason));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
