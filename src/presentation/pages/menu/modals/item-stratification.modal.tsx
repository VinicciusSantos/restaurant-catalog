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

interface ItemStratificationProps {
  item: Item;
}

export const ItemStratification: FunctionComponent<ItemStratificationProps> = ({
  item,
}) => {
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
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-2xl font-bold">{item.name}</h2>
      <p className="text-base">{item.description}</p>
      <p className="text-base font-bold text-[#464646]">
        {item.price.toFixed(2)}
      </p>

      <div className="flex items-center gap-2">
        <BasketOperationButton text="-" onClick={decreaseQuantity} />
        <span>{getCount("draft")}</span>
        <BasketOperationButton text="+" onClick={increaseQuantity} />
      </div>

      <DialogClose asChild>
        <Button
          disabled={getCount() === getCount("draft")}
          className="bg-[#FF5A5F] text-white py-2 rounded-md"
          onClick={syncRealBasket}
        >
          Add to basket
        </Button>
      </DialogClose>
    </div>
  );
};
