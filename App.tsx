import './global.css';
import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import { AuthGateProvider } from './services/authGate';

export default function App() {
  return (
    <AuthGateProvider>
      <RootNavigator />
    </AuthGateProvider>
  );
}
