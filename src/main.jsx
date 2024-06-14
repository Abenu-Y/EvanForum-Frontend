import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./Components/State/State.jsx";
import { reducer } from "./Utility/reducer.jsx";
import { initialState} from "./Utility/reducer.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} intialState={initialState}>
      <BrowserRouter >
         <App />
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
