import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { animateHeroElements } from "../lib/animations";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      animateHeroElements(heroRef.current);
    }
  }, []);

  const handleShopNow = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={heroRef} className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
      {/* Hero background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          className="hero-title text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Discover Amazing
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Products</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          Explore our curated collection of premium products with seamless shopping experience and fast delivery.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "backOut" }}
        >
          <Button 
            onClick={handleShopNow}
            className="hero-cta bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Shop Now
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="floating-element absolute top-10 right-10 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
          <i className="fas fa-shopping-bag text-blue-500 text-xl"></i>
        </div>
        <div className="floating-element absolute bottom-20 left-10 w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
          <i className="fas fa-heart text-red-500"></i>
        </div>
        <div className="floating-element absolute top-1/2 right-20 w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center">
          <i className="fas fa-star text-purple-500"></i>
        </div>
      </div>
    </section>
  );
}
