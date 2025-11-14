import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Bike, MapPin, Phone, Package, Clock } from 'lucide-react';

interface Delivery {
  id: string;
  orderId: string;
  rider: string;
  customer: string;
  address: string;
  status: 'preparing' | 'picked-up' | 'on-the-way' | 'delivered';
  estimatedTime: string;
  distance: string;
}

export function DeliveryPage() {
  const deliveries: Delivery[] = [
    { id: 'DEL-001', orderId: 'ORD-2025-003', rider: 'Mark Santos', customer: 'Juan Dela Cruz', address: '123 Mabini St, Quezon City', status: 'on-the-way', estimatedTime: '5 mins', distance: '1.2 km' },
    { id: 'DEL-002', orderId: 'ORD-2025-004', rider: 'Leo Garcia', customer: 'Maria Santos', address: '456 Rizal Ave, Makati', status: 'picked-up', estimatedTime: '15 mins', distance: '3.5 km' },
    { id: 'DEL-003', orderId: 'ORD-2025-005', rider: 'Anna Cruz', customer: 'Pedro Reyes', address: '789 EDSA, Pasig', status: 'preparing', estimatedTime: '25 mins', distance: '5.8 km' },
  ];

  const getStatusColor = (status: Delivery['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'on-the-way': return 'bg-blue-100 text-blue-700';
      case 'picked-up': return 'bg-orange-100 text-orange-700';
      case 'preparing': return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Delivery['status']) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'on-the-way': return 'On the Way';
      case 'picked-up': return 'Picked Up';
      case 'preparing': return 'Preparing';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Delivery Management</h1>
        <p className="text-gray-500">Track and manage active deliveries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Bike className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Deliveries</p>
                <h3 className="text-gray-900">3</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Today</p>
                <h3 className="text-gray-900">18</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Delivery Time</p>
                <h3 className="text-gray-900">18 mins</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Bike className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Riders</p>
                <h3 className="text-gray-900">5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <div className="space-y-4">
        {deliveries.map(delivery => (
          <Card key={delivery.id} className="rounded-xl border-0 shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bike className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Delivery ID</p>
                    <p className="text-sm">{delivery.id}</p>
                    <p className="text-xs text-gray-500 mt-1">{delivery.orderId}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Rider</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                          {delivery.rider.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm">{delivery.rider}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Customer</p>
                    <p className="text-sm">{delivery.customer}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{delivery.address}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <Badge className={getStatusColor(delivery.status)}>
                      {getStatusText(delivery.status)}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">ETA: {delivery.estimatedTime}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <MapPin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
