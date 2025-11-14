import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Search, Mail, Phone, Eye } from 'lucide-react';
import { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const customers: Customer[] = [
    { id: 1, name: 'Juan Dela Cruz', email: 'juan@email.com', phone: '+63 917 123 4567', orders: 24, totalSpent: 2450, status: 'active', joinedDate: '2025-01-15' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '+63 918 234 5678', orders: 18, totalSpent: 1890, status: 'active', joinedDate: '2025-02-20' },
    { id: 3, name: 'Pedro Reyes', email: 'pedro@email.com', phone: '+63 919 345 6789', orders: 32, totalSpent: 3200, status: 'active', joinedDate: '2024-12-10' },
    { id: 4, name: 'Ana Garcia', email: 'ana@email.com', phone: '+63 920 456 7890', orders: 5, totalSpent: 450, status: 'inactive', joinedDate: '2025-09-05' },
    { id: 5, name: 'Carlos Martinez', email: 'carlos@email.com', phone: '+63 921 567 8901', orders: 15, totalSpent: 1650, status: 'active', joinedDate: '2025-03-12' },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Customer Management</h1>
          <p className="text-gray-500">Manage and view customer information</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Customers</p>
            <h3 className="text-gray-900">{customers.length}</h3>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Active</p>
            <h3 className="text-gray-900">{customers.filter(c => c.status === 'active').length}</h3>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <h3 className="text-gray-900">{customers.reduce((sum, c) => sum + c.orders, 0)}</h3>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <h3 className="text-gray-900">₱{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</h3>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="rounded-xl border-0 shadow">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map(customer => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {customer.phone}
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="text-green-600">₱{customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(customer.joinedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
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
