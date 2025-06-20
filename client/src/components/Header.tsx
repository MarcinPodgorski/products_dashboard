import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user } = useAuth();
    console.log(user)
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">Products Dashboard</h1>
            {user ? (
                <p>Witaj, {user.username}</p>
            ) : <></>
            }
            <nav className="space-x-4">
                <Link to="/">Produkty</Link>
                <Link to="/login">Logowanie</Link>
            </nav>
        </header>
    );
}
