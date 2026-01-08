# PlayGuide

A comprehensive game information platform featuring 1000+ games with detailed information, user ratings, and favorites functionality.

## Features

- Browse 1000+ games with detailed information
- View game ratings, Metacritic scores, and genres
- Add games to favorites
- Rate games and submit reviews
- Search and filter games by name, genre, and platform
- View game details, screenshots, and statistics
- Viewing history and recently viewed games
- Responsive design for all devices

## Tech Stack

- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Local Storage** - User data persistence

## Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/playguide.git

# Navigate to project directory
cd playguide

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000` to view the app.

## Project Structure
```
playguide/
├── src/
│   ├── assets/                  # Images, fonts, icons
│   ├── components/
│   │   ├── common/             # Reusable components
│   │   │   ├── Controls.jsx
│   │   │   ├── FavoritesModal.jsx
│   │   │   ├── GameCard.jsx
│   │   │   ├── GameList.jsx
│   │   │   ├── MotionWrapper.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── RatingModal.jsx
│   │   │   ├── RatingViewsModal.jsx
│   │   │   ├── RecentViewsModal.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SearchGameItem.jsx
│   │   │   └── Stats.jsx
│   │   ├── sections/           # Section components
│   │   │   ├── CategoriesSection/
│   │   │   │   └── CategoriesSection.jsx
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── HeroSection.jsx
│   │   │   ├── TopRatedSection/
│   │   │   │   └── TopRatedSection.jsx
│   │   │   └── TrendingSection/
│   │   │       └── TrendingSection.jsx
│   │   └── ui/                 # UI components
│   │       ├── ActionButton.jsx
│   │       ├── CardOverlay.jsx
│   │       ├── ErrorMessage.jsx
│   │       ├── ExploreButton.jsx
│   │       ├── GameStats.jsx
│   │       ├── GenreBadge.jsx
│   │       ├── LoadingSpinner.jsx
│   │       ├── MetacriticScore.jsx
│   │       ├── RatingBadge.jsx
│   │       └── SectionHeader.jsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── index.js
│   │   ├── useDocumentTitle.js
│   │   ├── useFavorites.js
│   │   ├── useGameData.js
│   │   ├── useHandlers.js
│   │   ├── useInViewAnimation.js
│   │   ├── useLocalStorage.js
│   │   ├── useLogic.js
│   │   ├── useRating.js
│   │   ├── useRatingViews.js
│   │   ├── useRecentViews.js
│   │   ├── useSearch.js
│   │   ├── useSearchInteractions.js
│   │   ├── useSearchKeyboard.js
│   │   └── useSearchResults.js
│   ├── layout/                 # Layout components
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   └── index.js
│   ├── pages/                  # Page components
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── ProductDetails/
│   │   │   └── ProductDetails.jsx
│   │   └── Products/
│   │       └── Products.jsx
│   ├── routes/                 # Route configuration
│   │   └── router.jsx
│   ├── utils/                  # Utility functions
│   │   ├── dateUtils.js
│   │   ├── formatUtils.js
│   │   ├── iconUtils.js
│   │   ├── index.js
│   │   └── searchUtils.js
│   ├── App.jsx                 # Main App component
│   ├── index.css               # Global styles
│   └── index.js                # Entry point
├── public/                     # Static assets
├── db.json                     # Game database (1000+ games)
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE
└── tailwind.config.js          # Tailwind configuration
```

## Game Data

Game data is stored locally in `db.json`. The data was originally sourced from the RAWG API and includes:

- Game title, slug, and release date
- Ratings and Metacritic scores
- Genres and platforms
- Background images and screenshots
- Playtime statistics

## Available Scripts
```bash
# Start development server
npm start

# Build for production
npm run build

# Run production build locally
npm run serve
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, contact: darkdeveloperassistant@gmail.com

---

**Made with ❤️ by Khatai Huseynzada**
