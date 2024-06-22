import "./i18n";
import "./index.css";

import { router } from "@presentation/router";
import { Toaster } from "@presentation/ui";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { UsecasesFactory } from "./data/factory";
import { setupInternationalizations } from "./i18n";
import i18n from "./i18n/internationalization";
import { AxiosHttpClient } from "./infra/protocols";
import { store } from "./store";

setupInternationalizations();

const httpClient = new AxiosHttpClient();
const API_BASE_URL = "/api";

export const usecasesFactory = new UsecasesFactory(API_BASE_URL, httpClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
