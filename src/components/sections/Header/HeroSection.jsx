import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../../components/common/SearchBar";
import Stats from "../../../components/common/Stats";

import { Gamepad2, Star, Users } from "lucide-react";

// Hero section background images (auto-cycling slideshow)
const heroImages = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop&crop=center",
];

const HeroSection = ({
  loading,
  stats,
  handleGameSelect,
  openRatingModal,
  getUserRating,
  getRatingColor,
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  genres,
  handleSearch,
  clearSearch,
  searchResults,
  showResults,
  setShowResults,
  toggleFavorite,
  isGameFavorited,
  formatDate,
}) => {
  const navigate = useNavigate();

  // Tracks which hero image is currently shown
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Stores the last few recent searches
  const [recentSearches, setRecentSearches] = useState([]);

  /**
   * Adds a game to the recent searches list.
   * Ensures no duplicates and keeps only the latest 5.
   */
  const handleAddRecentSearch = (game) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((g) => g.id !== game.id);
      return [game, ...filtered].slice(0, 1000);
    });
  };

  /**
   * Auto-rotate hero images every 5 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // View All Results handler
  const handleViewAllResults = (searchData) => {
    navigate("/products", {
      state: {
        searchTerm: searchData.searchTerm,
        selectedGenre: searchData.selectedGenre,
        sortBy: searchData.sortBy,
        totalResults: searchData.totalResults,
      },
    });
  };

  return (
    <header className="relative z-10 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-8 lg:py-12">
          {/* Left side: heading, description, search bar, stats */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              {/* Section label with small icon */}
              <div className="flex items-center gap-2 text-cyan-400">
                <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  Welcome to Play Guide
                </span>
              </div>
              {/* Main headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight select-none">
                Best{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(45deg, rgb(34, 211, 238), rgb(168, 85, 247))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Gaming
                </span>{" "}
                Site Ever!
              </h1>
              {/* Short description */}
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-full lg:max-w-lg">
                Discover amazing games from our curated collection. Search,
                filter, and find your next favorite game with advanced search
                capabilities.
              </p>
              {/* Loading state */}
              {loading && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <div className="w-4 h-4 border-2 border-cyan-200 border-t-cyan-400 rounded-full animate-spin"></div>
                  <span>Loading games...</span>
                </div>
              )}
              {/* Search bar with filters, favorites, rating modal, etc. */}
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                sortBy={sortBy}
                setSortBy={setSortBy}
                genres={genres}
                handleSearch={handleSearch}
                clearSearch={clearSearch}
                searchResults={searchResults}
                showResults={showResults}
                setShowResults={setShowResults}
                handleGameSelect={handleGameSelect}
                getRatingColor={getRatingColor}
                getUserRating={getUserRating}
                toggleFavorite={toggleFavorite}
                isGameFavorited={isGameFavorited}
                formatDate={formatDate}
                openRatingModal={openRatingModal}
                recentSearches={recentSearches}
                onAddRecentSearch={handleAddRecentSearch}
                onViewAllResults={handleViewAllResults}
                limitResults={true}
              />
              {!loading && <Stats stats={stats} variant="header" />}
            </div>
          </div>

          {/* Right side: hero image with overlay badges and effects */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-0">
              {/* Hero image (auto-rotating) */}
              <img
                src={heroImages[currentImageIndex]}
                alt="Gaming Hero"
                className="relative w-full h-auto rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />

              {/* Hero image navigation dots */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white bg-opacity-50"
                    }`}
                    aria-label={`Show hero image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Floating animated gamepad icon */}
              <div
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg animate-bounce"
                style={{
                  background:
                    "linear-gradient(45deg, rgb(34, 211, 238), rgb(168, 85, 247))",
                }}
              >
                <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              {/* Rating badge */}
              <div
                className="absolute p-2 sm:p-3 rounded-md sm:rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
                style={{
                  left: "-16px",
                  top: "24px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 text-white text-xs sm:text-sm">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
                  <span>4.8 Rating</span>
                </div>
              </div>

              {/* Players badge */}
              <div
                className="absolute p-2 sm:p-3 rounded-md sm:rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                style={{
                  right: "-12px",
                  top: "30%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 text-white text-xs sm:text-sm">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                  <span>1M+ Players</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
