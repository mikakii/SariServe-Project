import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Minus, Plus, Trash2, ShoppingBag, Bike, Clock, MapPin } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import { Separator } from '../ui/separator';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  storeName: string;
  description?: string;
}

interface CartPageProps {
  onUpdateCart: (count: number) => void;
}

export function CartPage({ onUpdateCart }: CartPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Lucky Me Pancit Canton Chilimansi', price: 15, quantity: 2, image: 'pancit canton noodles filipino', storeName: 'Aling Nena\'s Store', description: 'Classic instant noodles' },
    { id: 2, name: 'Tapsilog Rice Meal', price: 85, quantity: 1, image: 'tapsilog beef rice filipino breakfast', storeName: 'Ate Marie\'s Lutong Bahay', description: 'Beef tapa, egg, and garlic rice' },
    { id: 3, name: 'Fish Ball with Sauce (10pcs)', price: 25, quantity: 2, image: 'fish balls filipino street food sauce', storeName: 'Manong\'s Street Food', description: 'Classic street food' },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      onUpdateCart(updated.reduce((sum, item) => sum + item.quantity, 0));
      return updated;
    });
  };

  const removeItem = (id: number) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      onUpdateCart(updated.reduce((sum, item) => sum + item.quantity, 0));
      return updated;
    });
    toast.success('Item removed from cart');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 100 ? 0 : 20;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    toast.success('Order placed successfully!', {
      description: 'Your order is being prepared. Track it in Orders.',
    });
    setCartItems([]);
    onUpdateCart(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-gray-900">My Cart</h1>
          <p className="text-sm text-gray-500">{cartItems.length} items</p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some delicious items to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Delivery Info */}
            <Card className="rounded-2xl border-0 shadow-md bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden relative">
              <div className="absolute top-0 right-0 text-6xl opacity-10">🚴</div>
              <CardContent className="p-4 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bike className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">Fast Delivery</h3>
                      {deliveryFee === 0 && (
                        <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full font-medium shadow-sm">FREE 🎉</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>Quezon City, Metro Manila</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>Arrives in 15-25 mins</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map(item => (
                <Card key={item.id} className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                        <ImageWithFallback
                          src={`https://source.unsplash.com/200x200/?${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 mb-0.5 truncate">{item.name}</h3>
                        {item.description && (
                          <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                        )}
                        <p className="text-xs text-gray-400 mb-3">{item.storeName}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-red-600">₱{item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 shadow-sm">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-8 w-8 p-0 rounded-full hover:bg-white"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 text-center text-sm">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="h-8 w-8 p-0 rounded-full hover:bg-white"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0 rounded-full">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="rounded-2xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove item?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Remove {item.name} from your cart?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => removeItem(item.id)} className="bg-red-500 hover:bg-red-600 rounded-xl">
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card className="rounded-2xl border-0 shadow-md sticky bottom-20 md:bottom-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span className="text-gray-900">₱{deliveryFee.toFixed(2)}</span>
                  )}
                </div>
                {deliveryFee > 0 && subtotal < 100 && (
                  <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                    Add ₱{(100 - subtotal).toFixed(2)} more for free delivery!
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-red-500">₱{total.toFixed(2)}</span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 h-12 rounded-xl shadow-lg">
                      Place Order • ₱{total.toFixed(2)}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Order</AlertDialogTitle>
                      <AlertDialogDescription>
                        Ready to place your order for ₱{total.toFixed(2)}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCheckout} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl">
                        Confirm Order
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}