import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "../src/Features/Auth/Context/auth.context.jsx";
import { BrowserRouter } from "react-router";
import SongContextProvider from "./Features/Emotions Detection /Context/song.context.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SongContextProvider>
        <App />
      </SongContextProvider>
    </AuthProvider>
  </BrowserRouter>,
);
