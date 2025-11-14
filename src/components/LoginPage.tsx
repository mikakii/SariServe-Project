import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Store, ShoppingBag, Bike } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'customer' | 'admin') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showRegister, setShowRegister] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [pendingRole, setPendingRole] = useState<'customer' | 'admin'>('customer');
  const [otp, setOtp] = useState('');

  const handleLoginSubmit = (e: React.FormEvent, role: 'customer' | 'admin') => {
    e.preventDefault();
    setPendingRole(role);
    setShow2FA(true);
  };

  const handleVerify2FA = () => {
    if (otp.length === 6) {
      setShow2FA(false);
      onLogin(pendingRole);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-br from-red-500 via-orange-500 to-orange-400 pt-12 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="text-white text-6xl absolute top-20 left-5">🍜</div>
          <div className="text-white text-6xl absolute bottom-20 right-5">🥤</div>
          <div className="text-white text-6xl absolute top-40 right-20">🍪</div>
        </div>
        <div className="max-w-md mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl mb-6 shadow-2xl">
            <span className="text-4xl">🏪</span>
          </div>
          <h1 className="text-white mb-3">SariServe</h1>
          <p className="text-white/90 text-lg">Your favorite Sari-Sari store food, delivered fresh! 🍲</p>
        </div>
      </div>

      {/* Login Card */}
      <div className="flex-1 -mt-20 px-4 pb-8">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-gray-100">
              <TabsTrigger value="customer" className="data-[state=active]:bg-white">Customer</TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-white">Store Owner</TabsTrigger>
            </TabsList>

            <TabsContent value="customer">
              <Card className="border-0 shadow-xl">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-gray-900">Welcome back!</CardTitle>
                  <CardDescription>Login to start ordering from your favorite stores</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleLoginSubmit(e, 'customer')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer-email">Email or Phone</Label>
                      <Input 
                        id="customer-email" 
                        type="text" 
                        placeholder="Enter your email or phone" 
                        className="h-12"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer-password">Password</Label>
                      <Input 
                        id="customer-password" 
                        type="password" 
                        placeholder="Enter your password" 
                        className="h-12"
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                      Login
                    </Button>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">New to SariServe?</span>
                      </div>
                    </div>
                    <Button type="button" variant="outline" className="w-full h-12 border-2" onClick={() => setShowRegister(true)}>
                      Create Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="border-0 shadow-xl">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-gray-900">Store Owner Portal</CardTitle>
                  <CardDescription>Manage your store and track orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleLoginSubmit(e, 'admin')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input 
                        id="admin-email" 
                        type="email" 
                        placeholder="admin@store.com" 
                        className="h-12"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input 
                        id="admin-password" 
                        type="password" 
                        placeholder="Enter your password" 
                        className="h-12"
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      Login to Dashboard
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={show2FA} onOpenChange={setShow2FA}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify your identity</DialogTitle>
            <DialogDescription>
              Enter the 6-digit code sent to your registered email/phone
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="text-center tracking-[0.5em] h-14 text-xl"
              />
            </div>
            <Button 
              onClick={handleVerify2FA} 
              className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              disabled={otp.length !== 6}
            >
              Verify & Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}