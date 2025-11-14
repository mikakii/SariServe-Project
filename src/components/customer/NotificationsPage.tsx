import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bell, Package, Tag, Star, TrendingUp, Gift, Zap } from 'lucide-react';

interface Notification {
  id: number;
  type: 'order' | 'promo' | 'review' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: React.ReactNode;
  color: string;
}

export function NotificationsPage() {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD-2025-003 has been delivered successfully!',
      time: '5 mins ago',
      isRead: false,
      icon: <Package className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      id: 2,
      type: 'promo',
      title: 'Free Delivery Alert! 🎉',
      message: 'Get free delivery on all orders above ₱100 today only!',
      time: '1 hour ago',
      isRead: false,
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-orange-500'
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Preparing',
      message: 'Aling Nena\'s Store is preparing your order #ORD-2025-004',
      time: '2 hours ago',
      isRead: false,
      icon: <Package className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      id: 4,
      type: 'promo',
      title: 'New Voucher Available',
      message: 'You have a ₱50 voucher! Valid until Oct 31.',
      time: '1 day ago',
      isRead: true,
      icon: <Gift className="w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      id: 5,
      type: 'review',
      title: 'Rate Your Order',
      message: 'How was your experience with Ate Marie\'s Lutong Bahay?',
      time: '2 days ago',
      isRead: true,
      icon: <Star className="w-5 h-5" />,
      color: 'bg-yellow-500'
    },
    {
      id: 6,
      type: 'system',
      title: 'Popular Near You',
      message: 'Banana Cue is trending in your area! Order now.',
      time: '3 days ago',
      isRead: true,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-pink-500'
    },
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500">{unreadCount} unread</p>
            </div>
          </div>
          <button className="text-sm text-red-500 hover:text-red-600">
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map(notification => (
            <Card 
              key={notification.id} 
              className={`rounded-2xl border-0 shadow-md hover:shadow-lg transition-all ${
                !notification.isRead ? 'bg-gradient-to-r from-blue-50/50 to-purple-50/50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 ${notification.color} rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-md`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-gray-900 text-sm">{notification.title}</h3>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1.5"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
