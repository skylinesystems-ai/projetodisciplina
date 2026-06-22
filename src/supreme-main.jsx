import React from "react";
import ReactDOM from "react-dom/client";
import SupremeDisciplineApp from "@/SupremeDisciplineApp.jsx";
import { ToastProvider } from "@/components/ui/index.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <SupremeDisciplineApp />
    </ToastProvider>
  </React.StrictMode>
);
