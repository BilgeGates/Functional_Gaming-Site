import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Layout components
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

// Common components
import SearchBar from "../../components/common/SearchBar";
import RatingModal from "../../components/common/RatingModal";
import Controls from "../../components/common/Controls";
import GameCard from "../../components/common/GameCard";
import Pagination from "../../components/common/Pagination";

// Custom hooks
import {
  useGameData,
  useFavorites,
  useRating,
  useRecentViews,
  useDocumentTitle,
  useHandlers,
  useLogic,
} from "../../hooks";

// UI components
import { ErrorMessage, LoadingSpinner } from "../../components/ui";

// Date utilities
import { formatReleaseDate } from "../../utils";

// Icons
import { ArrowUp, Calendar, Users, Star, Heart, Gamepad2 } from "lucide-react";

// Import platform utils
import { getPlatformIcon } from "../../utils";

const Products = () => {
  useDocumentTitle("Products | PlayGuide");

  const [showScrollTop, setShowScrollTop] = useState(false);

  const gameData = useGameData();
  const favorites = useFavorites();
  const rating = useRating();
  const recentViews = useRecentViews();

  const {
    error = null,
    searchTerm = "",
    showFilters = false,
    setShowFilters = () => {},
    selectedGenre = "",
    sortBy = "popularity",
    searchResults = [],
    showResults = false,
  } = gameData || {};

  const { toggleFavorite = () => {}, isGameFavorited = () => false } =
    favorites || {};

  const { submitRating = () => {}, getUserRating = () => 0 } = rating || {};

  const { addToRecentViews = () => {} } = recentViews || {};

  const {
    displayedGames,
    currentPage,
    viewMode,
    totalPages,
    setCurrentPage,
    setViewMode,
    handleFilterClear,
  } = useLogic(gameData, searchResults, showResults);

  const {
    showRatingModal,
    selectedGame,
    setShowRatingModal,
    setSelectedGame,
    openRatingModal,
    handleRatingSubmit,
    handleSearch,
    handleSortChange,
    handleClearSearch,
  } = useHandlers(gameData, addToRecentViews, submitRating);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) return <ErrorMessage />;

  const combinedHandleClearSearch = () => {
    handleClearSearch();
    handleFilterClear();
  };

  // Platform Icon utility
  const getPlatformIconComponent = (platform) => {
    const platformName = platform?.platform?.name || "";
    const IconComponent = getPlatformIcon(platformName);
    return IconComponent ? IconComponent : null;
  };

  const handleFavoriteClick = (e, gameId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(gameId);
  };

  const handleRateClick = (e, game) => {
    e.preventDefault();
    e.stopPropagation();
    openRatingModal(game);
  };

  const handleGameClick = (game) => {
    addToRecentViews(game);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-28 pb-24 overflow-hidden text-white">
        <div className="relative container mx-auto max-w-7xl px-6 text-white text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Game Products
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover amazing games from every genre. Find your next gaming
            adventure with our curated collection.
          </p>
          <nav className="flex items-center justify-center gap-2 text-sm">
            <Link
              to="/"
              className="text-cyan-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-white font-semibold">Products</span>
          </nav>
        </div>
      </div>

      {/* Main Section */}
      <section className="container mx-auto max-w-7xl px-6 pb-32 -mt-10 relative z-20">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-full sm:w-auto flex-1">
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
              handleSearch={handleSearch}
              clearSearch={combinedHandleClearSearch}
              searchResults={searchResults}
              showResults={showResults}
              setShowResults={gameData?.setShowResults}
              handleGameSelect={handleGameClick}
              formatDate={formatReleaseDate}
              recentSearches={[]} // düzəldildi
              onAddRecentSearch={() => {}} // düzəldildi
            />
          </div>
          <div className="flex-shrink-0">
            <Controls
              sortBy={sortBy}
              handleSortChange={handleSortChange}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
        </div>

        {gameData?.loading && <LoadingSpinner />}
        {!gameData?.loading && displayedGames.length > 0 && (
          <>
            {viewMode === "grid" ? (
              <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
                {displayedGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    viewMode={viewMode}
                    animated={true}
                    getUserRating={getUserRating}
                    onSelect={handleGameClick}
                    onRate={openRatingModal}
                    onToggleFavorite={toggleFavorite}
                    isFavorited={isGameFavorited(game.id)}
                    showActions={true}
                  />
                ))}
              </div>
            ) : (
              /* List view */
              <div className="space-y-4">
                {displayedGames.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/40 hover:border-cyan-500/50 hover:bg-gray-800/80 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10"
                  >
                    <div className="p-5">
                      <div className="flex gap-5 items-start">
                        {/* Game Image */}
                        <Link
                          to={`/products/${game.id}`}
                          onClick={() => handleGameClick(game)}
                          className="flex-shrink-0"
                        >
                          <div className="w-28 h-20 sm:w-32 sm:h-[88px] md:w-36 md:h-24 rounded-xl overflow-hidden relative group/img">
                            <img
                              src={
                                game.background_image || "/placeholder-game.jpg"
                              }
                              alt={game.name || "Game"}
                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = "/placeholder-game.jpg";
                              }}
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

                        {/* Game Info */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <Link
                                to={`/products/${game.id}`}
                                onClick={() => handleGameClick(game)}
                                className="block"
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
                                <span className="flex items-center gap-1.5 text-gray-400 ">
                                  <Calendar className="w-4 h-4" />
                                  {formatReleaseDate(game.released)}
                                </span>
                                <span className="flex items-center gap-1.5 text-gray-400 ">
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

                            {/* Right Actions */}
                            <div className="flex items-start gap-3 flex-shrink-0">
                              <button
                                onClick={(e) => handleFavoriteClick(e, game.id)}
                                className={`p-3 rounded-xl transition-all duration-300 ${
                                  isGameFavorited(game.id)
                                    ? "text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                                    : "text-gray-500 hover:text-red-500 hover:bg-red-500/10 border border-gray-600/30 hover:border-red-500/20"
                                } transform hover:scale-105`}
                                title={
                                  isGameFavorited(game.id)
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                                }
                              >
                                <Heart
                                  className="w-5 h-5"
                                  fill={
                                    isGameFavorited(game.id)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </button>

                              <button
                                onClick={(e) => handleRateClick(e, game)}
                                className="px-4 py-2.5 bg-gradient-to-r from-yellow-500/80 to-orange-500/80 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm whitespace-nowrap transform hover:scale-105 shadow-lg hover:shadow-xl"
                                title="Rate this game"
                              >
                                <Star className="w-4 h-4" />
                                Rate
                              </button>
                            </div>
                          </div>

                          {/* Platforms */}
                          <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-700/50">
                            <div className="flex items-center gap-4 flex-wrap">
                              <div className="flex items-center gap-3">
                                <span className="text-md text-gray-500 font-medium">
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
                                          className="flex items-center justify-center w-8 h-8 bg-gray-800/60 rounded-lg hover:bg-gray-700/60 transition-colors duration-200 group/platform"
                                          title={platform?.platform?.name}
                                        >
                                          {IconComponent ? (
                                            <IconComponent className="w-5 h-5 text-gray-400 group-hover/platform:text-cyan-400 transition-colors duration-200" />
                                          ) : (
                                            <Gamepad2 className="w-5 h-5 text-gray-400 group-hover/platform:text-cyan-400 transition-colors duration-200" />
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
                ))}
              </div>
            )}
          </>
        )}

        {!gameData?.loading &&
          (!displayedGames || displayedGames.length === 0) && (
            <div className="text-center py-20">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-gray-400 text-lg mb-4">No games found</p>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your search criteria or clear filters to see
                  more results.
                </p>
                <button
                  onClick={combinedHandleClearSearch}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

        {/* Pagination */}
        {!gameData?.loading &&
          displayedGames &&
          displayedGames.length > 0 &&
          totalPages > 1 && (
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
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300"
          aria-label="Scroll to top"
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
