import './global.css';
import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import { AuthGateProvider } from './services/authGate';
import { FavoritesGateProvider } from './services/favoritesGate';

export default function App() {
  return (
    <AuthGateProvider>
      <FavoritesGateProvider>
        <RootNavigator />
      </FavoritesGateProvider>
    </AuthGateProvider>
  );
}
