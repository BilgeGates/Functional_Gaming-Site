import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

// Layout
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

// Common components
import {
  SearchBar,
  RatingModal,
  Controls,
  GameCard,
  Pagination,
  Stats,
  RatingViewsModal,
  FavoritesModal,
  RecentViewsModal,
} from "../../components/common";

// Hooks
import {
  useGameData,
  useFavorites,
  useRating,
  useRecentViews,
  useDocumentTitle,
  useHandlers,
  useLogic,
  useInViewAnimation,
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
import {
  ArrowUp,
  Calendar,
  Users,
  Star,
  Heart,
  Gamepad2,
  TrendingUp,
  Search,
} from "lucide-react";

const Products = () => {
  useDocumentTitle("Products | PlayGuide");

  const location = useLocation();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showRecentModal, setShowRecentModal] = useState(false);
  const [showRatingViewsModal, setShowRatingViewsModal] = useState(false);

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

  // Animation hook
  const { containerRef, visibleItems } = useInViewAnimation(displayedGames, 4);

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

  // Page change handler with transition
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreFromQuery = params.get("genre");

    if (genreFromQuery && gameData?.setSelectedGenre) {
      gameData.setSelectedGenre(genreFromQuery);
    }
  }, [location.search, gameData]);

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

  const handleGameSelect = (game) => {
    addToRecentViews(game);
    setShowFavoritesModal(false);
    setShowRecentModal(false);
    setShowRatingViewsModal(false);
  };

  // Stats configuration
  const stats = [
    {
      icon: TrendingUp,
      label: `${gameData?.allGames?.length ?? 0} games`,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      className: "cursor-default pointer-events-none select-none",
    },
    {
      icon: Star,
      label: `${rating?.ratingViews?.length ?? 0} rated`,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      hoverBg: "hover:bg-yellow-500/20",
      onClick: () => setShowRatingViewsModal(true),
      clickable: true,
    },
    {
      icon: Heart,
      label: `${favorites?.favorites?.length ?? 0} favorites`,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      hoverBg: "hover:bg-red-500/20",
      onClick: () => setShowFavoritesModal(true),
      clickable: true,
    },
    {
      icon: Search,
      label: `${recentViews?.recentViews?.length ?? 0} recent`,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      hoverBg: "hover:bg-blue-500/20",
      onClick: () => setShowRecentModal(true),
      clickable: true,
    },
  ];

  // Animated List Game Card Component
  const AnimatedListGameCard = ({ game, index }) => {
    const userRating = safeGetUserRating(getUserRating, game.id);
    const isFavorited = safeIsGameFavorited(isGameFavorited, game.id);

    return (
      <div
        className="transition-all duration-500 ease-out transform opacity-0 translate-y-4 scale-98"
        style={{
          animation: `fadeInUp 0.5s ease-out ${index * 50}ms forwards`,
        }}
      >
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/40 hover:border-cyan-500/50 hover:bg-gray-800/80 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
              {/* Thumbnail */}
              <Link
                to={`/products/${game.id}`}
                onClick={() => handleGameClick(game)}
                className="flex-shrink-0 w-full sm:w-auto"
              >
                <div className="w-full h-48 sm:w-28 sm:h-20 md:w-32 md:h-[88px] lg:w-36 lg:h-24 rounded-xl overflow-hidden relative group/img">
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
              <div className="flex-1 min-w-0 space-y-3 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${game.id}`}
                      onClick={() => handleGameClick(game)}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 sm:truncate mb-2">
                        {game.name || "Unknown Game"}
                      </h3>
                    </Link>

                    {/* Tags */}
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-sm text-gray-400">
                      <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium text-xs border border-cyan-500/20">
                        {game.genres?.[0]?.name || "Unknown Genre"}
                      </span>
                      <span className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {formatReleaseDate(game.released)}
                      </span>
                      <span className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        {game.ratings_count
                          ? `${Math.round(game.ratings_count / 1000)}k`
                          : "0"}{" "}
                        reviews
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end sm:justify-start gap-2 flex-shrink-0">
                    {userRating > 0 && (
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs select-none">
                        <Star size={10} fill="currentColor" />
                        <span>{userRating.toFixed(1)}</span>
                      </div>
                    )}

                    {/* Rate */}
                    <button
                      onClick={handleRatingClick(game)}
                      title="Rate this game"
                      className="p-2 rounded-full text-yellow-500 hover:text-yellow-600 transition-all hover:scale-110"
                    >
                      <Star
                        size={16}
                        fill={userRating > 0 ? "currentColor" : "none"}
                        stroke="currentColor"
                      />
                    </button>

                    {/* Favorite */}
                    <button
                      onClick={handleFavoriteToggle(game)}
                      className={`p-2 rounded-full transition-all hover:scale-110 ${
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
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        Available on:
                      </span>
                      <div className="flex items-center gap-1 sm:gap-2">
                        {(game.platforms || [])
                          .slice(0, 5)
                          .map((platform, idx) => {
                            const IconComponent =
                              getPlatformIconComponent(platform);
                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-800/60 rounded-lg hover:bg-gray-700/60 transition-colors group/platform"
                                title={platform?.platform?.name}
                              >
                                {IconComponent ? (
                                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/platform:text-cyan-400" />
                                ) : (
                                  <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/platform:text-cyan-400" />
                                )}
                              </div>
                            );
                          })}
                        {(game.platforms || []).length > 5 && (
                          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-800/60 rounded-lg text-xs text-gray-500 font-medium">
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
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInGrid {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

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
        {/* Search Bar */}
        <div className="mb-6">
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
            showGenreTags={false}
            enableDropdown={false}
          />
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <Stats stats={stats} />
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-400">
            {searchTerm ? (
              <span>
                Found {displayedGames?.length || 0} games for "{searchTerm}"
              </span>
            ) : (
              <span>Showing {displayedGames?.length || 0} games</span>
            )}
          </div>
          <Controls
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>

        {/* Loading */}
        {gameData?.loading && <LoadingSpinner />}

        {/* Game List */}
        {!gameData?.loading && displayedGames.length > 0 && (
          <>
            {viewMode === "grid" ? (
              // Grid view with Masonry layout and scroll animation
              <div
                ref={containerRef}
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
              >
                {displayedGames.map((game, index) => {
                  const isVisible = visibleItems.has(String(game.id));
                  const isInitial = index < 4;

                  return (
                    <div
                      key={game.id}
                      data-id={game.id}
                      className="break-inside-avoid mb-6"
                    >
                      <div
                        className={`transition-all duration-500 ease-out transform ${
                          isInitial
                            ? "opacity-0"
                            : isVisible
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-6 scale-98"
                        }`}
                        style={{
                          transitionDelay: isInitial
                            ? "0ms"
                            : `${(index - 4) * 60}ms`,
                          animation: isInitial
                            ? `fadeInGrid 0.4s ease-out ${
                                index * 60
                              }ms forwards`
                            : "none",
                        }}
                      >
                        <GameCard
                          game={game}
                          viewMode={viewMode}
                          animated
                          getUserRating={getUserRating}
                          onSelect={handleGameClick}
                          onRate={openRatingModal}
                          onToggleFavorite={() => toggleFavorite(game)}
                          isFavorited={isGameFavorited(game.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List view
              <div className="space-y-4">
                {displayedGames.map((game, index) => (
                  <AnimatedListGameCard
                    key={game.id}
                    game={game}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!gameData?.loading &&
          (!displayedGames || displayedGames.length === 0) && (
            <div className="text-center py-16 px-4">
              <div className="text-gray-400 mb-4">
                <Gamepad2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                {searchTerm ? (
                  <>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      No games found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-4">
                      No games match your search "{searchTerm}". Try different
                      keywords.
                    </p>
                    <button
                      onClick={combinedHandleClearSearch}
                      className="px-4 sm:px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 text-sm sm:text-base"
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      No games available
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
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
              setCurrentPage={handlePageChange}
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

      {/* Modals */}
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

      <RatingViewsModal
        show={showRatingViewsModal}
        onClose={() => setShowRatingViewsModal(false)}
        ratingViews={rating.ratingViews}
        removeRating={rating.removeRating}
        handleGameSelect={handleGameSelect}
        toggleFavorite={favorites.toggleFavorite}
        isGameFavorited={favorites.isGameFavorited}
      />

      <FavoritesModal
        show={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        favorites={favorites.favorites}
        toggleFavorite={favorites.toggleFavorite}
        pinnedFavorites={favorites.pinnedFavorites}
        togglePin={favorites.togglePin}
        isGamePinned={favorites.isGamePinned}
        removeFavorite={favorites.removeFavorite}
        handleGameSelect={handleGameSelect}
        openRatingModal={openRatingModal}
        getUserRating={rating.getUserRating}
        getRatingColor={rating.getRatingColor}
        formatDate={gameData.formatDate}
        getSortedFavorites={favorites.getSortedFavorites}
      />

      <RecentViewsModal
        show={showRecentModal}
        onClose={() => setShowRecentModal(false)}
        recentViews={recentViews.recentViews}
        clearRecentViews={recentViews.clearRecentViews}
        handleGameSelect={handleGameSelect}
        formatTimeAgo={gameData.formatTimeAgo}
        getUserRating={rating.getUserRating}
        openRatingModal={openRatingModal}
        toggleFavorite={favorites.toggleFavorite}
        isGameFavorited={favorites.isGameFavorited}
        removeFromRecentViews={recentViews.removeFromRecentViews}
      />

      <Footer />
    </>
  );
};

export default Products;
