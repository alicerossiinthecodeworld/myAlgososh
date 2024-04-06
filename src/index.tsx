import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./fonts/fonts.css";
import "./components/ui/common.css";
import "./components/ui/box.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
if (container != null){
   const root = createRoot(container); 
   root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );}

reportWebVitals();
