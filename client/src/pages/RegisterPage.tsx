import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/auth/register", {
        email,
        username,
        password,
      });
      setMessage(res.data.message); // np. "Register successful"
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Coś poszło nie tak");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Stwórz konto
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Dołącz do naszej platformy i odkryj wszystkie możliwości 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="np. jan.kowalski@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa użytkownika
            </label>
            <input
              type="text"
              placeholder="Twoja nazwa użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hasło
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-xs text-gray-400 mt-1">
              Minimum 8 znaków, duża litera, cyfra i znak specjalny
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            Zarejestruj się
          </button>
        </form>

        {message && (
          <p className="text-sm mt-4 text-center text-indigo-600">{message}</p>
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          Masz już konto?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
}
