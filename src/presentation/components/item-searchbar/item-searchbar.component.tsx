import { SectionItem } from '@presentation/pages';
import { Input } from '@presentation/ui';
import { InfoIcon } from 'lucide-react';
import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Translator } from '../../../i18n';

import { useComponentVisible } from '../../../hooks';
import { IState } from '../../../store';

interface ItemSearchbarProps {}

export const ItemSearchbar: FunctionComponent<ItemSearchbarProps> = () => {
  const { menu } = useSelector((state: IState) => state.menu);
  const {t } = useTranslation();
  const allItems = menu!.sections.flatMap((section) => section.items);

  const onClose = (): boolean => {
    setSearchValue("");
    return true;
  };

  const [searchValue, setSearchValue] = useState("");
  const { ref, isComponentVisible } = useComponentVisible({
    initialIsVisible: true,
    callback: onClose,
  });

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  return (
    <div className="relative" ref={ref}>
      <Input
        value={searchValue}
        className="my-3 outline-none outline-1 outline-[#DADADA]"
        type="text"
        overflow-y-auto
        placeholder={t("searchbar.search_placeholder") as string}
        onChange={handleSearch}
      />
      {searchValue && isComponentVisible && (
        <ul className="absolute z-10 bg-white p-4 rounded shadow w-2/3 flex flex-col max-h-60 overflow-y-auto">
          {filteredItems.length ? (
            filteredItems.map((item) => (
              <SectionItem item={item} key={item.id.toString()} />
            ))
          ) : (
            <li className="flex items-center justify-center gap-2 w-full h-20">
              <InfoIcon />
              <span><Translator path="searchbar.no_items_found" /> "{searchValue}"</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
