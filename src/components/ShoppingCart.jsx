import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart as CartIcon, Plus, Minus, Trash2, X } from "lucide-react";
import { useCart } from "../hooks/useCart.jsx";

export default function ShoppingCart({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-96 bg-white dark:bg-slate-800 shadow-2xl">
        <SheetHeader className="border-b border-slate-200 dark:border-slate-700 pb-4">
          <SheetTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <CartIcon className="mx-auto text-6xl text-slate-300 dark:text-slate-600 mb-4" size={96} />
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded-lg bg-white dark:bg-slate-600"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 dark:text-white text-sm line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-slate-900 dark:text-white">Total:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">
                Checkout
                <CartIcon className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
