import "./menu.styles.css";

import { Banner, Basket } from "@presentation/components";
import { IState } from "@presentation/store";
import { resetDraftBasket } from "@presentation/store/basket";
import { fetchMenu } from "@presentation/store/menu";
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
} from "@presentation/ui";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Item, Section } from "../../../domain/models";
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
  const { menu } = useSelector((state: IState) => state.menu);
  const [activeSection, setActiveSection] = useState<string>(
    menu!.sections[0].id.toString()
  );

  const handleTabClick = (sectionId: string): void => {
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
  const { menu } = useSelector((state: IState) => state.menu);
  const allSections = menu?.sections.map((section) => section.id.toString());

  return (
    <Accordion type="multiple" defaultValue={allSections}>
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
  const dispatch = useDispatch();

  const handleOpenChange = () => {
    dispatch(resetDraftBasket());
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div className="flex items-center justify-between hover:bg-gray-50 px-[16px] py-3 cursor-pointer">
          <div className="flex flex-col gap-1 text-left">
            <span className="font-bold text-base">{item.name}</span>
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
  return <p>Carregando...</p>;
};

const NoData: FunctionComponent = () => {
  return <p>Dados do menu não disponíveis.</p>;
};
