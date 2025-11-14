import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, ShoppingCart, Package, DollarSign, AlertCircle, Bell } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function DashboardPage() {
  const stats = [
    { label: 'Total Sales Today', value: '₱8,450.00', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Orders Today', value: '24', change: '+8 from yesterday', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Products', value: '156', change: '12 low stock', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Monthly Revenue', value: '₱125,300', change: '+18.2%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentOrders = [
    { id: 'ORD-2025-003', customer: 'Juan Dela Cruz', total: 95.00, status: 'pending' },
    { id: 'ORD-2025-002', customer: 'Maria Santos', total: 180.00, status: 'processing' },
    { id: 'ORD-2025-001', customer: 'Pedro Reyes', total: 245.50, status: 'completed' },
  ];

  const notifications = [
    { message: 'Coca-Cola 1.5L is running low on stock', type: 'warning', time: '5 min ago' },
    { message: 'New order received from Juan Dela Cruz', type: 'info', time: '10 min ago' },
    { message: 'Argentina Corned Beef needs restock', type: 'warning', time: '1 hour ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900">Dashboard</h1>
        <p className="text-gray-500">October 30, 2025</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="rounded-xl border-0 shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <p className="text-sm text-green-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 rounded-xl border-0 shadow">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">₱{order.total.toFixed(2)}</p>
                    <Badge className={
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-xl border-0 shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <Alert key={index} className="rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm">{notif.time}</AlertTitle>
                  <AlertDescription className="text-sm">
                    {notif.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
