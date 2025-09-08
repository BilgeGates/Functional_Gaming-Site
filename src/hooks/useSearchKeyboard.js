import { useEffect } from "react";

const useSearchKeyboard = ({
  searchRef,
  showResults,
  searchResults = [],
  selectedResultIndex,
  setSelectedResultIndex,
  visibleCount,
  searchTerm,
  handleResultClick,
  handleGameSelect,
  setShowResults,
  setShowFilters,
}) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setShowFilters(false);
        setSelectedResultIndex(-1);
      }
    };

    const handleKeyDown = (event) => {
      if (!showResults || searchResults.length === 0) return;

      const maxIndex = Math.min(visibleCount - 1, searchResults.length - 1);

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          setShowResults(false);
          setSelectedResultIndex(-1);
          break;
        case "ArrowDown":
          event.preventDefault();
          setSelectedResultIndex((prev) => {
            if (prev < maxIndex) {
              return prev + 1;
            }
            return prev;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedResultIndex((prev) => {
            if (prev > 0) {
              return prev - 1;
            } else if (prev === 0) {
              return -1;
            }
            return prev;
          });
          break;
        case "Enter":
          event.preventDefault();
          if (selectedResultIndex >= 0 && searchResults[selectedResultIndex]) {
            const selectedGame = searchResults[selectedResultIndex];
            handleResultClick(selectedGame, handleGameSelect);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    searchRef,
    showResults,
    searchResults,
    selectedResultIndex,
    handleResultClick,
    handleGameSelect,
    visibleCount,
    searchTerm,
    setShowResults,
    setShowFilters,
    setSelectedResultIndex,
  ]);
};

export default useSearchKeyboard;
