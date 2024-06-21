import { Translator } from "@presentation/i18n";
import { IState } from "@presentation/store";
import {
  addOneToBasket,
  removeOneFromBasket,
} from "@presentation/store/basket";
import { Separator } from "@presentation/ui";
import { cn } from "@presentation/utils/shadcn";
import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BasketItem } from "src/domain/models";

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
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    dispatch(removeOneFromBasket(item));
  };

  const increaseQuantity = () => {
    dispatch(addOneToBasket(item));
  };

  return (
    <li className=" p-[16px] border-b border-[#E5E5E5]">
      <div className="flex justify-between items-center">
        <p className="text-[#121212]">{item.item.name}</p>
        <p className="text-[#121212] font-semibold">
          {venue?.currency}
          {(item.item.price * item.quantity).toFixed(2)}
        </p>
      </div>
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
      className="w-[20px] h-[20px] text-white rounded-full flex items-center justify-center text-border"
      {...props}
    >
      {props.text}
    </button>
  );
};

const BasketFooter: FunctionComponent = () => {
  const { basket } = useSelector((state: IState) => state.basket);
  const { venue } = useSelector((state: IState) => state.venue);

  const subTotal =
    basket?.items.reduce(
      (acc, item) => acc + item.item.price * item.quantity,
      0
    ) || 0;

  const total =
    basket?.items.reduce(
      (acc, item) => acc + item.item.price * item.quantity,
      0
    ) || 0;

  const footerElements = [
    {
      text: "basket.subtotal",
      value: venue?.currency + subTotal.toFixed(2),
      font: "text-[16px]",
    },
    {
      text: "basket.total",
      value: venue?.currency + total.toFixed(2),
      font: "text-[24px]",
    },
  ];

  return (
    <footer className="bg-[#F8F9FA]">
      <div className="flex flex-col">
        {footerElements.map((element, index) => (
          <>
            <div key={element.text} className="flex justify-between p-[16px]">
              <span className={cn(element.font)}>
                <Translator path={element.text} />
              </span>
              <span className={cn(element.font, "font-bold")}>
                {element.value}
              </span>
            </div>
            {index !== footerElements.length - 1 && <Separator />}
          </>
        ))}
      </div>
    </footer>
  );
};
