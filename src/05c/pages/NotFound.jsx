import { useEffect } from "react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, navigate] = useLocation();

  // Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-200 dark:border-blue-500/20">
            <span className="text-6xl">😵</span>
          </div>
        </div>
        <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-6">
          404
        </h1>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl max-w-md mx-auto leading-relaxed mb-8">
          Oops! The page you're looking for doesn't exist. You'll be redirected to home page in a few seconds.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl shadow-blue-500/30"
        >
          Go Home Now
        </button>
      </div>
    </div>
  );
}