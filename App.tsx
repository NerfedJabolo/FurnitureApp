import './global.css';
import React, { useState } from 'react';
import SplashScreen from 'screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

type Route = 'splash' | 'signin' | 'signup';

export default function App() {
  const [route, setRoute] = useState<Route>('splash');

  if (route === 'splash') {
    return <SplashScreen onSignIn={() => setRoute('signin')} onSignUp={() => setRoute('signup')} />;
  }

  if (route === 'signin') {
    return (
      <SignInScreen
        onBack={() => setRoute('splash')}
        onGoSignUp={() => setRoute('signup')}
        onSignIn={(d) => console.log('signin', d)}
        onGoogle={() => console.log('google signin')}
      />
    );
  }

  return (
    <SignUpScreen
      onBack={() => setRoute('splash')}
      onGoSignIn={() => setRoute('signin')}
      onSignUp={(d) => console.log('signup', d)}
      onGoogle={() => console.log('google signup')}
      onTerms={() => console.log('open terms')}
    />
  );
}
