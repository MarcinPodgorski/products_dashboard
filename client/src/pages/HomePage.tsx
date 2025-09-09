import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BulkActionsMenu from '../components/BulkActionsMenu';
import PriceUpdateModal from '../components/PriceUpdateModal';
import type { Product } from '../types/Product';
import ExportDropdown from "../components/export/ExportDropdown";
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (!user) return;

    axios.get('http://localhost:5001/product/products', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => setProducts(res.data))
      .catch(err => console.error('Błąd pobierania produktów:', err))
      .finally(() => setLoading(false));
  }, [user]);

  const handlePriceUpdate = (percent: number) => {
    setProducts(products.map(p =>
      selectedIds.includes(p.id) ? { ...p, price: Math.round(p.price * (1 + percent / 100)) } : p
    ));
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Witaj w naszej platformie!</h1>
          <p className="text-gray-500 mb-6">
            Aby zobaczyć produkty i korzystać z pełnych funkcji, zaloguj się lub stwórz nowe konto.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
            >
              Zaloguj się
            </Link>
            <Link
              to="/register"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
            >
              Zarejestruj się
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-4 text-center">Ładowanie...</div>;

  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="p-4">
      {/* Produkty i akcje - pozostaje tak jak wcześniej */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600 w-full">
        <div>Zaznaczono: {selectedIds.length} z {products.length}</div>
        <button
          onClick={() => {
            if (selectedIds.length === products.length) {
              setSelectedIds([]);
            } else {
              setSelectedIds(products.map(p => p.id));
            }
          }}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          {selectedIds.length === products.length ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}
        </button>
      </div>

      {/* Kontrola widoku i sortowania */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Kafelki
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <label className="mr-2 text-sm">Sortuj wg ceny:</label>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="border p-1 rounded"
            >
              <option value="asc">Rosnąco</option>
              <option value="desc">Malejąco</option>
            </select>
          </div>
          <BulkActionsMenu
            selectedProducts={products.filter(p => selectedIds.includes(p.id))}
            onPriceUpdateClick={() => setShowPriceModal(true)}
          />
          <ExportDropdown
            selectedProducts={products.filter(p => selectedIds.includes(p.id))}
          />
          <PriceUpdateModal
            isOpen={showPriceModal}
            onClose={() => setShowPriceModal(false)}
            onUpdate={handlePriceUpdate}
          />
        </div>
      </div>

      {/* Widok produktów */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map(product => (
            <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-md transition relative">
              <input
                type="checkbox"
                checked={selectedIds.includes(product.id)}
                onChange={() => toggleSelect(product.id)}
                className="absolute top-2 right-2"
              />
              <img src={product.images[0]} alt={product.title} className="h-40 object-cover mb-2 rounded" />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <p className="font-bold">{product.price} zł</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map(product => (
            <div key={product.id} className="border rounded-xl p-4 flex items-start gap-4 shadow hover:shadow-md transition relative">
              <input
                type="checkbox"
                checked={selectedIds.includes(product.id)}
                onChange={() => toggleSelect(product.id)}
                className="absolute top-2 left-2"
              />
              <img src={product.images[0]} alt={product.title} className="h-24 w-24 object-cover rounded ml-6" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-500 mb-1">{product.description}</p>
                <p className="font-bold">{product.price} zł</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
