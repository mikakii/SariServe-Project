import { useState } from 'react';
import { LayoutDashboard, Package, Warehouse, ShoppingCart, BarChart3, LogOut, Menu, X, Users, Truck, Gift, Settings as SettingsIcon, Store } from 'lucide-react';
import { Button } from './ui/button';
import { DashboardPage } from './admin/DashboardPage';
import { ProductsPage } from './admin/ProductsPage';
import { InventoryPage } from './admin/InventoryPage';
import { OrdersPage } from './admin/OrdersPage';
import { ReportsPage } from './admin/ReportsPage';
import { CustomersPage } from './admin/CustomersPage';
import { DeliveryPage } from './admin/DeliveryPage';
import { PromotionsPage } from './admin/PromotionsPage';
import { SettingsPage } from './admin/SettingsPage';

interface AdminLayoutProps {
  onLogout: () => void;
}

type AdminPage = 'dashboard' | 'products' | 'inventory' | 'orders' | 'reports' | 'customers' | 'delivery' | 'promotions' | 'settings';

export function AdminLayout({ onLogout }: AdminLayoutProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard' as AdminPage, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders' as AdminPage, label: 'Orders', icon: ShoppingCart },
    { id: 'products' as AdminPage, label: 'Products', icon: Package },
    { id: 'inventory' as AdminPage, label: 'Inventory', icon: Warehouse },
    { id: 'customers' as AdminPage, label: 'Customers', icon: Users },
    { id: 'delivery' as AdminPage, label: 'Delivery', icon: Truck },
    { id: 'promotions' as AdminPage, label: 'Promotions', icon: Gift },
    { id: 'reports' as AdminPage, label: 'Reports', icon: BarChart3 },
    { id: 'settings' as AdminPage, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'}`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-green-600">SariServe</h2>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map(item => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setCurrentPage(item.id)}
              className={`w-full justify-start ${
                currentPage === item.id
                  ? 'bg-green-50 text-green-600 hover:bg-green-100'
                  : 'hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}

          <div className="pt-4 border-t border-gray-200 mt-4">
            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 h-16 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'products' && <ProductsPage />}
          {currentPage === 'inventory' && <InventoryPage />}
          {currentPage === 'orders' && <OrdersPage />}
          {currentPage === 'reports' && <ReportsPage />}
          {currentPage === 'customers' && <CustomersPage />}
          {currentPage === 'delivery' && <DeliveryPage />}
          {currentPage === 'promotions' && <PromotionsPage />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}