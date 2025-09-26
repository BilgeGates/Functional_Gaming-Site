import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// Layout
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

// Common components
import SearchBar from "../../components/common/SearchBar";
import RatingModal from "../../components/common/RatingModal";
import Controls from "../../components/common/Controls";
import GameCard from "../../components/common/GameCard";
import Pagination from "../../components/common/Pagination";

// Hooks
import {
  useGameData,
  useFavorites,
  useRating,
  useRecentViews,
  useDocumentTitle,
  useHandlers,
  useLogic,
} from "../../hooks";

// UI
import { ErrorMessage, LoadingSpinner } from "../../components/ui";

// Utils
import {
  formatReleaseDate,
  safeGetUserRating,
  safeIsGameFavorited,
  getPlatformIcon,
} from "../../utils";

// Icons
import { ArrowUp, Calendar, Users, Star, Heart, Gamepad2 } from "lucide-react";

const Products = () => {
  useDocumentTitle("Products | PlayGuide");

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Hook data
  const gameData = useGameData();
  const favorites = useFavorites();
  const rating = useRating();
  const recentViews = useRecentViews();

  // Extract state safely
  const {
    error,
    searchTerm,
    showFilters,
    setShowFilters,
    selectedGenre,
    sortBy,
    searchResults,
    showResults,
  } = gameData || {};

  const { toggleFavorite, isGameFavorited } = favorites || {};
  const { submitRating, getUserRating } = rating || {};
  const { addToRecentViews } = recentViews || {};

  // Logic for filtering, pagination, view mode
  const {
    displayedGames,
    currentPage,
    viewMode,
    totalPages,
    setCurrentPage,
    setViewMode,
    handleFilterClear,
  } = useLogic(gameData, searchResults, showResults);

  // Handlers for UI
  const {
    showRatingModal,
    selectedGame,
    setShowRatingModal,
    setSelectedGame,
    openRatingModal,
    handleRatingSubmit,
    handleSortChange,
    handleClearSearch,
  } = useHandlers(gameData, addToRecentViews, submitRating);

  // Favorites toggle
  const handleFavoriteToggle = useCallback(
    (game) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (toggleFavorite && game?.id) toggleFavorite(game);
    },
    [toggleFavorite]
  );

  // Rating click
  const handleRatingClick = useCallback(
    (game) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (openRatingModal) openRatingModal(game, e);
    },
    [openRatingModal]
  );

  // Show scroll-to-top after 300px
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) return <ErrorMessage type="error" />;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const combinedHandleClearSearch = () => {
    handleClearSearch();
    handleFilterClear();
  };

  // Get platform icon
  const getPlatformIconComponent = (platform) => {
    const name = platform?.platform?.name || "";
    return getPlatformIcon(name) || null;
  };

  const handleGameClick = (game) => addToRecentViews(game);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-28 pb-24 overflow-hidden text-white">
        <div className="container mx-auto max-w-7xl px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Game Products
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover amazing games from every genre. Find your next adventure
            with our curated collection.
          </p>
          <nav className="flex items-center justify-center gap-2 text-sm">
            <Link to="/" className="text-cyan-400 hover:text-white">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-white font-semibold">Products</span>
          </nav>
        </div>
      </div>

      {/* Main Section */}
      <section className="container mx-auto max-w-7xl px-6 pb-32 -mt-10 relative z-20">
        {/* Search + Controls - Responsive Layout */}
        <div className="mb-8">
          {/* Search Bar - Full Width */}
          <div className="w-full mb-4">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={gameData?.setSearchTerm}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              selectedGenre={selectedGenre}
              setSelectedGenre={gameData?.setSelectedGenre}
              sortBy={sortBy}
              setSortBy={gameData?.setSortBy}
              genres={gameData?.genres || []}
              clearSearch={combinedHandleClearSearch}
              showGenreTags={false} // Hide genre tags in Products page
              enableDropdown={false} // Disable dropdown in Products page
            />
          </div>

          {/* Controls - Responsive Position */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Results Count */}
            <div className="text-sm text-gray-400">
              {searchTerm ? (
                <span>
                  Found {displayedGames?.length || 0} games for "{searchTerm}"
                </span>
              ) : (
                <span>Showing {displayedGames?.length || 0} games</span>
              )}
            </div>

            {/* View Mode Controls */}
            <div className="flex items-center justify-end sm:justify-start">
              <Controls
                sortBy={sortBy}
                handleSortChange={handleSortChange}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {gameData?.loading && <LoadingSpinner />}

        {/* Game List */}
        {!gameData?.loading && displayedGames.length > 0 && (
          <>
            {viewMode === "grid" ? (
              // Grid view
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    viewMode={viewMode}
                    animated
                    getUserRating={getUserRating}
                    onSelect={handleGameClick}
                    onRate={openRatingModal}
                    onToggleFavorite={() => toggleFavorite(game)}
                    isFavorited={isGameFavorited(game.id)}
                  />
                ))}
              </div>
            ) : (
              // List view
              <div className="space-y-4">
                {displayedGames.map((game) => {
                  if (!game?.id) return null;

                  const userRating = safeGetUserRating(getUserRating, game.id);
                  const isFavorited = safeIsGameFavorited(
                    isGameFavorited,
                    game.id
                  );

                  return (
                    <div
                      key={game.id}
                      className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/40 hover:border-cyan-500/50 hover:bg-gray-800/80 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10"
                    >
                      <div className="p-5">
                        <div className="flex gap-5 items-start">
                          {/* Thumbnail */}
                          <Link
                            to={`/products/${game.id}`}
                            onClick={() => handleGameClick(game)}
                            className="flex-shrink-0"
                          >
                            <div className="w-28 h-20 sm:w-32 sm:h-[88px] md:w-36 md:h-24 rounded-xl overflow-hidden relative group/img">
                              <img
                                src={
                                  game.background_image ||
                                  "https://via.placeholder.com/128x72?text=No+Image"
                                }
                                alt={game.name || "Game"}
                                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) =>
                                  (e.target.src =
                                    "https://via.placeholder.com/128x72?text=No+Image")
                                }
                              />
                              {game.rating && (
                                <div className="absolute top-2 left-2 bg-black/90 text-yellow-400 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                                  <Star className="w-3 h-3 fill-current" />
                                  {game.rating.toFixed(1)}
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                            </div>
                          </Link>

                          {/* Info */}
                          <div className="flex-1 min-w-0 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <Link
                                  to={`/products/${game.id}`}
                                  onClick={() => handleGameClick(game)}
                                >
                                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 truncate mb-2">
                                    {game.name || "Unknown Game"}
                                  </h3>
                                </Link>

                                {/* Tags */}
                                <div className="flex items-center flex-wrap gap-3 text-sm text-gray-400">
                                  <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 px-3 py-1.5 rounded-full font-medium text-xs border border-cyan-500/20">
                                    {game.genres?.[0]?.name || "Unknown Genre"}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {formatReleaseDate(game.released)}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4" />
                                    {game.ratings_count
                                      ? `${Math.round(
                                          game.ratings_count / 1000
                                        )}k`
                                      : "0"}{" "}
                                    reviews
                                  </span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {userRating > 0 && (
                                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-1.5 sm:px-2 py-1 rounded-full text-xs select-none">
                                    <Star size={10} fill="currentColor" />
                                    <span className="hidden sm:inline">
                                      {userRating.toFixed(1)}
                                    </span>
                                  </div>
                                )}

                                {/* Rate */}
                                <button
                                  onClick={handleRatingClick(game)}
                                  title="Rate this game"
                                  className="p-1.5 sm:p-2 rounded-full text-yellow-500 hover:text-yellow-600 transition-all hover:scale-110"
                                >
                                  <Star
                                    size={16}
                                    fill={
                                      userRating > 0 ? "currentColor" : "none"
                                    }
                                    stroke="currentColor"
                                  />
                                </button>

                                {/* Favorite */}
                                <button
                                  onClick={handleFavoriteToggle(game)}
                                  className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 ${
                                    isFavorited
                                      ? "text-red-500 hover:text-red-600"
                                      : "text-gray-400 hover:text-red-500"
                                  }`}
                                  title={
                                    isFavorited
                                      ? "Remove from favorites"
                                      : "Add to favorites"
                                  }
                                >
                                  <Heart
                                    size={16}
                                    fill={isFavorited ? "currentColor" : "none"}
                                    stroke="currentColor"
                                  />
                                </button>
                              </div>
                            </div>

                            {/* Platforms */}
                            <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-700/50">
                              <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-gray-500 font-medium">
                                    Available on:
                                  </span>
                                  <div className="flex items-center gap-2">
                                    {(game.platforms || [])
                                      .slice(0, 5)
                                      .map((platform, idx) => {
                                        const IconComponent =
                                          getPlatformIconComponent(platform);
                                        return (
                                          <div
                                            key={idx}
                                            className="flex items-center justify-center w-8 h-8 bg-gray-800/60 rounded-lg hover:bg-gray-700/60 transition-colors group/platform"
                                            title={platform?.platform?.name}
                                          >
                                            {IconComponent ? (
                                              <IconComponent className="w-5 h-5 text-gray-400 group-hover/platform:text-cyan-400" />
                                            ) : (
                                              <Gamepad2 className="w-5 h-5 text-gray-400 group-hover/platform:text-cyan-400" />
                                            )}
                                          </div>
                                        );
                                      })}
                                    {(game.platforms || []).length > 5 && (
                                      <div className="flex items-center justify-center w-8 h-8 bg-gray-800/60 rounded-lg text-xs text-gray-500 font-medium">
                                        +{(game.platforms || []).length - 5}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!gameData?.loading &&
          (!displayedGames || displayedGames.length === 0) && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Gamepad2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                {searchTerm ? (
                  <>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No games found
                    </h3>
                    <p className="text-gray-400">
                      No games match your search "{searchTerm}". Try different
                      keywords.
                    </p>
                    <button
                      onClick={combinedHandleClearSearch}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No games available
                    </h3>
                    <p className="text-gray-400">
                      Games are currently being loaded. Please try again later.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

        {/* Pagination */}
        {!gameData?.loading && displayedGames.length > 0 && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </section>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Rating Modal */}
      {showRatingModal && selectedGame && (
        <RatingModal
          show={showRatingModal}
          onClose={() => {
            setShowRatingModal(false);
            setSelectedGame(null);
          }}
          game={selectedGame}
          onSubmitRating={handleRatingSubmit}
          currentRating={getUserRating(selectedGame.id)}
        />
      )}

      <Footer />
    </>
  );
};

export default Products;
