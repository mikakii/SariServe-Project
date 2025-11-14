import { useState } from 'react';
import { Home, ShoppingCart, History, User, Search, MapPin, Heart, Bell, Settings, CreditCard, HelpCircle, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { HomePage } from './customer/HomePage';
import { CartPage } from './customer/CartPage';
import { OrderHistoryPage } from './customer/OrderHistoryPage';
import { ProfilePage } from './customer/ProfilePage';
import { FavoritesPage } from './customer/FavoritesPage';
import { NotificationsPage } from './customer/NotificationsPage';
import { Badge } from './ui/badge';

interface CustomerLayoutProps {
  onLogout: () => void;
}

type CustomerPage = 'home' | 'cart' | 'orders' | 'profile' | 'favorites' | 'notifications';

export function CustomerLayout({ onLogout }: CustomerLayoutProps) {
  const [currentPage, setCurrentPage] = useState<CustomerPage>('home');
  const [cartItemsCount, setCartItemsCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(5);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Top Header - Desktop & Mobile */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Logo & Location */}
            <div className="flex-1 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-xl">🏪</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500">Deliver to</p>
                    <p className="text-gray-900">Quezon City, Metro Manila</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('home')}
                className={currentPage === 'home' ? 'text-red-500' : ''}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('favorites')}
                className={`relative ${currentPage === 'favorites' ? 'text-red-500' : ''}`}
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('orders')}
                className={currentPage === 'orders' ? 'text-red-500' : ''}
              >
                <History className="w-4 h-4 mr-2" />
                Orders
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('notifications')}
                className={`relative ${currentPage === 'notifications' ? 'text-red-500' : ''}`}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('cart')}
                className={`relative ${currentPage === 'cart' ? 'text-red-500' : ''}`}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentPage('profile')}
                className={currentPage === 'profile' ? 'text-red-500' : ''}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {currentPage === 'home' && <HomePage onAddToCart={() => setCartItemsCount(prev => prev + 1)} />}
        {currentPage === 'cart' && <CartPage onUpdateCart={setCartItemsCount} />}
        {currentPage === 'orders' && <OrderHistoryPage />}
        {currentPage === 'profile' && <ProfilePage onLogout={onLogout} />}
        {currentPage === 'favorites' && <FavoritesPage onAddToCart={() => setCartItemsCount(prev => prev + 1)} />}
        {currentPage === 'notifications' && <NotificationsPage />}
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="grid grid-cols-5 h-16">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentPage === 'home' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('favorites')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentPage === 'favorites' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">Favorites</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('cart')}
            className={`flex flex-col items-center justify-center gap-1 relative ${
              currentPage === 'cart' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                  {cartItemsCount}
                </Badge>
              )}
            </div>
            <span className="text-xs">Cart</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('orders')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentPage === 'orders' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('profile')}
            className="flex flex-col items-center justify-center gap-1 text-gray-400"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </nav>
    </div>
  );
}