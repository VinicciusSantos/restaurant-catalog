import "./header.styles.css";

import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@presentation/ui";
import { cn } from "@presentation/utils/shadcn";
import { Menu } from "lucide-react";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Translator } from "../../../i18n";
import { IState } from "../../../store";

const links = [
  { to: "/", label: "menu.title" },
  { to: "/sign-in", label: "signIn.title" },
  { to: "/contact-us", label: "contactUs.title" },
];

export const Header: FunctionComponent = () => {
  const { venue, loading } = useSelector((state: IState) => state.venue);
  const location = useLocation();

  const currentPage = links.find(({ to }) => to === location.pathname);

  const getNavItemClassName = (path: string) =>
    cn(
      "header__nav-item",
      location.pathname === path ? "header__nav-item--active flex" : ""
    );

  return (
    <header
      className="header w-full"
      style={{ backgroundColor: venue!.webSettings?.navBackgroundColour }}
    >
      <nav className="hidden header__nav md:flex">
        {links.map(({ to, label }) => (
          <Link key={to} to={to} className={getNavItemClassName(to)}>
            <Translator path={label} />
          </Link>
        ))}
      </nav>

      <nav className="md:hidden flex items-center justify-center w-full">
        <Link to={currentPage!.to} className="header__nav-item">
          <Translator path={currentPage!.label} />
        </Link>

        <HeaderHamburguerMenu />
      </nav>
    </header>
  );
};

const HeaderHamburguerMenu: FunctionComponent = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 absolute right-8"
        >
          <Menu className="h-7 w-7" color="white" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-6 text-lg font-medium mt-8">
          {links.map(({ to, label }) => (
            <SheetClose asChild key={to}>
              <Link
                to={to}
                className="text-muted-foreground hover:text-foreground"
              >
                <Translator path={label} />
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
