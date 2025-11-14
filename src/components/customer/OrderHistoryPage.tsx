import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Package, Clock, CheckCircle, XCircle, MapPin, Bike, Phone } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  items: number;
  storeName: string;
  estimatedTime?: string;
}

export function OrderHistoryPage() {
  const orders: Order[] = [
    { id: 'ORD-2025-003', date: '2025-10-30 12:30 PM', total: 135.00, status: 'on-the-way', items: 3, storeName: 'SariServe Express', estimatedTime: '5 mins' },
    { id: 'ORD-2025-002', date: '2025-10-29 10:15 AM', total: 245.00, status: 'delivered', items: 5, storeName: 'Aling Nena\'s Store' },
    { id: 'ORD-2025-001', date: '2025-10-28 03:45 PM', total: 185.50, status: 'delivered', items: 4, storeName: 'Ate Marie\'s Lutong Bahay' },
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'on-the-way':
        return <Bike className="w-5 h-5 text-blue-500" />;
      case 'preparing':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'pending':
        return <Package className="w-5 h-5 text-gray-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'on-the-way':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'preparing':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'pending':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'on-the-way':
        return 'On the Way';
      case 'preparing':
        return 'Preparing';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <h1 className="text-gray-900">My Orders</h1>
          <p className="text-sm text-gray-500">{orders.length} total orders</p>
        </div>

        <div className="space-y-3">
          {orders.map(order => (
            <Card key={order.id} className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      order.status === 'on-the-way' ? 'bg-blue-50' :
                      order.status === 'delivered' ? 'bg-green-50' : 'bg-gray-50'
                    }`}>
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-sm">{order.id}</h3>
                      <p className="text-xs text-gray-500">{order.storeName}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} border`}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                {/* Active Order Tracking */}
                {order.status === 'on-the-way' && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                        <Bike className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900">Your order is on the way!</h4>
                        <p className="text-xs text-gray-600">Arriving in {order.estimatedTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-white text-blue-600 hover:bg-gray-50 rounded-xl h-9 border border-blue-200">
                        <MapPin className="w-4 h-4 mr-2" />
                        Track Order
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl h-9 border-blue-200">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Order Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Order Date</span>
                    <span className="text-gray-900">{new Date(order.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Items</span>
                    <span className="text-gray-900">{order.items} items</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Total</span>
                    <span className="text-red-500">₱{order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                {order.status === 'delivered' && (
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                      Reorder
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                      View Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}