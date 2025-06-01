import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../hooks/useCart.jsx";

export default function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-400 fill-current" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    // Wishlist functionality would be implemented here
    console.log('Toggle wishlist for:', product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onViewDetails}
    >
      <Card className="product-card bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl overflow-hidden group">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-contain bg-slate-50 dark:bg-slate-700 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleWishlist}
              className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
            </Button>
          </div>
          <div className="absolute top-2 left-2">
            <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {product.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {generateStars(product.rating.rate)}
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
              ({product.rating.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ${product.price}
            </span>
            <Button 
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
