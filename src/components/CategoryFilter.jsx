import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    { id: '', label: 'All Categories' },
    { id: 'men\'s clothing', label: 'Men\'s Clothing' },
    { id: 'women\'s clothing', label: 'Women\'s Clothing' },
    { id: 'jewelery', label: 'Jewelry' },
    { id: 'electronics', label: 'Electronics' },
  ];

  return (
    <section id="categories" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Shop by Category</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">Find exactly what you're looking for</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => onCategoryChange(category.id)}
                className={`px-6 py-3 font-medium transition-all duration-200 hover:scale-105 shadow-lg ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {category.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
