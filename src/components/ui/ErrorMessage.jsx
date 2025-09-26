import { Gamepad2, ArrowLeft, Home, Search } from "lucide-react";

export const ErrorMessage = ({ message, onRetry, type = "error" }) => {
  if (type === "notfound") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center max-w-xl">
          {/* Floating gamepad icon with glow */}
          <div className="flex justify-center mb-8 relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
            <Gamepad2
              className="w-32 h-32 text-red-400 relative z-10 animate-bounce"
              style={{ animationDuration: "3s" }}
            />
          </div>

          {/* Glitch effect title */}
          <h2 className="text-6xl font-black mb-6 relative">
            <span className="bg-gradient-to-r from-red-400 via-pink-500 to-red-600 bg-clip-text text-transparent block animate-pulse">
              404
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent block mt-2">
              Game Not Found
            </span>
          </h2>

          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              {message ||
                "Oops! The game you're looking for has vanished into the digital void. It might have been moved, deleted, or never existed."}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 border border-white/10"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Game Library
            </a>

            <a
              href="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Home
            </a>
          </div>

          {/* Search suggestion */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              Looking for something specific?
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <Search className="w-4 h-4" />
              Browse all games
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">
            {message || "Failed to load games data"}
          </p>
          <button
            onClick={onRetry || (() => window.location.reload())}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return null;
};
