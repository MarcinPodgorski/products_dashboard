import { useState } from "react";
import { type Product } from "../../types/Product";
import { exportToCSV } from "./ExportToCSV";
import { exportToXML } from "./ExportToXML";
import ExportColumnSelector from "./ExportColumnSelector";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type Props = {
  products: Product[];
};

export default function ExportDropdown({ products }: Props) {
  const [showSelector, setShowSelector] = useState(false);
  const [exportType, setExportType] = useState<"csv" | "xml" | null>(null);

  const columns = Object.keys(products[0] || {});

  const handleExport = (selectedColumns: { key: string; label: string }[]) => {
    if (exportType === "csv") {
      exportToCSV(products, selectedColumns);
    } else if (exportType === "xml") {
      exportToXML(products, selectedColumns);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" onClick={() => setShowSelector(!showSelector)}>
        Eksportuj
        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" />
      </button>

      {showSelector && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md z-20">
          <button
            onClick={() => {
              setExportType("csv");
              setShowSelector(false);
              setTimeout(() => setShowSelector(true), 0); // pokaż selektor
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Eksportuj do CSV
          </button>
          <button
            onClick={() => {
              setExportType("xml");
              setShowSelector(false);
              setTimeout(() => setShowSelector(true), 0);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Eksportuj do XML
          </button>
        </div>
      )}

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
}
