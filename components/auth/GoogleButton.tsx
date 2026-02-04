import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AUTH_COLORS } from './colors';

export default function GoogleButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="mx-auto h-14 w-36 items-center justify-center rounded-2xl"
      style={{ backgroundColor: AUTH_COLORS.googleBtn }}>
      <Ionicons name="logo-google" size={28} color="#FFFFFF" />
    </Pressable>
  );
}
