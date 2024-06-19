import { Header } from "@presentation/components";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

export const App: FunctionComponent = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
