import { useState } from "react";

type Props = {
  columns: string[];
  onConfirm: (selected: { key: string; label: string }[]) => void;
  onClose: () => void;
};

export default function ExportColumnSelector({ columns, onConfirm, onClose }: Props) {
  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => ({ key: col, label: col, checked: true }))
  );

  const handleToggle = (key: string) => {
    setSelectedColumns((prev) =>
      prev.map((c) => (c.key === key ? { ...c, checked: !c.checked } : c))
    );
  };

  const handleLabelChange = (key: string, newLabel: string) => {
    setSelectedColumns((prev) =>
      prev.map((c) => (c.key === key ? { ...c, label: newLabel } : c))
    );
  };

  const handleExport = () => {
    onConfirm(selectedColumns.filter((c) => c.checked));
    onClose();
  };

  return (
    <div className="fixed top-20 right-10 bg-white shadow-xl p-4 rounded-xl z-50 w-96">
      <h2 className="text-lg font-semibold mb-2">Wybierz kolumny</h2>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {selectedColumns.map((col) => (
          <div key={col.key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={col.checked}
              onChange={() => handleToggle(col.key)}
            />
            <span className="text-sm w-28 truncate">{col.key}</span>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full text-sm"
              value={col.label}
              onChange={(e) => handleLabelChange(col.key, e.target.value)}
              placeholder="Nazwa w pliku"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <button onClick={onClose} className="text-gray-600">Anuluj</button>
        <button onClick={handleExport} className="bg-blue-600 text-white px-4 py-1 rounded">
          Eksportuj
        </button>
      </div>
    </div>
  );
}
