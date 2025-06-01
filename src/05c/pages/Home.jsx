import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [procat, setProcat] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  const filteredProducts = procat
    ? products.filter(product => product.category === procat)
    : products;

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16 pb-12">
            <div className="inline-block animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent mb-6 tracking-tight">
                Selamat Datang di A-Shop
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Discover amazing products in our premium collection. Filter by category to find exactly what you're looking for.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Choose from our carefully curated categories</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto">
            <button
              onClick={() => setProcat(null)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                procat === null
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/30 border-2 border-blue-400"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-blue-400 border-2 border-slate-200 dark:border-blue-500/30 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setProcat(category)}
                className={`px-8 py-4 rounded-2xl capitalize font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  procat === category
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/30 border-2 border-blue-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-blue-400 border-2 border-slate-200 dark:border-blue-500/30 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Count */}
      <div className="bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-block bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-2xl px-8 py-4 shadow-sm">
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                Showing <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">{filteredProducts.length}</span> products
                {procat && (
                  <span> in <span className="text-blue-600 dark:text-blue-400 capitalize font-semibold">{procat}</span></span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-blue-600 dark:text-blue-400 text-xl font-semibold mt-6 animate-pulse">
                Loading amazing products...
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center place-content-center">
              {filteredProducts.map((product) => (
                <div key={product.id} className="animate-fade-in w-full flex justify-center">
                  <CardProduct {...product} />
                </div>
              ))}
            </div>
          ) : (
            /* No products message */
            <div className="text-center py-24">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-slate-500 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-6">
                No products found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xl max-w-md mx-auto leading-relaxed mb-8">
                We couldn't find any products in the <span className="text-blue-600 dark:text-blue-400 capitalize font-semibold">{procat}</span> category.
              </p>
              <button
                onClick={() => setProcat(null)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl shadow-blue-500/30"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}