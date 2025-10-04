import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./";

const useRecentViews = () => {
  const [recentViews, setRecentViews] = useLocalStorage("recentViews", []);

  useEffect(() => {
    const cleanupOldData = () => {
      if (recentViews.length > 0) {
        const needsUpdate = recentViews.some((game) => {
          if (
            typeof game.viewedAt === "string" ||
            (typeof game.viewedAt === "number" && game.viewedAt < 1000000000000)
          ) {
            return true;
          }
          return false;
        });

        if (needsUpdate) {
          console.log("Updating old recent views data format...");
          const updatedViews = recentViews.map((game) => ({
            ...game,
            viewedAt: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
          }));
          setRecentViews(updatedViews);
        }
      }
    };

    cleanupOldData();
  }, [recentViews, setRecentViews]);

  const addToRecentViews = useCallback(
    (gameData) => {
      if (!gameData) {
        console.warn("addToRecentViews: gameData is null or undefined");
        return;
      }

      if (!gameData.id) {
        console.warn("addToRecentViews: gameData.id is missing", gameData);
        return;
      }

      try {
        const processedGame = {
          id: gameData.id,
          name: gameData.name || "Unknown Game",
          background_image: gameData.background_image || null,
          rating: gameData.rating || 0,
          released: gameData.released || null,
          genres: Array.isArray(gameData.genres) ? gameData.genres : [],
          metacritic: gameData.metacritic || null,
          viewedAt: Date.now(),
        };

        console.log(
          "✅ Adding to recent views:",
          processedGame.name,
          "| ID:",
          processedGame.id,
          "| Timestamp:",
          new Date(processedGame.viewedAt).toLocaleString()
        );

        setRecentViews((prev) => {
          const currentViews = Array.isArray(prev) ? prev : [];
          const filtered = currentViews.filter(
            (item) => item.id !== gameData.id
          );
          return [processedGame, ...filtered].slice(0, 100);
        });
      } catch (error) {
        console.error("Error adding to recent views:", error);
      }
    },
    [setRecentViews]
  );

  const removeFromRecentViews = useCallback(
    (gameId) => {
      setRecentViews((prev) => {
        const currentViews = Array.isArray(prev) ? prev : [];
        return currentViews.filter((view) => view.id !== gameId);
      });
    },
    [setRecentViews]
  );

  const clearRecentViews = useCallback(() => {
    setRecentViews([]);
  }, [setRecentViews]);

  return {
    recentViews: Array.isArray(recentViews) ? recentViews : [],
    addToRecentViews,
    clearRecentViews,
    removeFromRecentViews,
  };
};

export default useRecentViews;
