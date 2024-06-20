import "./menu.styles.css";

import { Banner } from "@presentation/components";
import { IState } from "@presentation/store";
import { fetchMenu } from "@presentation/store/menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@presentation/ui";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Section } from "../../../domain/models";

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

      <div className="menu-content bg-[#F8F9FA] flex flex-col gap-8 px-[40px] py-[32px]">
        <div className="w-[600px] bg-white shadow">
          <MenuSectionsTabs />
          <MenuSectionAccordion />
        </div>
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
              <h4>{section.name}</h4>
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
        <AccordionItem className="px-[16px]" key={section.id} value={section.id.toString()}>
          <AccordionTrigger>{section.name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              {section.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col gap-2">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const Loader: FunctionComponent = () => {
  return <p>Carregando...</p>;
};

const NoData: FunctionComponent = () => {
  return <p>Dados do menu não disponíveis.</p>;
};
