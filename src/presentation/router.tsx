import { createBrowserRouter } from "react-router-dom";
import { ContactUsPage, MenuPage, SignInPage } from "./pages";

export const router = createBrowserRouter([
  { path: "/", element: <MenuPage /> },
  { path: "contact-us", element: <ContactUsPage /> },
  { path: "sign-in", element: <SignInPage /> },
]);
