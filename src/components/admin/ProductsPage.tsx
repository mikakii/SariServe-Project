import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Lucky Me Pancit Canton', category: 'Instant Noodles', price: 15, stock: 50 },
    { id: 2, name: 'Coca-Cola 1.5L', category: 'Beverages', price: 65, stock: 30 },
    { id: 3, name: 'Piattos Cheese', category: 'Snacks', price: 25, stock: 40 },
    { id: 4, name: 'Argentina Corned Beef', category: 'Canned Goods', price: 45, stock: 25 },
    { id: 5, name: 'Safeguard Soap', category: 'Personal Care', price: 35, stock: 60 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '', stock: '' });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
          : p
      ));
      toast.success('Product updated successfully');
    } else {
      const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product added successfully');
    }
    setIsAddDialogOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', category: '', price: '', stock: '' });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900">Product Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
              setEditingProduct(null);
              setFormData({ name: '', category: '', price: '', stock: '' });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Update product information' : 'Enter product details to add to inventory'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Canned Goods">Canned Goods</SelectItem>
                    <SelectItem value="Instant Noodles">Instant Noodles</SelectItem>
                    <SelectItem value="Personal Care">Personal Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₱)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingProduct ? 'Update' : 'Add'} Product
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-xl border-0 shadow">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
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
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₱{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={product.stock < 20 ? 'text-red-600' : ''}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(product)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {product.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
