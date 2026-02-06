import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AppTabParamList } from '../types';
import HomeScreen from '../../screens/HomeScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

const COLORS = {
  primary: '#4F63B6',
  inactive: '#9B9B9B',
};

export default function AppTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarIcon: ({ focused }) => {
          const color = focused ? COLORS.primary : COLORS.inactive;
          if (route.name === 'Home')
            return <Ionicons name="home-outline" size={34} color={color} />;
          if (route.name === 'Favorites')
            return <Ionicons name="bookmark-outline" size={30} color={color} />;
          return <Ionicons name="person-outline" size={30} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
