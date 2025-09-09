import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Home, LogIn, UserPlus, LogOut, Package } from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: "Produkty", path: "/", icon: <Package size={20} /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col justify-between shadow-lg`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
            {isOpen && <h1 className="text-lg font-bold tracking-wide">Dashboard</h1>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-gray-200 transition flex items-center justify-center w-full h-full"
            >
              <HiMenu size={24} />
            </button>
          </div>

          {/* Nawigacja */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* 🔑 Sekcja autoryzacji */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                  isOpen
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "text-indigo-600 hover:bg-indigo-100"
                }`}
              >
                <LogIn size={20} />
                {isOpen && "Zaloguj się"}
              </Link>
              <Link
                to="/register"
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                  isOpen
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "text-green-600 hover:bg-green-100"
                }`}
              >
                <UserPlus size={20} />
                {isOpen && "Zarejestruj się"}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {isOpen && (
                <div>
                  <p className="text-xs text-gray-500">Zalogowany jako</p>
                  <p className="font-semibold">{user.username}</p>
                </div>
              )}
              <button
                onClick={logout}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                  isOpen
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "text-red-600 hover:bg-red-100"
                }`}
              >
                <LogOut size={20} />
                {isOpen && "Wyloguj"}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        {/* Tutaj będzie renderowany content */}
      </main>
    </div>
  );
}
