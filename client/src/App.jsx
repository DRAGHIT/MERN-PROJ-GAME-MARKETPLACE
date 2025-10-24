import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Placeholder routes for protected pages - create these components as needed */}
            <Route path="/dashboard" element={<ProtectedRoute><div className="container mx-auto px-4 py-12"><h1 className="text-3xl font-bold">Dashboard - Coming Soon</h1></div></ProtectedRoute>} />
            <Route path="/sell" element={<ProtectedRoute><div className="container mx-auto px-4 py-12"><h1 className="text-3xl font-bold">Sell Game - Coming Soon</h1></div></ProtectedRoute>} />
            <Route path="/games/:id" element={<div className="container mx-auto px-4 py-12"><h1 className="text-3xl font-bold">Game Details - Coming Soon</h1></div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
