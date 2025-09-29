import { useRef, useEffect } from "react";
import { safeIsGameFavorited, getRatingColor, formatDate } from "../../utils";

import { Heart, Trash2, Gamepad2, Star, Calendar, X } from "lucide-react";

const RatingViewsModal = ({
  show,
  onClose,
  toggleFavorite,
  removeRating,
  ratingViews,
  handleGameSelect,
  isGameFavorited,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [onClose, show]);

  if (!show) return null;

  const ratingsArray = Array.isArray(ratingViews) ? ratingViews : [];

  const sortedRatings = [...ratingsArray].sort(
    (a, b) => new Date(b.released) - new Date(a.released)
  );

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Star className="text-yellow-200 flex-shrink-0" size={24} />
              <h2 className="text-lg sm:text-2xl font-bold truncate">
                My Ratings
              </h2>
              <span className="hidden sm:inline-flex bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm flex-shrink-0">
                {ratingsArray.length} games
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors flex-shrink-0"
              aria-label="Close Rating Views Modal"
            >
              <X size={18} />
            </button>
          </div>
          <span className="sm:hidden inline-flex bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs mt-2">
            {ratingsArray.length} games
          </span>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {ratingsArray.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Star
                size={48}
                className="mx-auto text-gray-300 mb-4 sm:w-16 sm:h-16"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                No ratings yet
              </h3>
              <p className="text-sm sm:text-base text-gray-500 px-4">
                Start rating games and they will appear here!
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] sm:max-h-96 overflow-y-auto">
              {sortedRatings.map((game) => {
                const isFavorited = safeIsGameFavorited(
                  isGameFavorited,
                  game.id
                );
                const ratingColor = getRatingColor(game.rating) || "";
                const formattedDate = formatDate(game.released) || "";

                return (
                  <div
                    key={game.id}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <img
                      src={
                        game.background_image ||
                        "https://via.placeholder.com/80x60?text=No+Image"
                      }
                      alt={game.name}
                      className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded-lg shadow-sm flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/80x60?text=No+Image";
                      }}
                    />
                    <div
                      className="flex-1 cursor-pointer min-w-0"
                      onClick={() => handleGameSelect(game)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleGameSelect(game);
                      }}
                    >
                      <h4 className="font-semibold text-gray-800 hover:text-purple-600 transition-colors text-sm sm:text-base truncate">
                        {game.name}
                      </h4>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1 overflow-hidden">
                        {game.genres?.length > 0 && (
                          <span className="flex items-center gap-1 flex-shrink-0">
                            <Gamepad2 size={10} className="sm:w-3 sm:h-3" />
                            <span className="truncate">
                              {game.genres[0].name}
                            </span>
                          </span>
                        )}
                        <span className="hidden sm:flex items-center gap-1 flex-shrink-0">
                          <Calendar size={12} />
                          {formattedDate}
                        </span>
                        {game.rating && (
                          <span
                            className={`flex items-center gap-1 flex-shrink-0 ${ratingColor}`}
                          >
                            <Star size={10} className="sm:w-3 sm:h-3" />
                            {game.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(game);
                        }}
                        className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ease-in-out hover:scale-110 ${
                          isFavorited
                            ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100"
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                        title={
                          isFavorited
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                        aria-label={
                          isFavorited
                            ? `Remove ${game.name} from favorites`
                            : `Add ${game.name} to favorites`
                        }
                      >
                        <Heart
                          size={14}
                          fill={isFavorited ? "currentColor" : "none"}
                          stroke="currentColor"
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRating(game.id);
                        }}
                        className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove rating"
                        aria-label={`Remove ${game.name} rating`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingViewsModal;
