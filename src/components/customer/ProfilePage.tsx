import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User, MapPin, CreditCard, Bell, HelpCircle, Settings, LogOut, ChevronRight, Gift, Shield, Phone, Mail, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ProfilePageProps {
  onLogout: () => void;
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '+63 917 123 4567'
  });

  const addresses = [
    { id: 1, label: 'Home', address: '123 Mabini St, Quezon City, Metro Manila', isDefault: true },
    { id: 2, label: 'Work', address: '456 Rizal Ave, Makati, Metro Manila', isDefault: false },
  ];

  const paymentMethods = [
    { id: 1, type: 'GCash', number: '0917 123 4567', isDefault: true },
    { id: 2, type: 'Card', number: '**** **** **** 1234', isDefault: false },
  ];

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Profile Header */}
        <Card className="rounded-2xl border-0 shadow-md bg-gradient-to-br from-red-500 via-orange-500 to-orange-400 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 text-8xl">🏪</div>
          </div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juan" />
                <AvatarFallback className="bg-white text-red-500 text-xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-white mb-1">{profileData.name}</h2>
                <p className="text-white/90 text-sm mb-1">{profileData.email}</p>
                <p className="text-white/90 text-sm">{profileData.phone}</p>
                <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="mt-3 bg-white text-red-500 hover:bg-gray-100 rounded-xl">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>Update your personal information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditingProfile(false)} className="rounded-xl">
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl">
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <h3 className="text-gray-900 mb-1">24</h3>
              <p className="text-xs text-gray-500">Orders</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <h3 className="text-gray-900 mb-1">₱2.5K</h3>
              <p className="text-xs text-gray-500">Spent</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <h3 className="text-gray-900 mb-1">12</h3>
              <p className="text-xs text-gray-500">Favorites</p>
            </CardContent>
          </Card>
        </div>

        {/* Saved Addresses */}
        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                Saved Addresses
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-red-500">
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {addresses.map(addr => (
              <div key={addr.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-500" />
                Payment Methods
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-red-500">
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map(method => (
              <div key={method.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{method.type}</span>
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{method.number}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <Gift className="w-5 h-5 text-orange-500" />
              <span className="flex-1 text-left">Vouchers & Promos</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-blue-500" />
              <span className="flex-1 text-left">Notifications</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="flex-1 text-left">Privacy & Security</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <HelpCircle className="w-5 h-5 text-purple-500" />
              <span className="flex-1 text-left">Help & Support</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <Settings className="w-5 h-5 text-gray-500" />
              <span className="flex-1 text-left">App Settings</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          onClick={onLogout}
          variant="outline" 
          className="w-full h-12 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
