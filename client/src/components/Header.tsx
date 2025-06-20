import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Moja Aplikacja</h1>
      <nav className="space-x-4">
        <Link to="/">Produkty</Link>
        <Link to="/login">Logowanie</Link>
      </nav>
    </header>
  );
}
