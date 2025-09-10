import { Gamepad2, ArrowLeft } from "lucide-react";

export const ErrorMessage = ({ message, onRetry, type = "error" }) => {
  if (type === "notfound") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex flex-col items-center justify-center text-white px-4">
        <div className="text-center max-w-lg">
          <div className="flex justify-center mb-6">
            <Gamepad2 className="w-24 h-24 text-red-400" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Game Not Found
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            {message || "The requested game could not be found"}
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white font-bold rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Game Library
          </a>
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
