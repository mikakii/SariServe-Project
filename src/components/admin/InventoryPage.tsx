import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Search, AlertTriangle, TrendingDown, Package } from 'lucide-react';
import { Progress } from '../ui/progress';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  lastRestocked: string;
}

export function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const inventory: InventoryItem[] = [
    { id: 1, name: 'Lucky Me Pancit Canton', category: 'Instant Noodles', currentStock: 50, minStock: 20, maxStock: 100, lastRestocked: '2025-10-25' },
    { id: 2, name: 'Coca-Cola 1.5L', category: 'Beverages', currentStock: 15, minStock: 20, maxStock: 80, lastRestocked: '2025-10-28' },
    { id: 3, name: 'Piattos Cheese', category: 'Snacks', currentStock: 40, minStock: 15, maxStock: 100, lastRestocked: '2025-10-26' },
    { id: 4, name: 'Argentina Corned Beef', category: 'Canned Goods', currentStock: 8, minStock: 10, maxStock: 50, lastRestocked: '2025-10-20' },
    { id: 5, name: 'Safeguard Soap', category: 'Personal Care', currentStock: 60, minStock: 20, maxStock: 100, lastRestocked: '2025-10-29' },
  ];

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.currentStock < item.minStock);

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxStock) * 100;
    if (item.currentStock < item.minStock) return 'critical';
    if (percentage < 30) return 'low';
    if (percentage < 60) return 'medium';
    return 'good';
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      case 'low':
        return <Badge className="bg-orange-500">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      default:
        return <Badge className="bg-green-500">Good</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-gray-900">Inventory Tracking</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <h3 className="text-gray-900">{inventory.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Stock Items</p>
                <h3 className="text-gray-900">{lowStockItems.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Need Restock</p>
                <h3 className="text-gray-900">{lowStockItems.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="rounded-xl border-0 shadow">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map(item => {
                const status = getStockStatus(item);
                const percentage = Math.min((item.currentStock / item.maxStock) * 100, 100);
                
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <span className={item.currentStock < item.minStock ? 'text-red-600' : ''}>
                        {item.currentStock} / {item.maxStock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="w-24">
                        <Progress 
                          value={percentage} 
                          className={
                            status === 'critical' ? '[&>div]:bg-red-500' :
                            status === 'low' ? '[&>div]:bg-orange-500' :
                            status === 'medium' ? '[&>div]:bg-yellow-500' :
                            '[&>div]:bg-green-500'
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>{getStockBadge(status)}</TableCell>
                    <TableCell>{new Date(item.lastRestocked).toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
