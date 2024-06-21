import "./banner.styles.css";

import { IState } from "@presentation/store";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

export const Banner: FunctionComponent = () => {
  const webSettings = useSelector(
    (state: IState) => state.venue.venue?.webSettings
  );

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${webSettings?.bannerImage})` }}
    />
  );
};
