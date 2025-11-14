import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Plus, Star, Clock, Zap, TrendingUp, Percent, Flame } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  rating: number;
  storeName: string;
  deliveryTime: string;
  discount?: number;
  description: string;
  isPopular?: boolean;
}

interface HomePageProps {
  onAddToCart: () => void;
}

export function HomePage({ onAddToCart }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: '🏪', gradient: 'from-purple-400 to-pink-400' },
    { name: 'Instant Meals', icon: '🍜', gradient: 'from-orange-400 to-red-400' },
    { name: 'Drinks', icon: '🥤', gradient: 'from-blue-400 to-cyan-400' },
    { name: 'Snacks', icon: '🍪', gradient: 'from-yellow-400 to-orange-400' },
    { name: 'Rice Meals', icon: '🍱', gradient: 'from-green-400 to-emerald-400' },
    { name: 'Street Food', icon: '🌭', gradient: 'from-red-400 to-pink-400' },
  ];

  const products: Product[] = [
    { 
      id: 1, 
      name: 'Lucky Me Pancit Canton Chilimansi', 
      price: 15, 
      category: 'Instant Meals', 
      stock: 50, 
      image: 'pancit canton noodles filipino', 
      rating: 4.8, 
      storeName: 'Aling Nena\'s Store', 
      deliveryTime: '10-15 min', 
      discount: 10,
      description: 'Classic Filipino instant noodles',
      isPopular: true
    },
    { 
      id: 2, 
      name: 'Coca-Cola 1.5L', 
      price: 65, 
      category: 'Drinks', 
      stock: 30, 
      image: 'coca cola bottle', 
      rating: 5, 
      storeName: 'SariServe Express', 
      deliveryTime: '5-10 min',
      description: 'Ice-cold refreshment',
      isPopular: true
    },
    { 
      id: 3, 
      name: 'Piattos Cheese Flavor', 
      price: 25, 
      category: 'Snacks', 
      stock: 40, 
      image: 'piattos chips cheese', 
      rating: 4.8, 
      storeName: 'QuickMart', 
      deliveryTime: '8-12 min', 
      discount: 15,
      description: 'Crunchy potato chips'
    },
    { 
      id: 4, 
      name: 'Lumpiang Shanghai (10pcs)', 
      price: 80, 
      category: 'Rice Meals', 
      stock: 15, 
      image: 'lumpia spring rolls filipino food', 
      rating: 4.9, 
      storeName: 'Aling Nena\'s Store', 
      deliveryTime: '20-25 min',
      description: 'Fresh homemade spring rolls',
      isPopular: true
    },
    { 
      id: 5, 
      name: 'Tapsilog Rice Meal', 
      price: 85, 
      category: 'Rice Meals', 
      stock: 12, 
      image: 'tapsilog beef rice filipino breakfast', 
      rating: 4.7, 
      storeName: 'Ate Marie\'s Lutong Bahay', 
      deliveryTime: '15-20 min',
      description: 'Beef tapa, egg, and garlic rice',
      isPopular: true
    },
    { 
      id: 6, 
      name: 'Skyflakes Crackers', 
      price: 30, 
      category: 'Snacks', 
      stock: 35, 
      image: 'skyflakes crackers philippines', 
      rating: 4.6, 
      storeName: 'QuickMart', 
      deliveryTime: '8-12 min',
      description: 'Classic Filipino crackers'
    },
    { 
      id: 7, 
      name: 'C2 Green Tea Apple', 
      price: 20, 
      category: 'Drinks', 
      stock: 45, 
      image: 'c2 green tea apple philippines', 
      rating: 4.4, 
      storeName: 'SariServe Express', 
      deliveryTime: '5-10 min', 
      discount: 5,
      description: 'Refreshing green tea drink'
    },
    { 
      id: 8, 
      name: 'Fish Ball with Sauce (10pcs)', 
      price: 25, 
      category: 'Street Food', 
      stock: 20, 
      image: 'fish balls filipino street food sauce', 
      rating: 4.5, 
      storeName: 'Manong\'s Street Food', 
      deliveryTime: '12-18 min',
      description: 'Classic Filipino street food'
    },
    { 
      id: 9, 
      name: 'Nissin Cup Noodles Seafood', 
      price: 35, 
      category: 'Instant Meals', 
      stock: 40, 
      image: 'cup noodles seafood instant', 
      rating: 4.6, 
      storeName: 'SariServe Express', 
      deliveryTime: '5-10 min',
      description: 'Instant cup noodles'
    },
    { 
      id: 10, 
      name: 'Chickenjoy (1pc with Rice)', 
      price: 95, 
      category: 'Rice Meals', 
      stock: 8, 
      image: 'fried chicken rice meal filipino', 
      rating: 4.9, 
      storeName: 'Ate Marie\'s Lutong Bahay', 
      deliveryTime: '15-20 min',
      description: 'Crispy fried chicken with rice',
      isPopular: true
    },
    { 
      id: 11, 
      name: 'Kwek-Kwek (6pcs)', 
      price: 30, 
      category: 'Street Food', 
      stock: 18, 
      image: 'kwek kwek quail eggs filipino street food', 
      rating: 4.4, 
      storeName: 'Manong\'s Street Food', 
      deliveryTime: '12-18 min',
      description: 'Deep-fried quail eggs'
    },
    { 
      id: 12, 
      name: 'Royal Tru-Orange 1L', 
      price: 45, 
      category: 'Drinks', 
      stock: 25, 
      image: 'royal orange drink philippines', 
      rating: 4.3, 
      storeName: 'SariServe Express', 
      deliveryTime: '5-10 min',
      description: 'Orange-flavored soft drink'
    },
    { 
      id: 13, 
      name: 'Boy Bawang Cornick Garlic', 
      price: 18, 
      category: 'Snacks', 
      stock: 50, 
      image: 'boy bawang cornick garlic snack', 
      rating: 4.7, 
      storeName: 'QuickMart', 
      deliveryTime: '8-12 min',
      description: 'Crunchy corn snack',
      isPopular: true
    },
    { 
      id: 14, 
      name: 'Siomai Rice (6pcs)', 
      price: 70, 
      category: 'Rice Meals', 
      stock: 10, 
      image: 'siomai rice filipino dimsum', 
      rating: 4.6, 
      storeName: 'Ate Marie\'s Lutong Bahay', 
      deliveryTime: '15-20 min',
      description: 'Steamed pork dumplings with rice'
    },
    { 
      id: 15, 
      name: 'Banana Cue (3pcs)', 
      price: 35, 
      category: 'Street Food', 
      stock: 12, 
      image: 'banana cue filipino street food caramelized', 
      rating: 4.8, 
      storeName: 'Manong\'s Street Food', 
      deliveryTime: '12-18 min',
      description: 'Caramelized banana skewers',
      isPopular: true
    },
    { 
      id: 16, 
      name: 'Oishi Prawn Crackers', 
      price: 22, 
      category: 'Snacks', 
      stock: 38, 
      image: 'oishi prawn crackers spicy', 
      rating: 4.5, 
      storeName: 'QuickMart', 
      deliveryTime: '8-12 min',
      description: 'Spicy prawn crackers'
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularProducts = products.filter(p => p.isPopular);

  const handleAddToCart = (product: Product) => {
    onAddToCart();
    toast.success(`${product.name} added to cart!`, {
      description: `From ${product.storeName}`,
    });
  };

  return (
    <div className="space-y-6 p-4 pb-8">
      {/* Search Bar */}
      <div className="sticky top-[73px] md:top-[65px] z-40 bg-gradient-to-b from-gray-50 to-transparent -mx-4 px-4 py-3 pb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for Filipino food, snacks, drinks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-2xl border-0 bg-white shadow-lg shadow-gray-200/50 text-base"
          />
        </div>
      </div>

      {/* Promo Banner */}
      <div className="relative bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-3xl p-6 text-white overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-4 right-4 text-5xl opacity-20">🍜</div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-6 h-6 animate-pulse" />
            <span className="text-sm tracking-wide uppercase">Hot Deals!</span>
          </div>
          <h2 className="text-white mb-2 text-2xl">Free Delivery on ₱100+</h2>
          <p className="text-white/95 mb-4">Get your favorite Sari-Sari store food delivered!</p>
          <Button size="sm" className="bg-white text-red-600 hover:bg-gray-100 h-10 px-6 rounded-xl shadow-lg">
            Order Now 🚀
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-gray-900 mb-3 px-1">Categories</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col items-center gap-2 min-w-[85px] p-4 rounded-2xl transition-all ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-br ' + category.gradient + ' shadow-lg scale-105'
                  : 'bg-white hover:bg-gray-50 shadow-md'
              }`}
            >
              <span className="text-3xl">{category.icon}</span>
              <span className={`text-xs whitespace-nowrap text-center leading-tight ${
                selectedCategory === category.name ? 'text-white' : 'text-gray-700'
              }`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      {selectedCategory === 'All' && (
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="text-gray-900">Popular Right Now</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularProducts.slice(0, 4).map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all border-0 shadow-lg rounded-2xl group bg-gradient-to-br from-white to-orange-50/30">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 relative overflow-hidden">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/400x400/?${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                      <Flame className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                  {product.discount && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white shadow-lg">-{product.discount}%</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <h3 className="text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      {product.discount ? (
                        <div className="flex items-center gap-1">
                          <span className="text-red-600">₱{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                          <span className="text-xs text-gray-400 line-through">₱{product.price}</span>
                        </div>
                      ) : (
                        <span className="text-red-600">₱{product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 h-8 w-8 p-0 rounded-full shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Products */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="text-gray-900">{selectedCategory === 'All' ? 'All Items' : selectedCategory}</h3>
            <p className="text-sm text-gray-500">{filteredProducts.length} items available</p>
          </div>
          <Button variant="ghost" size="sm" className="text-red-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            Sort
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all border-0 shadow-md rounded-2xl group">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <ImageWithFallback
                  src={`https://source.unsplash.com/400x400/?${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 text-white shadow-lg">-{product.discount}%</Badge>
                  </div>
                )}
                {product.stock < 20 && !product.isPopular && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-orange-500 shadow-lg">Low Stock</Badge>
                  </div>
                )}
                {product.isPopular && !product.discount && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                      <Flame className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 text-xs bg-white/95 backdrop-blur-sm rounded-xl px-2 py-1.5 shadow-md">
                  <Clock className="w-3 h-3 text-green-600" />
                  <span className="text-gray-700">{product.deliveryTime}</span>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400 ml-auto truncate">{product.storeName}</span>
                </div>
                <h3 className="text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.description}</p>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    {product.discount ? (
                      <div className="flex items-center gap-1">
                        <span className="text-red-600">₱{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                        <span className="text-xs text-gray-400 line-through">₱{product.price}</span>
                      </div>
                    ) : (
                      <span className="text-red-600">₱{product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 h-8 w-8 p-0 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}