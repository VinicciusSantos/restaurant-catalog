import { BasketOperationButton } from "@presentation/components";
import { IState } from "@presentation/store";
import {
  addOneToBasket,
  removeOneFromBasket,
  syncBasket,
} from "@presentation/store/basket";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Item } from "../../../../domain/models";
import { Button, DialogClose } from "@presentation/ui";
import { Translator } from "@presentation/i18n";

interface ItemStratificationProps {
  item: Item;
}

export const ItemStratification: FunctionComponent<ItemStratificationProps> = ({
  item,
}) => {
  const { venue } = useSelector((state: IState) => state.venue);
  const { draftBasket, basket } = useSelector((state: IState) => state.basket);
  const dispatch = useDispatch();

  const getCount = (env?: "default" | "draft") => {
    const envRef = env === "draft" ? draftBasket : basket;
    return envRef?.items.find((i) => i.item.id === item.id)?.quantity || 0;
  };

  const decreaseQuantity = () => {
    dispatch(removeOneFromBasket({ item, env: "draft" }));
  };

  const increaseQuantity = () => {
    dispatch(addOneToBasket({ item, env: "draft" }));
  };

  const syncRealBasket = () => {
    dispatch(syncBasket());
  };

  return (
    <div className="flex flex-col">
      {item.images && (
        <img
          className="h-[320px]"
          src={item.images[0].image}
          alt={item.name + " image"}
        />
      )}
      <div className="flex flex-col gap-1 p-4">
        <h2 className="text-[28px] text-[#121212] font-bold">{item.name}</h2>
        <p className="text-base text-[#464646]">{item.description}</p>
      </div>

      <footer className="p-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <BasketOperationButton text="-" onClick={decreaseQuantity} />
          <span>{getCount("draft")}</span>
          <BasketOperationButton text="+" onClick={increaseQuantity} />
        </div>

        <DialogClose asChild>
          <Button
            disabled={getCount() === getCount("draft")}
            style={{
              backgroundColor: venue?.webSettings.primaryColour || "#000",
            }}
            className="text-white py-2 rounded-md w-full flex gap-3"
            onClick={syncRealBasket}
          >
            <Translator path="basket.add_to_order" />
            <p>
              {venue?.currency}
              {(item.price * getCount("draft")).toFixed(2)}
            </p>
          </Button>
        </DialogClose>
      </footer>
    </div>
  );
};
