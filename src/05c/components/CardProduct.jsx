import { useLocation } from "wouter";
import { useCart } from "../contexts/CartContext";

export default function CardProduct({ id, title, price, description, image, category, rating }) {
  const [, navigate] = useLocation();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, title, price, description, image, category, rating });
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-[340px] h-[620px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-3xl overflow-hidden shadow-lg dark:shadow-blue-500/10 transition-all duration-500 hover:scale-105 hover:shadow-xl dark:hover:shadow-2xl hover:shadow-blue-500/25 dark:hover:shadow-blue-500/25 hover:border-blue-400 dark:hover:border-blue-400/50 group hover:-translate-y-2 cursor-pointer flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-[300px] w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
        />
        {/* Overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          <div className="w-10 h-10 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/30">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 space-y-4 flex flex-col flex-1">
        {/* Category and Rating Row */}
        <div className="flex items-center justify-between flex-shrink-0">
          <span className="inline-block text-xs bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full capitalize border border-blue-500/30 font-semibold backdrop-blur-sm">
            {category}
          </span>
          {rating && (
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-600">
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className="text-slate-900 dark:text-white text-xs font-bold">
                {rating.rate}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs">({rating.count})</span>
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight h-[56px] overflow-hidden group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-shrink-0">
          <span className="line-clamp-2">{title}</span>
        </h3>
        
        {/* Description */}
        <div className="flex-1 flex flex-col">
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed h-[84px] overflow-hidden group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
            <span className="line-clamp-4">{description}</span>
          </p>
        </div>
        
        {/* Price and Action Row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex flex-col space-y-1">
            <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              ${price}
            </span>
            <span className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">
              Free shipping
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="px-3 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-green-500/40 flex items-center text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13h10M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                />
              </svg>
            </button>
            <button
              onClick={handleViewDetails}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-blue-500/40 flex items-center space-x-2 text-sm"
            >
              <span>View</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}