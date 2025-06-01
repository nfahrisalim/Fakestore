import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { Link } from "wouter";
import { useCart } from "../contexts/CartContext";

export default function ProductbyId() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  async function getProduct() {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-blue-600 dark:text-blue-400 text-xl font-semibold animate-pulse">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Product Not Found</h2>
          <Link href="/">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/">
          <button className="mb-8 flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Products</span>
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-3xl p-8 transition-colors duration-300">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[500px] object-contain rounded-2xl"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full capitalize border border-blue-500/30 font-semibold backdrop-blur-sm mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                {product.rating && (
                  <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="text-slate-900 dark:text-white font-bold">{product.rating.rate}</span>
                    <span className="text-slate-600 dark:text-slate-400 text-sm">({product.rating.count} reviews)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Description</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <p className="text-blue-600/70 dark:text-blue-400/70 font-medium mt-1">Free shipping included</p>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/40 flex items-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13h10M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}