import { Separator } from "@presentation/ui";
import { cn } from "@presentation/utils/shadcn";
import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BasketItem } from "../../../domain/models";
import { IState } from "../../../store";
import {
  addOneToBasket,
  calculateBasketTotal,
  calculateItemTotal,
  removeOneFromBasket,
} from "../../../store/basket";
import { Translator } from "../../../i18n";

export const Basket: FunctionComponent = () => {
  const { basket } = useSelector((state: IState) => state.basket);

  return (
    <div className="flex flex-col w-[320px] shadow h-min">
      <header className="p-[22px] text-[24px] font-bold bg-[#F8F9FA]">
        <p className="text-[#464646]">
          <Translator path="basket.title" />
        </p>
      </header>
      <main className="bg-[#FFFFFF]">
        {basket?.items.length ? (
          <>
            <ul>
              {basket.items.map((item) => (
                <BasketElementItem key={item.item.id} item={item} />
              ))}
            </ul>
            <BasketFooter />
          </>
        ) : (
          <div className="m-[22px]">
            <Translator path="basket.empty" />
          </div>
        )}
      </main>
    </div>
  );
};

interface BasketElementItemProps {
  item: BasketItem;
}

const BasketElementItem: FunctionComponent<BasketElementItemProps> = ({
  item,
}: BasketElementItemProps) => {
  const { venue } = useSelector((state: IState) => state.venue);
  const { basket } = useSelector((state: IState) => state.basket);
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    dispatch(removeOneFromBasket(item));
  };

  const increaseQuantity = () => {
    dispatch(addOneToBasket(item));
  };

  const modifiers = basket!.items.find(
    (i) => i.item.id === item.item.id
  )?.modifiers;

  const price = calculateItemTotal(item.item, basket!);

  return (
    <li className=" p-[16px] border-b border-[#E5E5E5]">
      <div className="flex justify-between items-center">
        <p className="text-[#121212]">{item.item.name}</p>
        <p className="text-[#121212] font-semibold">
          {venue?.currency}
          {price.toFixed(2)}
        </p>
      </div>
      {modifiers && (
        <ul className="mb-2">
          {modifiers.map((modifier) => (
            <li key={modifier.id} className="text-gray-400">
              + {modifier.name}
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2 items-center">
        <BasketOperationButton text="-" onClick={decreaseQuantity} />
        <span>{item.quantity}</span>
        <BasketOperationButton text="+" onClick={increaseQuantity} />
      </div>
    </li>
  );
};

interface BasketOperationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const BasketOperationButton = (props: BasketOperationButtonProps) => {
  const { venue } = useSelector((state: IState) => state.venue);
  return (
    <button
      style={{ background: venue?.webSettings.primaryColour || "red" }}
      className={cn(
        "w-[20px] h-[20px] text-white rounded-full flex items-center justify-center text-border",
        props.className
      )}
      {...props}
    >
      {props.text}
    </button>
  );
};

const BasketFooter: FunctionComponent = () => {
  const { basket } = useSelector((state: IState) => state.basket);
  const { venue } = useSelector((state: IState) => state.venue);

  const footerElements = [
    {
      text: "basket.subtotal",
      value: venue!.currency + calculateBasketTotal(basket!).toFixed(2),
      font: "text-[16px]",
    },
    {
      text: "basket.total",
      value: venue!.currency + calculateBasketTotal(basket!).toFixed(2),
      font: "text-[24px]",
    },
  ];

  return (
    <footer className="bg-[#F8F9FA]">
      <div className="flex flex-col">
        {footerElements.map((element, index) => (
          <div key={element.text}>
            <div className="flex justify-between p-[16px]">
              <span className={cn(element.font)}>
                <Translator path={element.text} />
              </span>
              <span className={cn(element.font, "font-bold")}>
                {element.value}
              </span>
            </div>
            {index !== footerElements.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </footer>
  );
};
