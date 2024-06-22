import { Button, DialogClose, RadioGroup } from "@presentation/ui";
import { Dot } from "lucide-react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Item, Modifier, ModifierItem } from "../../../../domain/models";
import { toast } from "../../../../hooks";
import { Translator } from "../../../../i18n";
import { IState } from "../../../../store";
import {
  addOneToBasket,
  calculateItemTotal,
  ChangeModifier,
  removeOneFromBasket,
  syncBasket,
} from "../../../../store/basket";

interface ItemStratificationProps {
  item: Item;
}

export const ItemStratification: FunctionComponent<ItemStratificationProps> = ({
  item,
}) => {
  return (
    <div className="flex flex-col">
      {item.images && (
        <img
          className="h-[300px]"
          src={item.images[0].image}
          alt={item.name + " image"}
        />
      )}

      <div className="max-h-[380px] overflow-x-auto">
        <div className="flex flex-col gap-1 p-4">
          <h2 className="text-[28px] text-[#121212] font-bold">{item.name}</h2>
          <p className="text-base text-[#464646]">{item.description}</p>
        </div>

        <ul className="mb-[115px]">
          {item.modifiers &&
            item.modifiers.map((modifier) => (
              <ItemModifier key={modifier.id} modifier={modifier} item={item} />
            ))}
        </ul>

        <ItemStratificationFooter item={item} />
      </div>
    </div>
  );
};

interface ItemModifierProps {
  modifier: Modifier;
  item: Item;
}

const ItemModifier: FunctionComponent<ItemModifierProps> = ({
  modifier,
  item,
}) => {
  return (
    <li key={modifier.id} className="flex flex-col gap-2">
      <div className=" bg-[#F8F9FA]  p-4">
        <h3 className="text-[24px] text-[#121212] font-bold">
          {modifier.name}
        </h3>
        <div className="flex gap-1">
          <Translator path="menu.item_modifiers.count_prefix" />
          <span>
            {modifier.minChoices === modifier.maxChoices ? (
              modifier.minChoices
            ) : (
              <>
                {modifier.minChoices} - {modifier.maxChoices}
              </>
            )}
          </span>
          <Translator path="menu.item_modifiers.count_sufix" />
        </div>
      </div>
      <RadioGroup>
        {modifier.items.map((option) => (
          <ItemOptionModifierOption
            key={option.id}
            option={option}
            item={item}
            modifier={modifier}
          />
        ))}
      </RadioGroup>
    </li>
  );
};

interface ItemOptionModifierProps {
  modifier: Modifier;
  option: ModifierItem;
  item: Item;
}

const ItemOptionModifierOption: FunctionComponent<ItemOptionModifierProps> = ({
  option,
  item,
}) => {
  const { venue } = useSelector((state: IState) => state.venue);
  const { draftBasket } = useSelector((state: IState) => state.basket);
  const dispatch = useDispatch();

  const isSelected = !!draftBasket?.items.some((i) =>
    i.modifiers.find((m) => m.id === option.id)
  );

  const handleRadioChange = () => {
    dispatch(ChangeModifier({ item, env: "draft", modifier: option }));
  };

  return (
    <div
      key={option.id}
      onClick={handleRadioChange}
      className="flex items-center justify-between px-4 py-2 border-b border-[#E5E5E5] hover:bg-gray-50"
    >
      <div>
        <label htmlFor={option.id.toString()} className="text-base font-bold">
          {option.name}
        </label>

        <p className="text-base text-[#464646]">
          {venue!.currency}
          {option.price.toFixed(2)}
        </p>
      </div>

      <input
        type="radio"
        checked={isSelected}
        id={option.id.toString()}
        name={option.id.toString()}
        onChange={handleRadioChange}
      />
    </div>
  );
};

const ItemStratificationFooter: FunctionComponent<ItemStratificationProps> = ({
  item,
}) => {
  const { venue } = useSelector((state: IState) => state.venue);
  const { draftBasket, basket } = useSelector((state: IState) => state.basket);
  const dispatch = useDispatch();

  const style = {
    backgroundColor: venue?.webSettings.primaryColour || "#000",
  };

  const getPrice = (env = "default") => {
    const envRef = env === "draft" ? draftBasket : basket;
    return calculateItemTotal(item, envRef!);
  };

  const count =
    draftBasket?.items.find((i) => i.item.id === item.id)?.quantity || 0;

  const decreaseQuantity = () => {
    dispatch(removeOneFromBasket({ item, env: "draft" }));
  };

  const increaseQuantity = () => {
    dispatch(addOneToBasket({ item, env: "draft" }));
  };

  const syncRealBasket = () => {
    dispatch(syncBasket());
    toast({
      title: Translator({ path: "basket.updated" }),
    });
  };

  return (
    <footer className="p-4 flex flex-col items-center gap-2 absolute bottom-0 w-full backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Button
          disabled={getPrice("draft") === 0}
          className="w-[32px] h-[32px] text-white rounded-full"
          style={style}
          onClick={decreaseQuantity}
        >
          -
        </Button>
        <span
          className="text-[24px] font-bold"
          style={{ color: venue?.webSettings.primaryColour }}
        >
          {count}
        </span>
        <Button
          className="w-[32px] h-[32px] text-white rounded-full"
          style={style}
          onClick={increaseQuantity}
        >
          +
        </Button>
      </div>

      <DialogClose asChild>
        <Button
          disabled={getPrice() === getPrice("draft")}
          style={style}
          className="text-white py-2 rounded-3xl w-full flex gap-1"
          onClick={syncRealBasket}
        >
          <Translator path="basket.update_order" />
          <Dot></Dot>
          <p>
            {venue?.currency}
            {getPrice("draft").toFixed(2)}
          </p>
        </Button>
      </DialogClose>
    </footer>
  );
};
