# Furniture App

A mobile furniture marketplace built with React Native and Expo. Browse furniture across categories, search products, save favorites, and manage your profile.

## Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript (strict mode)
- **Navigation:** React Navigation (native stack + bottom tabs)
- **Styling:** NativeWind (Tailwind CSS)
- **Persistence:** AsyncStorage
- **Icons:** Ionicons

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Add your Pexels API key in `.env`:

```
EXPO_PUBLIC_PEXELS_API_KEY=your_key_here
```

3. Start the app:

```bash
npx expo start
```

Then press `a` for Android, `i` for iOS, or scan the QR code with Expo Go.

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm start`     | Start Expo dev server      |
| `npm run android` | Start on Android         |
| `npm run ios`   | Start on iOS               |
| `npm run web`   | Start web version          |
| `npm run lint`  | Run ESLint + Prettier check |
| `npm run format`| Auto-fix linting issues    |

## Features

- **Authentication** — Register and sign in. Sessions persist locally.
- **Product Catalog** — Real furniture images fetched from the Pexels API with 12-hour caching.
- **Category Filtering** — Browse by Popular, Chair, Table, Armchair, Bed, and Lamp.
- **Search** — Search products by title across all categories.
- **Favorites** — Bookmark products. Per-user persistence.
- **Settings** — View personal info and access Help Center cards.

## Project Structure

```
├── App.tsx                  # Root component with provider nesting
├── navigation/
│   ├── types.ts             # Typed param lists for all navigators
│   ├── RootNavigator.tsx    # Auth-gated root stack
│   ├── auth/
│   │   └── AuthStackNavigator.tsx
│   └── app/
│       ├── AppStackNavigator.tsx
│       └── AppTabsNavigator.tsx
├── screens/
│   ├── SplashScreen.tsx
│   ├── SignInScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProductScreen.tsx
│   ├── FavoritesScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SettingsScreen.tsx
│   └── CreateListingScreen.tsx
├── services/
│   ├── auth.ts              # Auth CRUD (AsyncStorage)
│   ├── authGate.tsx         # Auth context provider
│   ├── catalog.ts           # Pexels API + caching
│   ├── catalogGate.tsx      # Catalog context provider
│   ├── favorites.ts         # Favorites CRUD (AsyncStorage)
│   └── favoritesGate.tsx    # Favorites context provider
├── components/
│   └── auth/                # Reusable auth form components
└── data/
    └── products.ts          # Types, categories, seed data
```
