import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BulkActionsMenu from '../components/BulkActionsMenu';
import PriceUpdateModal from '../components/PriceUpdateModal';
import type { Product } from '../types/Product';
import ExportDropdown from "../components/export/ExportDropdown";


export default function HomePage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [showPriceModal, setShowPriceModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedIds, setSelectedIds] = useState<number[]>([]); // 🆕

    useEffect(() => {
        if (!user) return;

        axios.get('http://localhost:5001/product/products', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.error('Błąd pobierania produktów:', err);
            })
            .finally(() => setLoading(false));
    }, [user]);

    const handlePriceUpdate = (percent: number) => {
        const updated = products.map((p) =>
            selectedIds.includes(p.id)
                ? { ...p, price: Math.round(p.price * (1 + percent / 100)) }
                : p
        );
        setProducts(updated);
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    if (!user) {
        return <div className="p-4 text-center text-gray-600">Zaloguj się, aby zobaczyć produkty.</div>;
    }

    if (loading) return <div className="p-4">Ładowanie...</div>;

    const sortedProducts = [...products].sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    return (
        <div className="p-4">
            {/* Kontrola widoku i sortowania */}
            <div className="flex justify-between items-center mb-4">
                <div className="space-x-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        Kafelki
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        Lista
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
                        selectedProducts={products.filter((p) => selectedIds.includes(p.id))}
                        onPriceUpdateClick={() => setShowPriceModal(true)}
                    />

                    <ExportDropdown products={products.filter((p) => selectedIds.includes(p.id))} />

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
};
