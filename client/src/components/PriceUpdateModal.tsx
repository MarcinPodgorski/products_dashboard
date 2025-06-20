import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (percent: number) => void;
};

const PriceUpdateModal: React.FC<Props> = ({ isOpen, onClose, onUpdate }) => {
  const [percent, setPercent] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4">Grupowa zmiana cen</h2>
        <p className="text-sm mb-2">Podaj wartość procentową (np. 10 lub -5)</p>
        <input
          type="number"
          className="w-full border p-2 mb-4"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Anuluj
          </button>
          <button
            onClick={() => {
              onUpdate(percent);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Zatwierdź
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceUpdateModal;
