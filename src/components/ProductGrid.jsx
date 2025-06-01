import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "../hooks/useProducts.jsx";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import CategoryFilter from "./CategoryFilter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProductGrid({ searchTerm: propSearchTerm = "" }) {
  const { data: products, isLoading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Update local search term when prop changes
  useEffect(() => {
    setSearchTerm(propSearchTerm);
  }, [propSearchTerm]);

  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    if (sortBy && sortBy !== 'default') {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name':
            return a.title.localeCompare(b.title);
          case 'rating':
            return b.rating.rate - a.rating.rate;
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  if (error) {
    return (
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-exclamation-triangle text-red-500 text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Failed to load products</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              There was an error loading products from the FakeStore API: {error.message}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      
      <section id="products" className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Products</h2>
            
            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <div className="relative sm:hidden">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              </div>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill().map((_, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="loading-skeleton h-48 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="loading-skeleton h-4 w-3/4 rounded"></div>
                    <div className="loading-skeleton h-4 w-1/2 rounded"></div>
                    <div className="loading-skeleton h-8 w-full rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <i className="fas fa-search text-6xl text-slate-300 dark:text-slate-600 mb-4"></i>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No products found</h3>
              <p className="text-slate-500 dark:text-slate-500 mb-6">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSortBy('default');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard 
                      product={product} 
                      onViewDetails={() => setSelectedProduct(product)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
