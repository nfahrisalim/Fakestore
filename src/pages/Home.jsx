import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import About from "../components/About";
import ShoppingCart from "../components/ShoppingCart";
import { setupScrollAnimations } from "../lib/animations";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setupScrollAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        onSearch={setSearchTerm}
        onCartToggle={() => setIsCartOpen(true)}
      />
      <Hero />
      <ProductGrid searchTerm={searchTerm} />
      <About />
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-store text-white text-sm"></i>
                </div>
                <span className="text-xl font-bold">ModernStore</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Your trusted partner for premium products and exceptional shopping experience. 
                Discover quality, embrace innovation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li><button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Products</button></li>
                <li><button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Categories</button></li>
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 mt-8 text-center text-slate-400">
            <p>&copy; 2024 ModernStore. All rights reserved. Built with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
