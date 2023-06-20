import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth/index";
import { AppProvider } from "./context/index";
import "bootstrap/dist/css/bootstrap.css";
import "./global.css";
import Router from "./Router";

import App from "./ConsultaUsuários";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
