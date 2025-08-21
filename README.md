# Pokemon Explorer App

A modern Pokemon explorer built with React, TypeScript, and Vite.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd pokemon-test-app

# Install dependencies
npm install
```

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS + Shadcn UI
- **API**: PokeAPI (GET - https://pokeapi.co/api/v2/pokemon/
  GET - https://pokeapi.co/api/v2/pokemon/1/)
- **Testing**: Vitest + React Testing Library

## 📁 Project Structure

```
pokemon-test-app/
├── src/
│   ├── components/     # React components
│   ├── store/         # Redux store setup
│   │   ├── api/       # RTK Query API definitions
│   │   └── slices/    # Redux slices
│   ├── styles/        # Global styles
│   └── types/         # TypeScript types
├── public/            # Static assets
└── tests/            # Test files
```

## 🔑 Features

- Pokemon list with pagination
- Detailed Pokemon information
- Dark/Light theme support
- Responsive design
- Real-time data updates

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 📦 Development

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

### Vite Configuration

This template provides a minimal setup to get React working in Vite with HMR and ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### ESLint Configuration

For production applications, enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // Or ...tseslint.configs.strictTypeChecked for stricter rules
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

### React-specific Lint Rules

Install additional React lint plugins:

```bash
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

Configure in `eslint.config.js`:

```js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```
