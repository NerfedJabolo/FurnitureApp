import './global.css';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import SplashScreen from 'screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

import { getCurrentUser, logout, PublicUser } from './services/auth';
import HomeScreen from 'screens/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

type Route = 'splash' | 'signin' | 'signup' | 'home';

export default function App() {
  const [route, setRoute] = useState<Route>('splash');
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState<PublicUser | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const u = await getCurrentUser();
        if (u) {
          setUser(u);
          setRoute('home');
        } else {
          setRoute('splash');
        }
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  if (booting) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  if (route === 'splash') {
    return <SplashScreen onSignIn={() => setRoute('signin')} onSignUp={() => setRoute('signup')} />;
  }

  if (route === 'signin') {
    return (
      <SignInScreen
        onBack={() => setRoute('splash')}
        onGoSignUp={() => setRoute('signup')}
        onSignedIn={(u) => {
          setUser(u);
          setRoute('home');
        }}
      />
    );
  }

  if (route === 'signup') {
    return (
      <SignUpScreen
        onBack={() => setRoute('splash')}
        onGoSignIn={() => setRoute('signin')}
        onSignedUp={(u) => {
          setUser(u);
          setRoute('home');
        }}
        onTerms={() => {}}
      />
    );
  }

  // HOME
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HomeScreen
        onSearch={() => {}}
        onProduct={(id) => console.log('product', id)}
        onTab={(t) => console.log('tab', t)}
      />

      {/* Temporary logout overlay button (remove later) */}
      <View className="absolute right-6 top-14">
        <Pressable
          onPress={async () => {
            await logout();
            setUser(null);
            setRoute('splash');
          }}
          className="rounded-xl px-3 py-2"
          style={{ backgroundColor: 'rgba(79,99,182,0.12)' }}>
          <Text style={{ color: '#4F63B6' }} className="font-semibold">
            Log out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
