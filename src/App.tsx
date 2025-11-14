import { useState } from 'react';
import { CustomerLayout } from './components/CustomerLayout';
import { AdminLayout } from './components/AdminLayout';
import { LoginPage } from './components/LoginPage';

type UserRole = 'customer' | 'admin' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: 'customer' | 'admin') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (userRole === 'admin') {
    return <AdminLayout onLogout={handleLogout} />;
  }

  return <CustomerLayout onLogout={handleLogout} />;
}
