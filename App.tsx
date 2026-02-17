import './global.css';
import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import { AuthGateProvider } from './services/authGate';
import { FavoritesGateProvider } from './services/favoritesGate';
import { CatalogGateProvider } from './services/catalogGate';

export default function App() {
  return (
    <AuthGateProvider>
      <CatalogGateProvider>
        <FavoritesGateProvider>
          <RootNavigator />
        </FavoritesGateProvider>
      </CatalogGateProvider>
    </AuthGateProvider>
  );
}
