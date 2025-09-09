/**
 * =============================
 * Number & Text Formatting Utils
 * =============================
 */

/**
 * Format large reviews counts into short form
 */
export const formatReviewsCount = (count) => {
  if (!count) return "0";

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }

  if (count >= 1000) {
    return `${Math.round(count / 1000)}k`;
  }

  return count.toString();
};

/**
 * Format playtime hours or return "N/A" if missing
 */
export const formatPlaytime = (hours) => (hours ? `${hours} hours` : "N/A");

/**
 * Capitalize the first letter of a given string
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Convert genre name into a clean slug (used in URLs/classes)
 */
export const sanitizeGenreName = (genre) =>
  genre
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");

/**
 * =============================
 * Rating & Review Utilities
 * =============================
 */

/**
 * Get background color class based on Metacritic score
 */
export const getMetacriticColor = (score) => {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
};

/**
 * Get text color class based on user rating score
 */
export const getRatingColor = () => {
  return "text-yellow-400";
};

/**
 * =============================
 * ESRB Age Rating Utilities
 * =============================
 */

/**
 * Get ESRB age rating metadata (text, color, description)
 */
export const getAgeRating = (esrbRating) => {
  const ratings = {
    everyone: { text: "E", color: "bg-green-500", description: "Everyone" },
    "everyone-10-plus": {
      text: "E10+",
      color: "bg-blue-500",
      description: "Everyone 10+",
    },
    teen: { text: "T", color: "bg-yellow-500", description: "Teen" },
    mature: { text: "M", color: "bg-orange-500", description: "Mature 17+" },
    "adults-only": {
      text: "AO",
      color: "bg-red-500",
      description: "Adults Only",
    },
  };

  return (
    ratings[esrbRating?.slug] || {
      text: "NR",
      color: "bg-gray-500",
      description: "Not Rated",
    }
  );
};
