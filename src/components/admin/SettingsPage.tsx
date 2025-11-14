import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Store, Bell, CreditCard, Truck, Globe, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function SettingsPage() {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your store settings and preferences</p>
      </div>

      {/* Store Information */}
      <Card className="rounded-xl border-0 shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5 text-green-600" />
            Store Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input defaultValue="SariServe Express" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input defaultValue="+63 917 123 4567" className="h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Store Address</Label>
            <Input defaultValue="123 Mabini St, Quezon City, Metro Manila" className="h-12" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea defaultValue="Your favorite Sari-Sari store delivering fresh Filipino food!" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="rounded-xl border-0 shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Opening Time</Label>
              <Input type="time" defaultValue="07:00" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label>Closing Time</Label>
              <Input type="time" defaultValue="22:00" className="h-12" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm">24/7 Operations</p>
              <p className="text-xs text-gray-500">Store operates all day, every day</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Settings */}
      <Card className="rounded-xl border-0 shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-orange-600" />
            Delivery Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Delivery Fee</Label>
              <Input type="number" defaultValue="20" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label>Free Delivery Above</Label>
              <Input type="number" defaultValue="100" className="h-12" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Max Delivery Radius (km)</Label>
              <Input type="number" defaultValue="5" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label>Avg Delivery Time (mins)</Label>
              <Input type="number" defaultValue="20" className="h-12" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="rounded-xl border-0 shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm">New Order Alerts</p>
              <p className="text-xs text-gray-500">Get notified when new orders arrive</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm">Low Stock Warnings</p>
              <p className="text-xs text-gray-500">Alert when products are running low</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm">Daily Sales Report</p>
              <p className="text-xs text-gray-500">Receive daily sales summary via email</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="rounded-xl border-0 shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-pink-600" />
            Accepted Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm">Cash on Delivery</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm">GCash</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm">Credit/Debit Card</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 h-12 px-8 rounded-xl">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
