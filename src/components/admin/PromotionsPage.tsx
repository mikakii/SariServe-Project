import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Gift, Plus, Percent, Calendar, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Promotion {
  id: number;
  title: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount?: number;
  validUntil: string;
  usageCount: number;
  status: 'active' | 'inactive';
}

export function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([
    { id: 1, title: 'Free Delivery', code: 'FREEDEL', discount: 20, type: 'fixed', minOrder: 100, validUntil: '2025-11-30', usageCount: 142, status: 'active' },
    { id: 2, title: '15% Off Everything', code: 'SAVE15', discount: 15, type: 'percentage', minOrder: 200, maxDiscount: 100, validUntil: '2025-11-15', usageCount: 89, status: 'active' },
    { id: 3, title: 'New User Bonus', code: 'WELCOME50', discount: 50, type: 'fixed', minOrder: 150, validUntil: '2025-12-31', usageCount: 234, status: 'active' },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Promotions & Vouchers</h1>
          <p className="text-gray-500">Manage discount codes and special offers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
              <DialogDescription>Set up a new discount code or voucher</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Promotion Title</Label>
                <Input placeholder="e.g., Weekend Sale" className="h-12" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Promo Code</Label>
                  <Input placeholder="SAVE20" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Discount Amount</Label>
                  <Input type="number" placeholder="20" className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Valid Until</Label>
                <Input type="date" className="h-12" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 rounded-xl" onClick={() => {
                toast.success('Promotion created successfully!');
                setIsAddDialogOpen(false);
              }}>
                Create Promotion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Promos</p>
                <h3 className="text-gray-900">{promotions.filter(p => p.status === 'active').length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <Percent className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Usage</p>
                <h3 className="text-gray-900">{promotions.reduce((sum, p) => sum + p.usageCount, 0)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <h3 className="text-gray-900">465</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Discount Given</p>
                <h3 className="text-gray-900">₱8.2K</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map(promo => (
          <Card key={promo.id} className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <Badge className={promo.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                  {promo.status}
                </Badge>
              </div>
              
              <h3 className="text-gray-900 mb-2">{promo.title}</h3>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-500 mb-1">Promo Code</p>
                <p className="text-lg tracking-wider text-red-600">{promo.code}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-gray-900">
                    {promo.type === 'percentage' ? `${promo.discount}%` : `₱${promo.discount}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Min. Order</span>
                  <span className="text-gray-900">₱{promo.minOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Usage</span>
                  <span className="text-gray-900">{promo.usageCount} times</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Valid Until</span>
                  <span className="text-gray-900">{new Date(promo.validUntil).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl text-red-500 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
