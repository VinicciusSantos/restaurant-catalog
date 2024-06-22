import "./menu.styles.css";

import { Banner, Basket } from "@presentation/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Skeleton,
} from "@presentation/ui";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Item, Section } from "../../../domain/models";
import { IState } from "../../../store";
import { resetDraftBasket } from "../../../store/basket";
import { fetchMenu, syncOpenSections } from "../../../store/menu";
import { ItemStratification } from "./modals/item-stratification.modal";

export const MenuPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state: IState) => state.menu.menu);
  const loading = useSelector((state: IState) => state.menu.loading);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <Banner />
      <div className="w-[1024px]">
        {loading ? <Loader /> : menu ? <MenuBody /> : <NoData />}
      </div>
    </div>
  );
};

const MenuBody: FunctionComponent = () => {
  return (
    <>
      <Input className="my-3" type="text" placeholder="Search" />
      <div className="menu-content bg-[#F8F9FA] flex gap-8 px-[40px] py-[32px]">
        <div className="w-[600px] bg-white shadow">
          <MenuSectionsTabs />
          <MenuSectionAccordion />
        </div>
        <Basket />
      </div>
    </>
  );
};

const MenuSectionsTabs: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { menu } = useSelector((state: IState) => state.menu);
  const [activeSection, setActiveSection] = useState<string>(
    menu!.sections[0].id.toString()
  );

  const handleTabClick = (sectionId: string): void => {
    dispatch(syncOpenSections([sectionId]));
    setActiveSection(sectionId);
  };

  const isSelected = (section: Section): boolean => {
    return activeSection === section.id.toString();
  };

  return (
    <Tabs className="px-[16px] py-[20px]">
      <TabsList className="flex gap-3 w-full">
        {menu?.sections.map((section) => (
          <TabsTrigger
            key={section.id}
            value={section.id.toString()}
            onClick={() => handleTabClick(section.id.toString())}
            className={isSelected(section) ? "active-tab tab" : "tab"}
          >
            <div className="tab-container">
              <Avatar className="h-[74px] w-[74px]">
                <AvatarImage src={section.images[0].image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{section.name}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

const MenuSectionAccordion: FunctionComponent = () => {
  const { menu, openSections } = useSelector((state: IState) => state.menu);
  const dispatch = useDispatch();

  const handleOpenChange = (openSections: string[]): void => {
    dispatch(syncOpenSections(openSections));
  };

  return (
    <Accordion
      type="multiple"
      value={openSections}
      onValueChange={handleOpenChange}
    >
      {menu?.sections.map((section) => (
        <AccordionItem key={section.id} value={section.id.toString()}>
          <AccordionTrigger className="text-xl px-[16px]">
            {section.name}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {section.items.map((item) => (
                <SectionItem key={item.id} item={item} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

interface SectionItemProps {
  item: Item;
}

const SectionItem: FunctionComponent<SectionItemProps> = ({ item }) => {
  const { venue } = useSelector((state: IState) => state.venue);
  const { basket } = useSelector((state: IState) => state.basket);
  const dispatch = useDispatch();

  const handleOpenChange = () => {
    dispatch(resetDraftBasket());
  };

  const count = basket!.items.find((i) => i.item.id === item.id)?.quantity;

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div className="flex items-center justify-between hover:bg-gray-50 px-[16px] py-3 cursor-pointer">
          <div className="flex flex-col mr-4 gap-1 text-left">
            <header className="flex items-center gap-2">
              {count && (
                <div
                  style={{ background: venue?.webSettings.primaryColour }}
                  className=" min-w-[18px] min-h-[18px] rounded-sm flex items-center justify-center"
                >
                  <span className="text-white">{count}</span>
                </div>
              )}
              <span className="font-bold text-base">{item.name}</span>
            </header>
            {item.description && (
              <p className="text-base">{item.description}</p>
            )}
            <p className="text-base font-bold text-[#464646]">
              {venue?.currency}
              {item.price.toFixed(2)}
            </p>
          </div>
          {item.images && item.images.length && (
            <img
              className="h-[85px] rounded-md"
              src={item.images[0].image}
              alt="food image"
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <ItemStratification item={item}></ItemStratification>
      </DialogContent>
    </Dialog>
  );
};

const Loader: FunctionComponent = () => {
  return (
    <div className="w-[1024px]">
      <Skeleton className="my-3 h-10 w-full" />
      <div className="menu-content bg-[#F8F9FA] flex gap-8 px-[40px] py-[32px]">
        <div className="w-[600px] bg-white shadow p-4">
          <Skeleton className="h-20 w-full mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-10 w-full" />
                <div className="space-y-2 mt-2">
                  {[...Array(2)].map((_, idx) => (
                    <Skeleton key={idx} className="h-24 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[300px]">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  );
};

const NoData: FunctionComponent = () => {
  return <p>Dados do menu não disponíveis.</p>;
};
