import "./banner.styles.css";

import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { IState } from "../../../store";

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
