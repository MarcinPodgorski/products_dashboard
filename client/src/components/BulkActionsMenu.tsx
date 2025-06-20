import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { type Product } from "../types/Product";
import { exportToCSV } from "../utils/exportToCSV";
import { exportToXML } from "../utils/exportToXML";

type Props = {
  selectedProducts: Product[];
  onPriceUpdateClick: () => void;
};

const BulkActionsMenu: React.FC<Props> = ({
  selectedProducts,
  onPriceUpdateClick,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
        Akcje grupowe
        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" />
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={() => exportToCSV(selectedProducts)}
                disabled={selectedProducts.length === 0}
                className={`${
                  focus ? "bg-gray-100" : ""
                } block w-full px-4 py-2 text-left text-sm text-gray-700 disabled:text-gray-400`}
              >
                Eksportuj do CSV
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={() => exportToXML(selectedProducts)}
                disabled={selectedProducts.length === 0}
                className={`${
                  focus ? "bg-gray-100" : ""
                } block w-full px-4 py-2 text-left text-sm text-gray-700 disabled:text-gray-400`}
              >
                Eksportuj do XML
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={onPriceUpdateClick}
                disabled={selectedProducts.length === 0}
                className={`${
                  focus ? "bg-gray-100" : ""
                } block w-full px-4 py-2 text-left text-sm text-gray-700 disabled:text-gray-400`}
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
