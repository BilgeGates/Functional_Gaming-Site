import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useGameData,
  useFavorites,
  useRecentViews,
  useRating,
  useHandlers,
} from "../../../hooks";

import {
  FavoritesModal,
  RecentViewsModal,
  RatingModal,
  RatingViewsModal,
} from "../../../components/common";

import HeroSection from "./HeroSection";

import { Search, Star, TrendingUp, Heart } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showRecentModal, setShowRecentModal] = useState(false);
  const [showRatingViewsModal, setShowRatingViewsModal] = useState(false);

  const gameData = useGameData();
  const favorites = useFavorites();
  const recentViews = useRecentViews();
  const rating = useRating();

  const {
    showRatingModal,
    selectedGame,
    setShowRatingModal,
    setSelectedGame,
    openRatingModal,
    handleRatingSubmit,
  } = useHandlers(gameData, recentViews.addToRecentViews, rating.submitRating);

  const handleGameSelect = (game) => {
    recentViews.addToRecentViews(game);
    navigate(`/products/${game.id}`);
    setShowFavoritesModal(false);
    setShowRecentModal(false);
    setShowRatingViewsModal(false);
  };

  const stats = [
    {
      icon: TrendingUp,
      label: `${gameData.allGames?.length ?? 0} games`,
      color: "text-cyan-400",
      clickable: false,
    },
    {
      icon: Star,
      label: `${rating.ratingViews?.length ?? 0} rated`,
      color: "text-yellow-400",
      onClick: () => setShowRatingViewsModal(true),
      clickable: true,
    },
    {
      icon: Heart,
      label: `${favorites.favorites?.length ?? 0} favorites`,
      color: "text-red-400",
      onClick: () => setShowFavoritesModal(true),
      clickable: true,
    },
    {
      icon: Search,
      label: `${recentViews.recentViews?.length ?? 0} recent`,
      color: "text-blue-400",
      onClick: () => setShowRecentModal(true),
      clickable: true,
    },
  ];

  return (
    <div className="relative z-[9996] max-w-7xl mx-auto">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-green-500 rounded-full animate-glow"></div>
      </div>

      <RatingModal
        show={showRatingModal}
        onClose={() => {
          setShowRatingModal(false);
          setSelectedGame(null);
        }}
        game={selectedGame}
        onSubmitRating={handleRatingSubmit}
        currentRating={rating.getUserRating(selectedGame?.id)}
      />

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

      <HeroSection
        allGames={gameData.allGames}
        loading={gameData.loading}
        stats={stats}
        handleGameSelect={handleGameSelect}
        openRatingModal={openRatingModal}
        getUserRating={rating.getUserRating}
        getRatingColor={rating.getRatingColor}
        searchTerm={gameData.searchTerm}
        setSearchTerm={gameData.setSearchTerm}
        showFilters={gameData.showFilters}
        setShowFilters={gameData.setShowFilters}
        selectedGenre={gameData.selectedGenre}
        setSelectedGenre={gameData.setSelectedGenre}
        sortBy={gameData.sortBy}
        setSortBy={gameData.setSortBy}
        genres={gameData.genres}
        handleSearch={gameData.searchGames}
        clearSearch={gameData.clearSearch}
        searchResults={gameData.searchResults}
        showResults={gameData.showResults}
        setShowResults={gameData.setShowResults}
        toggleFavorite={favorites.toggleFavorite}
        isGameFavorited={favorites.isGameFavorited}
        formatDate={gameData.formatDate}
      />
    </div>
  );
};

export default Header;
