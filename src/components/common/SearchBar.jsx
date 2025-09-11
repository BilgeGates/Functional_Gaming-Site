import { useRef, useCallback } from "react";

import SearchGameItem from "./SearchGameItem";

import { useSearch, useSearchKeyboard } from "../../hooks";

import { GenreBadge, ExploreButton } from "../ui";

import { Search, X, Filter } from "lucide-react";

const SearchBar = ({
  searchTerm: externalSearchTerm,
  setSearchTerm: externalSetSearchTerm,
  showFilters: externalShowFilters,
  setShowFilters: externalSetShowFilters,
  selectedGenre: externalSelectedGenre,
  setSelectedGenre: externalSetSelectedGenre,
  sortBy: externalSortBy,
  setSortBy: externalSetSortBy,
  handleSearch,
  clearSearch,
  searchResults = [],
  showResults: externalShowResults,
  setShowResults: externalSetShowResults,
  handleGameSelect,
  getRatingColor,
  getUserRating,
  openRatingModal,
  toggleFavorite,
  isGameFavorited,
  formatDate,
  genres,
  onViewAllResults,
}) => {
  const searchRef = useRef(null);

  const {
    searchTerm,
    selectedGenre,
    sortBy,
    showFilters,
    showResults,
    selectedResultIndex,
    isSearching,
    visibleCount,
    loadingMore,
    setSearchTerm,
    setSelectedGenre: setInternalSelectedGenre,
    setSortBy: setInternalSortBy,
    setShowFilters,
    setShowResults,
    setSelectedResultIndex,
    setVisibleCount,
    handleInputChange,
    handleInputFocus,
    handleClearSearch,
    handleFilterChange,
    handleResultClick,
  } = useSearch({ handleSearch });

  // External props override internal state if provided
  const currentSearchTerm =
    externalSearchTerm !== undefined ? externalSearchTerm : searchTerm;
  const currentShowFilters =
    externalShowFilters !== undefined ? externalShowFilters : showFilters;
  const currentSelectedGenre =
    externalSelectedGenre !== undefined ? externalSelectedGenre : selectedGenre;
  const currentSortBy = externalSortBy !== undefined ? externalSortBy : sortBy;
  const currentShowResults =
    externalShowResults !== undefined ? externalShowResults : showResults;

  const setCurrentSearchTerm = externalSetSearchTerm || setSearchTerm;
  const setCurrentShowFilters = externalSetShowFilters || setShowFilters;
  const setCurrentSelectedGenre =
    externalSetSelectedGenre || setInternalSelectedGenre;
  const setCurrentSortBy = externalSetSortBy || setInternalSortBy;
  const setCurrentShowResults = externalSetShowResults || setShowResults;

  const safeGenres = Array.isArray(genres) ? genres : [];
  const displayGenres = safeGenres.slice(0, 5);

  const displayResultsCount = 5;
  const hasMoreResults = searchResults.length > displayResultsCount;

  // Sort results function - proper sorting logic
  const sortSearchResults = useCallback((results, sortType) => {
    if (!results || !Array.isArray(results)) return [];

    const sortedResults = [...results];

    switch (sortType) {
      case "rating":
        return sortedResults.sort((a, b) => {
          const ratingA = parseFloat(a.rating) || 0;
          const ratingB = parseFloat(b.rating) || 0;
          return ratingB - ratingA; // Highest rating first
        });

      case "metacritic":
        return sortedResults.sort((a, b) => {
          const metacriticA = parseInt(a.metacritic) || 0;
          const metacriticB = parseInt(b.metacritic) || 0;
          return metacriticB - metacriticA; // Highest metacritic first
        });

      case "released":
        return sortedResults.sort((a, b) => {
          const dateA = new Date(a.released || 0);
          const dateB = new Date(b.released || 0);
          return dateB - dateA; // Newest first
        });

      case "name_asc":
        return sortedResults.sort((a, b) => {
          const nameA = (a.name || "").toLowerCase();
          const nameB = (b.name || "").toLowerCase();
          return nameA.localeCompare(nameB); // A to Z
        });

      case "name_desc":
        return sortedResults.sort((a, b) => {
          const nameA = (a.name || "").toLowerCase();
          const nameB = (b.name || "").toLowerCase();
          return nameB.localeCompare(nameA); // Z to A
        });

      case "popularity":
        return sortedResults.sort((a, b) => {
          const popularityA = parseInt(
            a.suggestions_count || a.reviews_count || 0
          );
          const popularityB = parseInt(
            b.suggestions_count || b.reviews_count || 0
          );
          return popularityB - popularityA; // Most popular first
        });

      case "relevance":
      default:
        // Keep original order for relevance or default case
        return sortedResults;
    }
  }, []);

  // Get sorted results
  const sortedResults = sortSearchResults(searchResults, currentSortBy);

  // Keyboard navigation
  useSearchKeyboard({
    searchRef,
    showResults: currentShowResults,
    searchResults: sortedResults,
    selectedResultIndex,
    setSelectedResultIndex,
    visibleCount,
    searchTerm: currentSearchTerm,
    handleResultClick,
    handleGameSelect,
    setShowResults: setCurrentShowResults,
    setShowFilters: setCurrentShowFilters,
  });

  // Input handler
  const onInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setCurrentSearchTerm(value);

      if (externalSetSearchTerm) {
        // If external state management, just update external state
        if (value.trim()) {
          setCurrentShowResults(true);
          handleSearch?.(value, currentSelectedGenre, currentSortBy);
        } else {
          setCurrentShowResults(false);
        }
      } else {
        // Use internal state management
        handleInputChange(value);
      }
    },
    [
      setCurrentSearchTerm,
      handleInputChange,
      setCurrentShowResults,
      handleSearch,
      currentSelectedGenre,
      currentSortBy,
      externalSetSearchTerm,
    ]
  );

  const onClearSearch = useCallback(() => {
    setCurrentSearchTerm("");
    setCurrentShowResults(false);
    setSelectedResultIndex(-1);
    if (clearSearch) {
      clearSearch();
    }
    if (!externalSetSearchTerm) {
      handleClearSearch(clearSearch);
    }
  }, [
    setCurrentSearchTerm,
    setCurrentShowResults,
    setSelectedResultIndex,
    handleClearSearch,
    clearSearch,
    externalSetSearchTerm,
  ]);

  const onFilterChange = useCallback(
    (filterType, value) => {
      // Update the appropriate state
      if (filterType === "genre") {
        setCurrentSelectedGenre(value);
      }
      if (filterType === "sort") {
        setCurrentSortBy(value);
      }

      // Show results when filter is applied
      setCurrentShowResults(true);

      // Get current values for search
      const genre = filterType === "genre" ? value : currentSelectedGenre;
      const sort = filterType === "sort" ? value : currentSortBy;

      // If external state management, trigger search directly
      if (externalSetSelectedGenre || externalSetSortBy) {
        if (handleSearch) {
          handleSearch(currentSearchTerm, genre, sort);
        }
      } else {
        // Use internal filter change handler
        handleFilterChange(filterType, value);
      }
    },
    [
      setCurrentSelectedGenre,
      setCurrentSortBy,
      setCurrentShowResults,
      handleFilterChange,
      handleSearch,
      currentSearchTerm,
      currentSelectedGenre,
      currentSortBy,
      externalSetSelectedGenre,
      externalSetSortBy,
    ]
  );

  const onPopularGenreClick = useCallback(
    (genre) => {
      // Update genre state
      setCurrentSelectedGenre(genre.id);
      setCurrentSearchTerm("");

      // Show results when genre is clicked
      setCurrentShowResults(true);

      // Trigger search with new genre
      if (handleSearch) {
        handleSearch("", genre.id, currentSortBy);
      }
    },
    [
      setCurrentSelectedGenre,
      setCurrentSearchTerm,
      handleSearch,
      currentSortBy,
      setCurrentShowResults,
    ]
  );

  // View All Results handler
  const handleViewAllResults = useCallback(() => {
    if (onViewAllResults) {
      onViewAllResults({
        searchTerm: currentSearchTerm,
        selectedGenre: currentSelectedGenre,
        sortBy: currentSortBy,
        totalResults: sortedResults.length,
      });
    }
    // Close search dropdown
    setCurrentShowResults(false);
  }, [
    onViewAllResults,
    currentSearchTerm,
    currentSelectedGenre,
    currentSortBy,
    sortedResults.length,
    setCurrentShowResults,
  ]);

  const onResultsScroll = useCallback(
    (e) => {
      const target = e.target;

      if (
        !loadingMore &&
        target.scrollTop + target.clientHeight >= target.scrollHeight - 20 &&
        // eslint-disable-next-line no-undef
        visibleCount < (limitResults ? 5 : sortedResults.length)
      ) {
        setVisibleCount((v) =>
          // eslint-disable-next-line no-undef
          Math.min(v + 7, limitResults ? 5 : sortedResults.length)
        );
      }
    },
    [loadingMore, visibleCount, sortedResults.length, setVisibleCount]
  );

  const handleFavoriteToggle = useCallback(
    (game) => {
      if (toggleFavorite) toggleFavorite(game);
    },
    [toggleFavorite]
  );

  const onResultClick = useCallback(
    (game) => {
      if (externalSetShowResults) {
        // External state management
        if (handleGameSelect) {
          handleGameSelect(game);
        }
        setCurrentShowResults(false);
        setSelectedResultIndex(-1);
      } else {
        // Internal state management
        handleResultClick(game, handleGameSelect);
      }
    },
    [
      handleResultClick,
      handleGameSelect,
      setCurrentShowResults,
      setSelectedResultIndex,
      externalSetShowResults,
    ]
  );

  // Updated condition to show results when there are search results or filters applied
  const shouldShowSearchResults =
    !isSearching &&
    currentShowResults &&
    (currentSearchTerm.trim() || currentSelectedGenre);

  const hasAnyResults = sortedResults.length > 0;

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="flex flex-col gap-3">
        {/* Search Input and Filter Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={currentSearchTerm}
              onChange={onInputChange}
              onFocus={handleInputFocus}
              placeholder="Search by game name, genre or keyword..."
              className="w-full pl-5 sm:pl-6 pr-10 sm:pr-12 h-auto py-2 sm:py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 border text-sm sm:text-base"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              aria-label="Search games"
              autoComplete="off"
            />
            {currentSearchTerm && (
              <button
                onClick={onClearSearch}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <button
            onClick={() => setCurrentShowFilters(!currentShowFilters)}
            className={`h-13 px-3 py-3 sm:px-4 sm:py-4 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
              currentShowFilters
                ? "bg-purple-700 text-white shadow-lg"
                : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg"
            }`}
            aria-label={currentShowFilters ? "Hide filters" : "Show filters"}
            aria-expanded={currentShowFilters}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {displayGenres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onPopularGenreClick(genre)}
              className={`bg-transparent rounded-lg transition-all duration-200 ease-in-out transform hover:scale-102  ${
                currentSelectedGenre === genre.id
                  ? "bg-white bg-opacity-20 text-white border-white border-opacity-40 shadow-lg"
                  : "bg-white bg-opacity-10 text-white border-white border-opacity-20 hover:bg-opacity-15 hover:border-opacity-30 shadow-md"
              }`}
              aria-pressed={currentSelectedGenre === genre.id}
            >
              <GenreBadge genre={genre} />
            </button>
          ))}
        </div>

        {/* Filters Panel */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            currentShowFilters
              ? "max-h-56 sm:max-h-40 opacity-100 mb-2"
              : "max-h-0 opacity-0"
          }`}
        >
          <div
            className="p-3 sm:p-4 rounded-xl border transform transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              transform: currentShowFilters
                ? "translateY(0)"
                : "translateY(-10px)",
            }}
            role="region"
            aria-label="Search filters"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 sm:pt-4">
              <div className="w-full sm:flex-1">
                <label
                  htmlFor="genre-select"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Genre
                </label>
                <select
                  id="genre-select"
                  value={currentSelectedGenre}
                  onChange={(e) => onFilterChange("genre", e.target.value)}
                  className="w-full px-3 py-2.5 pr-8 rounded-lg bg-gray-900 bg-opacity-90 text-gray-200 border border-gray-700 focus:outline-none appearance-none transition-all duration-200 ease-in-out hover:border-gray-600 text-sm"
                >
                  <option className="bg-gray-900 text-gray-200" value="">
                    All genres
                  </option>
                  {safeGenres.map((genre) => (
                    <option
                      key={genre.id}
                      value={genre.id}
                      className="bg-gray-900 text-gray-200"
                    >
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:flex-1">
                <label
                  htmlFor="sort-select"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Sort
                </label>
                <select
                  id="sort-select"
                  value={currentSortBy}
                  onChange={(e) => onFilterChange("sort", e.target.value)}
                  className="w-full px-3 py-2.5 pr-8 rounded-lg bg-gray-900 bg-opacity-90 text-gray-200 border border-gray-700 focus:outline-none appearance-none transition-all duration-200 ease-in-out hover:border-gray-600 text-sm"
                >
                  <option
                    className="bg-gray-900 text-gray-200"
                    value="relevance"
                  >
                    Relevance
                  </option>
                  <option
                    className="bg-gray-900 text-gray-200"
                    value="popularity"
                  >
                    Popularity
                  </option>
                  <option className="bg-gray-900 text-gray-200" value="rating">
                    Highest Rating
                  </option>
                  <option
                    className="bg-gray-900 text-gray-200"
                    value="metacritic"
                  >
                    Metacritic Score
                  </option>
                  <option
                    className="bg-gray-900 text-gray-200"
                    value="released"
                  >
                    Release Date (Newest)
                  </option>
                  <option
                    className="bg-gray-900 text-gray-200"
                    value="name_asc"
                  >
                    Name (A-Z)
                  </option>
                  <option
                    className="bg-gray-900 text-gray-200"
                    value="name_desc"
                  >
                    Name (Z-A)
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 mt-1 mx-2 sm:mx-0 rounded-tl-xl rounded-bl-xl rounded-tr-md rounded-br-md shadow-2xl border z-[9999]
          bg-white bg-opacity-95 backdrop-blur-md
          transition-all duration-300 ease-in-out
          ${
            shouldShowSearchResults && hasAnyResults
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 max-h-0 pointer-events-none"
          }`}
        style={{
          borderColor: "rgba(255, 255, 255, 0.2)",
          zIndex: "9999",
        }}
      >
        {/* Loading State */}
        {isSearching && (
          <div className="flex items-center justify-center p-6 sm:p-8 animate-fadeIn">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-600 mb-3 sm:mb-4"></div>
              <div className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                Searching games...
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {shouldShowSearchResults && hasAnyResults && (
          <div className="flex flex-col h-full">
            {/* Results Header */}
            <div className="p-3 sm:p-4 flex-shrink-0">
              <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Search size={14} />
                {sortedResults.length} result
                {sortedResults.length !== 1 ? "s" : ""} found
              </h3>
            </div>

            {/* Results List */}
            <div
              className="flex-1 overflow-y-auto px-3 sm:px-4"
              onScroll={onResultsScroll}
            >
              <div className="space-y-1">
                {sortedResults
                  .slice(0, displayResultsCount)
                  .map((game, index) => (
                    <SearchGameItem
                      key={`search-${game.id}-${index}`}
                      game={game}
                      index={index}
                      selectedResultIndex={selectedResultIndex}
                      onResultClick={onResultClick}
                      onFavoriteToggle={handleFavoriteToggle}
                      onRatingClick={openRatingModal}
                      getRatingColor={getRatingColor}
                      getUserRating={getUserRating}
                      isGameFavorited={isGameFavorited}
                      formatDate={formatDate}
                    />
                  ))}
              </div>
            </div>

            {/* View All Results Button */}
            {hasMoreResults && onViewAllResults && (
              <div className="flex-shrink-0 p-3 sm:p-4 border-t border-gray-200">
                <ExploreButton
                  variant="cardButton"
                  onClick={handleViewAllResults}
                >
                  Show {searchResults.length} Results
                </ExploreButton>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {shouldShowSearchResults && !hasAnyResults && (
          <div className="p-6 sm:p-8 text-center">
            <div className="text-gray-500 italic text-base sm:text-lg">
              {currentSearchTerm.trim()
                ? `No results found for "${currentSearchTerm}"`
                : currentSelectedGenre
                ? `No games found for ${
                    safeGenres.find((g) => g.id === currentSelectedGenre)
                      ?.name || "selected genre"
                  }`
                : "No games found for selected filters"}
            </div>
            <div className="text-gray-400 text-sm mt-2">
              Try a different search term or genre
            </div>
          </div>
        )}

        {/* Load More Indicator */}
        {loadingMore && (
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 flex justify-center items-center p-3 rounded-b-xl pointer-events-none">
            <div className="flex items-center gap-2 text-purple-600">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs sm:text-sm font-medium">
                Loading more results...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
