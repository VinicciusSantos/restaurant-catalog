import { Header } from "@presentation/components";
import { IState } from "@presentation/store";
import { fetchVenue } from "@presentation/store/venue";
import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { UnknownAction } from "redux";

export const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  const venue = useSelector((state: IState) => state.venue.venue);
  const loading = useSelector((state: IState) => state.venue.loading);

  useEffect(() => {
    dispatch(fetchVenue() as unknown as UnknownAction);
  }, [dispatch]);

  return <div>{loading ? <Loader /> : venue ? <AppBody /> : <NoData />}</div>;
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

const Loader: FunctionComponent = () => {
  return <p>Carregando...</p>;
};

const NoData: FunctionComponent = () => {
  return <p>Dados do venue não disponíveis.</p>;
};
