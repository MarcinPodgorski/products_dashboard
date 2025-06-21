import { useState, useRef } from "react";
import { type Product } from "../../types/Product";
import { exportToCSV } from "./ExportToCSV";
import { exportToXML } from "./ExportToXML";
import ExportColumnSelector from "./ExportColumnSelector";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type Props = {
  selectedProducts: Product[];
};

const ExportDropdown: React.FC<Props> = ({ selectedProducts }) => {
  const [showSelector, setShowSelector] = useState(false);
  const [exportType, setExportType] = useState<"csv" | "xml" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasSelection = selectedProducts.length > 0;

  const columns = Object.keys(selectedProducts[0] || {});

  const handleExport = (selectedColumns: { key: string; label: string }[]) => {
    if (exportType === "csv") {
      exportToCSV(selectedProducts, selectedColumns);
    } else if (exportType === "xml") {
      exportToXML(selectedProducts, selectedColumns);
    }
    setExportType(null);
    setShowSelector(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Menu>
        <MenuButton className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          Eksportuj
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md z-20 focus:outline-none">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => {
                  setExportType("csv");
                  setShowSelector(true);
                }}
                disabled={!hasSelection}
                className={`${
                    active ? "bg-gray-100" : ""
                  } block w-full px-4 py-2 text-left text-sm ${
                    hasSelection
                      ? "text-gray-700"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
              >
                Eksportuj do CSV
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => {
                  setExportType("xml");
                  setShowSelector(true);
                }}
                disabled={!hasSelection}
                className={`${
                    active ? "bg-gray-100" : ""
                  } block w-full px-4 py-2 text-left text-sm ${
                    hasSelection
                      ? "text-gray-700"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
              >
                Eksportuj do XML
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>

      {exportType && showSelector && (
        <ExportColumnSelector
          columns={columns}
          onConfirm={handleExport}
          onClose={() => {
            setExportType(null);
            setShowSelector(false);
          }}
        />
      )}
    </div>
  );
};

export default ExportDropdown;
