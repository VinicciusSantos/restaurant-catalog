import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Separator,
} from "@presentation/ui";
import { cn } from "@presentation/utils/shadcn";
import { Dot } from "lucide-react";
import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BasketItem } from "../../../domain/models";
import { toast } from "../../../hooks";
import { Translator } from "../../../i18n";
import { IState } from "../../../store";
import {
  addOneToBasket,
  calculateBasketTotal,
  calculateItemTotal,
  removeOneFromBasket,
} from "../../../store/basket";

interface BasketProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Basket: FunctionComponent<BasketProps> = ({ className }) => {
  return (
    <>
      <YourBasketButton />
      <div
        className={cn(
          "md:flex flex-col w-[320px] shadow h-min hidden",
          className
        )}
      >
        <header className="p-[22px] text-[24px] font-bold bg-[#F8F9FA]">
          <p className="text-[#464646]">
            <Translator path="basket.title" />
          </p>
        </header>
        <BasketItems />
      </div>
    </>
  );
};

const YourBasketButton: FunctionComponent = () => {
  const { venue } = useSelector((state: IState) => state.venue);
  const { basket } = useSelector((state: IState) => state.basket);

  const checkout = () => {
    toast({
      title: "Checkout not implemented yet",
      description: "This feature is not available yet",
      variant: "destructive",
    });
  };

  const countItems = basket?.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <>
      {basket?.items.length ? (
        <Dialog>
          <DialogTrigger>
            <Button
              className="fixed bottom-10 w-4/5 left-1/2 -translate-x-1/2 md:hidden rounded-full"
              style={{ background: venue?.webSettings.primaryColour }}
            >
              <Translator path="basket.your_basket" />
              <Dot />
              <div className="flex gap-1">
                <span>{countItems}</span>
                <Translator path="basket.items" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 h-screen flex flex-col">
            <DialogTitle>
              <div className="absolute left-1/2 -translate-x-1/2 w-screen h-14 flex items-center justify-center">
                <Translator path="basket.title" />
              </div>
            </DialogTitle>
            <div className="mt-16">
              <BasketItems />
            </div>
            <div className="px-4 w-full absolute bottom-10">
              <Button
                className="rounded-full w-full "
                style={{ background: venue?.webSettings.primaryColour }}
                onClick={checkout}
              >
                <Translator path="basket.checkout_now" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default YourBasketButton;

interface BasketItemsProps {}

const BasketItems: FunctionComponent<BasketItemsProps> = () => {
  const { basket } = useSelector((state: IState) => state.basket);

  return (
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
