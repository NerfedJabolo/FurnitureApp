import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppStackParamList } from '../types';
import AppTabsNavigator from './AppTabsNavigator';
import ProductScreen from '../../screens/ProductScreen';
import CreateListingScreen from '../../screens/CreateListingScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabsNavigator} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="CreateListing" component={CreateListingScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
