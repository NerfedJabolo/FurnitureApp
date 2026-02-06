import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import { useAuthGate } from '../services/authGate';

import AuthStackNavigator from './auth/AuthStackNavigator';
import AppTabsNavigator from './app/AppTabsNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { booting, user } = useAuthGate();

  if (booting) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="App" component={AppTabsNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
