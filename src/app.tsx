import { Header } from "@presentation/components";
import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { UnknownAction } from "redux";

import { IState } from "./store";
import { fetchVenue } from "./store/venue";
import { Translator } from "./i18n";

export const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  const venue = useSelector((state: IState) => state.venue.venue);
  const loading = useSelector((state: IState) => state.venue.loading);

  useEffect(() => {
    dispatch(fetchVenue() as unknown as UnknownAction);
  }, [dispatch]);

  return <div>{loading ? <></> : venue ? <AppBody /> : <NoData />}</div>;
};

const AppBody: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center bg-[#EEEEEE]">
      <div className="w-full max-w-[1600px] min-h-screen shadow">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

const NoData: FunctionComponent = () => {
  return <Translator path="no-data" />;
};
