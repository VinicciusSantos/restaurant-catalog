import { createBrowserRouter } from "react-router-dom";
import { ContactUsPage, MenuPage, SignInPage } from "./pages";
import { App } from "../app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MenuPage /> },
      { path: "contact-us", element: <ContactUsPage /> },
      { path: "sign-in", element: <SignInPage /> },
    ],
  },
]);
