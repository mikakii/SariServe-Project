import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Download, TrendingUp, Package, DollarSign } from 'lucide-react';

export function ReportsPage() {
  const salesData = [
    { date: 'Oct 24', sales: 3200 },
    { date: 'Oct 25', sales: 4100 },
    { date: 'Oct 26', sales: 3800 },
    { date: 'Oct 27', sales: 5200 },
    { date: 'Oct 28', sales: 4600 },
    { date: 'Oct 29', sales: 5800 },
    { date: 'Oct 30', sales: 6400 },
  ];

  const categoryData = [
    { name: 'Snacks', value: 35, color: '#f97316' },
    { name: 'Beverages', value: 28, color: '#3b82f6' },
    { name: 'Canned Goods', value: 20, color: '#10b981' },
    { name: 'Instant Noodles', value: 12, color: '#8b5cf6' },
    { name: 'Personal Care', value: 5, color: '#ec4899' },
  ];

  const topProducts = [
    { name: 'Coca-Cola 1.5L', sales: 145, revenue: 9425 },
    { name: 'Lucky Me Pancit Canton', sales: 132, revenue: 1980 },
    { name: 'Piattos Cheese', sales: 98, revenue: 2450 },
    { name: 'Argentina Corned Beef', sales: 76, revenue: 3420 },
    { name: 'Safeguard Soap', sales: 65, revenue: 2275 },
  ];

  const inventoryMovement = [
    { month: 'Jun', inStock: 1200, sold: 980 },
    { month: 'Jul', inStock: 1350, sold: 1100 },
    { month: 'Aug', inStock: 1280, sold: 1050 },
    { month: 'Sep', inStock: 1420, sold: 1200 },
    { month: 'Oct', inStock: 1380, sold: 1150 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900">Sales & Inventory Reports</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue (Oct)</p>
                <h3 className="text-gray-900">₱125,300</h3>
                <p className="text-sm text-green-600">+18.2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders (Oct)</p>
                <h3 className="text-gray-900">452</h3>
                <p className="text-sm text-blue-600">+12.5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Order Value</p>
                <h3 className="text-gray-900">₱277.21</h3>
                <p className="text-sm text-orange-600">+5.3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="rounded-xl border-0 shadow">
          <CardHeader>
            <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="rounded-xl border-0 shadow">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inventory Movement */}
        <Card className="rounded-xl border-0 shadow">
          <CardHeader>
            <CardTitle>Inventory Movement (5 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryMovement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inStock" fill="#10b981" name="In Stock" />
                <Bar dataKey="sold" fill="#f97316" name="Sold" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="rounded-xl border-0 shadow">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Units Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell className="text-green-600">₱{product.revenue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
