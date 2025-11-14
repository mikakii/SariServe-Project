import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Heart, Plus, Star, Clock, Trash2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  storeName: string;
  deliveryTime: string;
  description: string;
}

interface FavoritesPageProps {
  onAddToCart: () => void;
}

export function FavoritesPage({ onAddToCart }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    { id: 1, name: 'Lucky Me Pancit Canton Chilimansi', price: 15, image: 'pancit canton noodles filipino', rating: 4.8, storeName: 'Aling Nena\'s Store', deliveryTime: '10-15 min', description: 'Classic Filipino instant noodles' },
    { id: 2, name: 'Tapsilog Rice Meal', price: 85, image: 'tapsilog beef rice filipino breakfast', rating: 4.7, storeName: 'Ate Marie\'s Lutong Bahay', deliveryTime: '15-20 min', description: 'Beef tapa, egg, and garlic rice' },
    { id: 3, name: 'Banana Cue (3pcs)', price: 35, image: 'banana cue filipino street food caramelized', rating: 4.8, storeName: 'Manong\'s Street Food', deliveryTime: '12-18 min', description: 'Caramelized banana skewers' },
    { id: 4, name: 'Piattos Cheese Flavor', price: 25, image: 'piattos chips cheese', rating: 4.8, storeName: 'QuickMart', deliveryTime: '8-12 min', description: 'Crunchy potato chips' },
    { id: 5, name: 'Chickenjoy (1pc with Rice)', price: 95, image: 'fried chicken rice meal filipino', rating: 4.9, storeName: 'Ate Marie\'s Lutong Bahay', deliveryTime: '15-20 min', description: 'Crispy fried chicken with rice' },
    { id: 6, name: 'Boy Bawang Cornick Garlic', price: 18, image: 'boy bawang cornick garlic snack', rating: 4.7, storeName: 'QuickMart', deliveryTime: '8-12 min', description: 'Crunchy corn snack' },
  ]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
    toast.success('Removed from favorites');
  };

  const handleAddToCart = (item: FavoriteItem) => {
    onAddToCart();
    toast.success(`${item.name} added to cart!`, {
      description: `From ${item.storeName}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-gray-900">My Favorites</h1>
            <p className="text-sm text-gray-500">{favorites.length} saved items</p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-pink-300" />
              </div>
              <h3 className="text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-4">Start adding your favorite items!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all border-0 shadow-md rounded-2xl group relative">
                <button
                  onClick={() => handleRemoveFavorite(item.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
                
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/400x400/?${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 text-xs bg-white/95 backdrop-blur-sm rounded-xl px-2 py-1.5 shadow-md">
                    <Clock className="w-3 h-3 text-green-600" />
                    <span className="text-gray-700">{item.deliveryTime}</span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{item.rating}</span>
                    <span className="text-xs text-gray-400 ml-auto truncate">{item.storeName}</span>
                  </div>
                  <h3 className="text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-1">{item.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-red-600">₱{item.price.toFixed(2)}</span>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(item)}
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl h-9 px-4"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
