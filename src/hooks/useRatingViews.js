import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

const useRatingViews = () => {
  const [ratingViews, setRatingViews] = useLocalStorage("ratingViews", []);

  const toggleRating = useCallback(
    (game) => {
      const gameId = typeof game === "object" ? game.id : game;
      const gameData = typeof game === "object" ? game : null;

      setRatingViews((prev) => {
        const currentViews = Array.isArray(prev) ? prev : [];

        const exists = currentViews.find((view) => view.id === gameId);

        if (exists) {
          return currentViews.filter((view) => view.id !== gameId);
        } else {
          return gameData ? [...currentViews, gameData] : currentViews;
        }
      });
    },
    [setRatingViews]
  );

  const removeRating = useCallback(
    (gameId) => {
      setRatingViews((prev) => {
        const currentViews = Array.isArray(prev) ? prev : [];
        return currentViews.filter((view) => view.id !== gameId);
      });
    },
    [setRatingViews]
  );

  const isGameRated = useCallback(
    (gameId) => {
      const views = Array.isArray(ratingViews) ? ratingViews : [];
      return views.some((view) => view.id === gameId);
    },
    [ratingViews]
  );

  return {
    ratingViews: Array.isArray(ratingViews) ? ratingViews : [],
    toggleRating,
    removeRating,
    isGameRated,
  };
};

export default useRatingViews;
