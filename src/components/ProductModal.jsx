import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf, ShoppingCart, Heart, X } from "lucide-react";
import { useCart } from "../hooks/useCart.jsx";

export default function ProductModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();

  if (!product) return null;

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

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{product.title}</DialogTitle>
            </DialogHeader>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-96 object-contain rounded-lg bg-slate-50 dark:bg-slate-700"
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <Badge className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {generateStars(product.rating.rate)}
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({product.rating.count} reviews)
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    ${product.price}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Description</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-semibold transition-all duration-200"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
