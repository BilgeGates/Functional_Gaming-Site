import { useState, useCallback, useRef, useEffect } from "react";

const useSearch = ({ handleSearch, onAddRecentSearch } = {}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(7);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  // Sort function for search results
  const sortSearchResults = useCallback((results, sortType) => {
    if (!results || !Array.isArray(results)) return [];

    const sortedResults = [...results];

    switch (sortType) {
      case "rating":
        return sortedResults.sort((a, b) => {
          // Handle different possible rating fields and formats
          let ratingA = 0;
          let ratingB = 0;

          // Try different rating fields
          if (a.rating !== undefined && a.rating !== null) {
            ratingA = parseFloat(String(a.rating));
          } else if (a.rating_top !== undefined && a.rating_top !== null) {
            ratingA = parseFloat(String(a.rating_top));
          }

          if (b.rating !== undefined && b.rating !== null) {
            ratingB = parseFloat(String(b.rating));
          } else if (b.rating_top !== undefined && b.rating_top !== null) {
            ratingB = parseFloat(String(b.rating_top));
          }

          // Handle NaN values
          if (isNaN(ratingA)) ratingA = 0;
          if (isNaN(ratingB)) ratingB = 0;

          return ratingB - ratingA; // Highest rating first
        });

      case "metacritic":
        return sortedResults.sort((a, b) => {
          let metacriticA = 0;
          let metacriticB = 0;

          if (a.metacritic !== undefined && a.metacritic !== null) {
            metacriticA = parseInt(String(a.metacritic), 10);
          }

          if (b.metacritic !== undefined && b.metacritic !== null) {
            metacriticB = parseInt(String(b.metacritic), 10);
          }

          // Handle NaN values
          if (isNaN(metacriticA)) metacriticA = 0;
          if (isNaN(metacriticB)) metacriticB = 0;

          return metacriticB - metacriticA; // Highest metacritic first
        });

      case "released":
        return sortedResults.sort((a, b) => {
          const dateA = a.released ? new Date(a.released) : new Date(0);
          const dateB = b.released ? new Date(b.released) : new Date(0);

          // Handle invalid dates
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;

          return dateB - dateA; // Newest first
        });

      case "name_asc":
        return sortedResults.sort((a, b) => {
          const nameA = (a.name || "").toString().toLowerCase().trim();
          const nameB = (b.name || "").toString().toLowerCase().trim();
          return nameA.localeCompare(nameB, "en", { numeric: true }); // A to Z
        });

      case "name_desc":
        return sortedResults.sort((a, b) => {
          const nameA = (a.name || "").toString().toLowerCase().trim();
          const nameB = (b.name || "").toString().toLowerCase().trim();
          return nameB.localeCompare(nameA, "en", { numeric: true }); // Z to A
        });

      case "popularity":
        return sortedResults.sort((a, b) => {
          let popularityA = 0;
          let popularityB = 0;

          // Try different popularity indicators
          if (a.suggestions_count) {
            popularityA = parseInt(String(a.suggestions_count), 10);
          } else if (a.reviews_count) {
            popularityA = parseInt(String(a.reviews_count), 10);
          } else if (a.added) {
            popularityA = parseInt(String(a.added), 10);
          }

          if (b.suggestions_count) {
            popularityB = parseInt(String(b.suggestions_count), 10);
          } else if (b.reviews_count) {
            popularityB = parseInt(String(b.reviews_count), 10);
          } else if (b.added) {
            popularityB = parseInt(String(b.added), 10);
          }

          // Handle NaN values
          if (isNaN(popularityA)) popularityA = 0;
          if (isNaN(popularityB)) popularityB = 0;

          return popularityB - popularityA; // Most popular first
        });

      case "relevance":
      default:
        // Keep original order for relevance or default case
        return sortedResults;
    }
  }, []);

  const debouncedSearch = useCallback(
    async (value, genre, sort) => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

      if (value.trim() || genre) {
        setIsSearching(true);
        setShowResults(true);
      }

      searchTimeoutRef.current = setTimeout(async () => {
        try {
          if (handleSearch) {
            const results = await handleSearch(value, genre, sort);
            // If handleSearch returns results, sort them here
            if (results && Array.isArray(results)) {
              const sortedResults = sortSearchResults(results, sort);
              setSearchResults(sortedResults);
            }
          }
          setVisibleCount(7);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    },
    [handleSearch, sortSearchResults]
  );

  const handleInputChange = useCallback(
    (value) => {
      setSearchTerm(value);
      setSelectedResultIndex(-1);

      if (value.trim()) {
        setShowResults(true);
        debouncedSearch(value, selectedGenre, sortBy);
      } else {
        setShowResults(false);
        setIsSearching(false);
        setSearchResults([]);
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
      }
    },
    [debouncedSearch, selectedGenre, sortBy]
  );

  const handleInputFocus = useCallback(() => {
    if (searchTerm.trim()) {
      setShowResults(true);
    }
  }, [searchTerm]);

  const handleClearSearch = useCallback((clearFn) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (clearFn) clearFn();
    setSearchTerm("");
    setShowResults(false);
    setSelectedResultIndex(-1);
    setVisibleCount(7);
    setIsSearching(false);
    setSearchResults([]);
  }, []);

  const handleFilterChange = useCallback(
    async (filterType, value) => {
      if (filterType === "genre") setSelectedGenre(value);
      else if (filterType === "sort") setSortBy(value);

      const newGenre = filterType === "genre" ? value : selectedGenre;
      const newSort = filterType === "sort" ? value : sortBy;

      setShowResults(true);
      setSelectedResultIndex(-1);

      // If we already have results and only sort is changing, just re-sort them
      if (filterType === "sort" && searchResults.length > 0) {
        const sortedResults = sortSearchResults(searchResults, value);
        setSearchResults(sortedResults);
      } else {
        // Otherwise, perform a new search
        await debouncedSearch(searchTerm, newGenre, newSort);
      }
    },
    [
      selectedGenre,
      sortBy,
      searchTerm,
      debouncedSearch,
      searchResults,
      sortSearchResults,
    ]
  );

  const handleResultClick = useCallback(
    (game, handleGameSelect) => {
      if (handleGameSelect) {
        handleGameSelect(game);
      }
      if (onAddRecentSearch) {
        onAddRecentSearch(game);
      }
      setShowResults(false);
      setSelectedResultIndex(-1);
      setVisibleCount(7);
    },
    [onAddRecentSearch]
  );

  const handlePopularGenreClick = useCallback(
    async (genre) => {
      console.log("useSearch: handlePopularGenreClick called", genre); // Debug
      setSelectedGenre(genre.id);
      setSearchTerm("");
      setShowResults(true);
      setSelectedResultIndex(-1);
      setVisibleCount(7);

      if (handleSearch) {
        console.log("useSearch: calling handleSearch with genre", genre.id); // Debug
        await debouncedSearch("", genre.id, sortBy);
      }
    },
    [debouncedSearch, sortBy, handleSearch]
  );

  const loadMoreResults = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((v) => v + 7);
      setLoadingMore(false);
    }, 700);
  }, []);

  const resetSearch = useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setSearchTerm("");
    setSelectedGenre("");
    setSortBy("relevance");
    setShowFilters(false);
    setShowResults(false);
    setSelectedResultIndex(-1);
    setIsSearching(false);
    setVisibleCount(7);
    setLoadingMore(false);
    setSearchResults([]);
  }, []);

  const resetVisibleCount = useCallback(() => {
    setVisibleCount(7);
  }, []);

  // Update search results when external results change
  const updateSearchResults = useCallback(
    (results) => {
      if (results && Array.isArray(results)) {
        const sortedResults = sortSearchResults(results, sortBy);
        setSearchResults(sortedResults);
      }
    },
    [sortBy, sortSearchResults]
  );

  return {
    searchTerm,
    selectedGenre,
    sortBy,
    showFilters,
    showResults,
    selectedResultIndex,
    isSearching,
    visibleCount,
    loadingMore,
    searchResults,
    setSearchTerm,
    setSelectedGenre,
    setSortBy,
    setShowFilters,
    setShowResults,
    setSelectedResultIndex,
    setVisibleCount,
    handleInputChange,
    handleInputFocus,
    handleClearSearch,
    handleFilterChange,
    handleResultClick,
    handlePopularGenreClick,
    loadMoreResults,
    resetSearch,
    resetVisibleCount,
    debouncedSearch,
    updateSearchResults,
    sortSearchResults,
  };
};

export default useSearch;
