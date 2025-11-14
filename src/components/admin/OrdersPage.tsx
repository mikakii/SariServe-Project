import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: { name: string; quantity: number; price: number }[];
}

export function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2025-001',
      customer: 'Juan Dela Cruz',
      date: '2025-10-30 10:30 AM',
      total: 245.50,
      status: 'pending',
      items: [
        { name: 'Lucky Me Pancit Canton', quantity: 2, price: 15 },
        { name: 'Coca-Cola 1.5L', quantity: 1, price: 65 },
      ]
    },
    {
      id: 'ORD-2025-002',
      customer: 'Maria Santos',
      date: '2025-10-30 11:15 AM',
      total: 180.00,
      status: 'processing',
      items: [
        { name: 'Piattos Cheese', quantity: 3, price: 25 },
      ]
    },
    {
      id: 'ORD-2025-003',
      customer: 'Pedro Reyes',
      date: '2025-10-30 12:00 PM',
      total: 95.00,
      status: 'completed',
      items: [
        { name: 'Safeguard Soap', quantity: 2, price: 35 },
      ]
    },
  ]);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-gray-900">Order Management</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <h3 className="text-gray-900">{orders.filter(o => o.status === 'pending').length}</h3>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Processing</p>
            <h3 className="text-gray-900">{orders.filter(o => o.status === 'processing').length}</h3>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <h3 className="text-gray-900">{orders.filter(o => o.status === 'completed').length}</h3>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <h3 className="text-gray-900">{orders.length}</h3>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="rounded-xl border-0 shadow">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>₱{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                          <DialogDescription>
                            Customer: {order.customer} • {order.date}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <p>{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <p>₱{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="border-t pt-4">
                            <div className="flex justify-between">
                              <span>Total</span>
                              <span className="text-green-600">₱{order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
