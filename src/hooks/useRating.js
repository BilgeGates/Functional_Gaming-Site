import { useCallback } from "react";

import { useLocalStorage, useRatingViews } from "./";

const useRating = () => {
  const [gameRatings, setGameRatings] = useLocalStorage("gameRatings", {});

  const {
    ratingViews,
    toggleRating,
    removeRating: removeFromViews,
    isGameRated,
  } = useRatingViews();

  const submitRating = useCallback(
    (gameId, rating, gameData = null) => {
      setGameRatings((prev) => ({
        ...prev,
        [gameId]: {
          rating,
          ratedAt: new Date().toISOString(),
        },
      }));

      if (gameData && !isGameRated(gameId)) {
        toggleRating(gameData);
      }
    },
    [setGameRatings, toggleRating, isGameRated]
  );

  const getUserRating = useCallback(
    (gameId) => {
      return gameRatings[gameId]?.rating || 0;
    },
    [gameRatings]
  );

  const getRatingColor = useCallback((rating) => {
    if (rating >= 4.5) return "text-green-500";
    if (rating >= 4) return "text-yellow-500";
    if (rating >= 3) return "text-orange-500";
    return "text-red-500";
  }, []);

  const removeRating = useCallback(
    (gameId) => {
      // Həm rating-i, həm də views-dən sil
      setGameRatings((prev) => {
        const updated = { ...prev };
        delete updated[gameId];
        return updated;
      });
      removeFromViews(gameId);
    },
    [setGameRatings, removeFromViews]
  );

  const getAllRatings = useCallback(() => {
    return gameRatings;
  }, [gameRatings]);

  return {
    gameRatings,
    ratingViews,
    submitRating,
    getUserRating,
    getRatingColor,
    removeRating,
    getAllRatings,
  };
};

export default useRating;
