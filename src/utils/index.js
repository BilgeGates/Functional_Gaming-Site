// Date utilities
export {
  formatDate,
  formatTimeAgo,
  formatReleaseDate,
  getGameStatus,
} from "./dateUtils";

// Search & filter utilities
export {
  searchGames,
  filterGamesByGenre,
  filterGamesByPlatform,
  sortGames,
  getPopularityScore,
  getPopularGames,
  getTrendingGames,
  sortOptions,
  getDisplayDate,
} from "./searchUtils";

// Format & display utilities
export {
  formatReviewsCount,
  formatPlaytime,
  capitalize,
  sanitizeGenreName,
  getMetacriticColor,
  getRatingColor,
  getAgeRating,
} from "./formatUtils";

// Safe wrappers
export {
  safeGetRatingColor,
  safeGetUserRating,
  safeIsGameFavorited,
  formatGameDate,
} from "./searchUtils";

// Icon utilities
export { getPlatformIcon } from "./iconUtils";

// Genre constants
export { genres } from "./searchUtils";
