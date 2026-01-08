# Contributing to PlayGuide

Thank you for your interest in contributing to PlayGuide! This document explains how you can contribute to the project.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Development Setup](#-development-setup)
- [Project Structure](#-project-structure)
- [Code Standards](#-code-standards)
- [Pull Request Process](#-pull-request-process)
- [Game Data Structure](#-game-data-structure)

## 🤝 Code of Conduct

The PlayGuide community welcomes everyone with respect and dignity. We expect:

- Treat other contributors with respect
- Provide constructive feedback
- Be open to different opinions and experiences
- Work for the benefit of the community

## 🎮 How Can I Contribute?

### 1. Contributing Game Data

PlayGuide uses game data that was initially sourced from the RAWG API and is now stored and maintained locally in `db.json`. The application does not fetch data from the API at runtime.

If you want to improve game data handling:

- Add new games to `db.json` (following the existing data structure)
- Update existing game information
- Add missing fields to game objects
- Improve data consistency and quality
- Optimize the JSON structure for better performance

**Current Game Data Fields:**
```javascript
{
  id: 3498,
  name: "Grand Theft Auto V",
  slug: "grand-theft-auto-v",
  released: "2013-09-17",
  background_image: "https://media.rawg.io/media/games/...",
  rating: 4.47,
  rating_top: 5,
  ratings_count: 7194,
  metacritic: 92,
  playtime: 74,
  genres: [
    {
      id: 4,
      name: "Action",
      slug: "action",
      games_count: 189370,
      image_background: "https://media.rawg.io/media/..."
    }
  ]
}
```

### 2. Feature Contributions

We welcome contributions for:

- **User Features**: Rating system, favorites functionality, viewing history
- **Search & Filter**: Advanced search options, genre filters, platform filters
- **UI/UX Improvements**: Better navigation, responsive design, accessibility
- **Performance**: Data rendering optimizations (1000+ games), lazy loading
- **New Pages**: Add new routes and pages

### 3. Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/device information
- Console errors (if any)

**Bug Report Template:**
```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Screen Resolution: 1920x1080
```

## 💻 Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/playguide.git

# Navigate to project directory
cd playguide

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## 📁 Project Structure

```
playguide/
├── node_modules/          # Dependencies
├── public/                # Static assets
├── src/
│   ├── assets/           # Images, fonts, icons
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── layout/           # Layout components
│   ├── pages/            # Page components
│   ├── Routes/           # React Router configuration
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component
│   ├── index.css         # Global styles
│   └── index.js          # Entry point
├── .gitignore
├── db.json               # Local data (if used)
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration (if using Vite)
```

## 📝 Code Standards

### JavaScript/React

- Use ES6+ syntax
- Use functional components with hooks
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

**Good Example:**
```javascript
// components/GameCard.jsx
import { useState } from 'react';

const GameCard = ({ game, onFavorite, onRate }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleFavoriteClick = () => {
    onFavorite(game.id);
  };
  
  return (
    <div 
      className="game-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={game.background_image} alt={game.name} />
      <h3>{game.name}</h3>
      <div className="rating">
        <span>⭐ {game.rating}</span>
        <span>Metacritic: {game.metacritic}</span>
      </div>
      <button onClick={handleFavoriteClick}>
        Add to Favorites
      </button>
    </div>
  );
};

export default GameCard;
```

### CSS/Styling (Tailwind)

- Use Tailwind utility classes
- Keep custom CSS minimal
- Mobile-first responsive design
- Use consistent spacing

```jsx
// Good example with Tailwind
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <img className="w-full h-48 object-cover rounded-t-lg" src={image} />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
</div>
```

### Component Organization

```javascript
// Component structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Optional but recommended

// 1. Component definition
const ComponentName = ({ prop1, prop2 }) => {
  // 2. State hooks
  const [state, setState] = useState(initialValue);
  
  // 3. Effect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 5. Render helpers
  const renderSomething = () => {
    return <div>...</div>;
  };
  
  // 6. Return JSX
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

// 7. PropTypes (optional)
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

// 8. Export
export default ComponentName;
```

## 🔄 Pull Request Process

1. **Fork the repository** and create your branch from `master`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following code standards

3. **Test your changes** manually
   - Run the app locally
   - Test all affected features
   - Check responsive design
   - Verify console for errors

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add game filtering by genre"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `perf:` - Performance improvements
   - `chore:` - Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** with:
   - Clear title and description
   - Reference any related issues
   - Screenshots (for UI changes)
   - List of changes made
   
   Small, focused pull requests are preferred over large, multi-purpose changes.

### PR Review Checklist

Before submitting, make sure:
- [ ] Code follows project structure
- [ ] No console errors
- [ ] Works on mobile and desktop
- [ ] Tailwind classes are used properly
- [ ] Components are reusable
- [ ] No unnecessary dependencies added
- [ ] README updated (if needed)

## 🎮 Game Data Structure

### Local Data Storage

PlayGuide stores all game data locally in `db.json`. This data was originally fetched from the RAWG API but is now maintained as a static JSON file for better performance and offline capability. The `db.json` file is the single source of truth for game data in the application.

**Game Object Structure in db.json:**

```javascript
{
  id: Number,                    // Unique game ID
  name: String,                  // Game title
  slug: String,                  // URL-friendly name
  released: String,              // Release date (YYYY-MM-DD)
  background_image: String,      // Main image URL
  rating: Number,                // Average rating (0-5)
  rating_top: Number,            // Top rating value
  ratings_count: Number,         // Number of ratings
  metacritic: Number,            // Metacritic score (0-100)
  playtime: Number,              // Average playtime (hours)
  genres: Array,                 // Array of genre objects
  platforms: Array,              // Available platforms (optional)
  stores: Array,                 // Where to buy (optional)
  tags: Array,                   // Game tags (optional)
  screenshots: Array,            // Screenshots (optional)
  description: String            // Game description (optional)
}
```

### Genre Object Structure

```javascript
{
  id: Number,
  name: String,
  slug: String,
  games_count: Number,
  image_background: String
}
```

## 🚀 Feature Ideas

Here are some features you could contribute:

### High Priority
- Advanced filtering (by genre, platform, year)
- Search functionality
- User authentication (favorites, ratings)
- Game details page
- Pagination for 1000+ games

### Medium Priority
- Dark mode toggle
- Compare games feature
- User reviews system
- Wishlist functionality
- Recently viewed games

### Nice to Have
- Game recommendations
- Social sharing
- User profiles
- Achievement tracking
- Game collections

## 💡 Tips for Contributors

1. **Start Small**: Pick a small issue or feature first
2. **Ask Questions**: Don't hesitate to ask in issues or discussions
3. **Read Existing Code**: Understand the codebase before making changes
4. **Keep PRs Focused**: One feature or fix per PR
5. **Update Documentation**: Update README if you add new features
6. **Be Patient**: Reviews take time, we appreciate your contribution!

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [RAWG API Documentation](https://rawg.io/apidocs)
- [Vite Documentation](https://vitejs.dev)

## 💬 Communication

- **GitHub Issues**: Bug reports and feature requests
- **Pull Requests**: Code contributions
- **Discussions**: Questions and ideas

## ❓ Questions?

If you have questions:
1. Check existing issues and discussions
2. Open a new issue with the `question` label
3. Reach out to maintainers

## 🏆 Recognition

All contributors will be:
- Listed in our CONTRIBUTORS.md file
- Mentioned in release notes
- Part of our growing community!

---

**Thank you for contributing to PlayGuide! Happy coding! 🎮✨**
