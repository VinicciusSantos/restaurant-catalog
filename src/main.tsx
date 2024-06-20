import './index.css';

import { setupInternationalizations } from '@presentation/i18n';
import { router } from '@presentation/router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { UsecasesFactory } from './data/factory';
import { AxiosHttpClient } from './infra/protocols';
import { store } from './presentation/store';

setupInternationalizations();

const httpClient = new AxiosHttpClient();
const API_BASE_URL = "/api";

export const usecasesFactory = new UsecasesFactory(API_BASE_URL, httpClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
