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

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const debouncedSearch = useCallback(
    (value, genre, sort) => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

      if (value.trim() || genre) {
        setIsSearching(true);
        setShowResults(true);
      }

      searchTimeoutRef.current = setTimeout(async () => {
        try {
          if (handleSearch) {
            await handleSearch(value, genre, sort);
          }
          setVisibleCount(7);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    },
    [handleSearch]
  );

  const handleInputChange = useCallback(
    (value) => {
      setSelectedResultIndex(-1);

      if (value.trim()) {
        setShowResults(true);
        debouncedSearch(value, selectedGenre, sortBy);
      } else {
        setShowResults(false);
        setIsSearching(false);
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
  }, []);

  const handleFilterChange = useCallback(
    (filterType, value) => {
      if (filterType === "genre") setSelectedGenre(value);
      else if (filterType === "sort") setSortBy(value);

      const newGenre = filterType === "genre" ? value : selectedGenre;
      const newSort = filterType === "sort" ? value : sortBy;

      setShowResults(true);
      setSelectedResultIndex(-1);
      debouncedSearch(searchTerm, newGenre, newSort);
    },
    [selectedGenre, sortBy, searchTerm, debouncedSearch]
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
    (genre) => {
      console.log("useSearch: handlePopularGenreClick called", genre); // Debug
      setSelectedGenre(genre.id);
      setSearchTerm("");
      setShowResults(true);
      setSelectedResultIndex(-1);
      setVisibleCount(7);

      if (handleSearch) {
        console.log("useSearch: calling handleSearch with genre", genre.id); // Debug
        handleSearch("", genre.id, sortBy);
      }
    },
    [handleSearch, sortBy]
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
  }, []);

  const resetVisibleCount = useCallback(() => {
    setVisibleCount(7);
  }, []);

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
  };
};

export default useSearch;
