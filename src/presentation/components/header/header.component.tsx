import "./header.styles.css";
import { Translator } from "@presentation/i18n";
import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header: FunctionComponent = () => {
  const location = useLocation();

  const getNavItemClassName = (path: string) =>
    `header__nav-item ${
      location.pathname === path ? "header__nav-item--active" : ""
    }`;

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className={getNavItemClassName("/")}>
          <Translator path="menu.title" />
        </Link>
        <Link to="/sign-in" className={getNavItemClassName("/sign-in")}>
          <Translator path="signIn.title" />
        </Link>
        <Link to="/contact-us" className={getNavItemClassName("/contact-us")}>
          <Translator path="contactUs.title" />
        </Link>
      </nav>
    </header>
  );
};
