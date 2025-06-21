import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { type Product } from "../types/Product";

type Props = {
  selectedProducts: Product[];
  onPriceUpdateClick: () => void;
};

const BulkActionsMenu: React.FC<Props> = ({
  selectedProducts,
  onPriceUpdateClick,
}) => {
  const hasSelection = selectedProducts.length > 0;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
        Akcje grupowe
        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" />
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md z-20 focus:outline-none">
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={hasSelection ? onPriceUpdateClick : undefined}
                disabled={!hasSelection}
                className={`${
                  active ? "bg-gray-100" : ""
                } block w-full px-4 py-2 text-left text-sm ${
                  hasSelection
                    ? "text-gray-700"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Grupowa zmiana cen (%)
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default BulkActionsMenu;
