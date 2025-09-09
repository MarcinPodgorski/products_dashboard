import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:5001/auth/login", userData)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          setUser(res.data.user);
          navigate("/");
        }
      })
      .catch(() => {
        setErrorMessage("Błędny login lub hasło");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Zaloguj się
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Witaj ponownie 👋 Wpisz dane, aby kontynuować
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Twój email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUserData}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hasło
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleUserData}
              required
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition-colors"
            type="submit"
          >
            Zaloguj się
          </button>
        </form>

        {errorMessage && (
          <p className="text-sm mt-4 text-center text-red-600">
            {errorMessage}
          </p>
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          Nie masz konta?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
}
