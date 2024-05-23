import "./assets/fontawesome/css/fontawesome.min.css";
import "./assets/fontawesome/css/regular.min.css";
import "./assets/fontawesome/css/solid.min.css";
import "./assets/fontawesome/css/light.min.css";
import "./assets/fontawesome/css/all.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import App from "./App";
import "antd/dist/reset.css";
import {ConfigureStore} from "./app/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={ConfigureStore()}>
                <App />
            </Provider>
        </React.StrictMode>
    </BrowserRouter>,
);
