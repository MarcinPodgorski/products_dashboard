import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const { loading } = useAuth()
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl animate-pulse">Ładowanie...</div>
      </div>
    )
  }
  return (
    <>
     <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </>
  );
}
