import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AUTH_COLORS } from './colors';

export default function AuthHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <View className="flex-row items-center">
      <Pressable
        onPress={onBack}
        hitSlop={12}
        className="mr-2 h-10 w-10 items-center justify-center">
        <Ionicons name="arrow-back" size={22} color={AUTH_COLORS.primary} />
      </Pressable>

      <Text style={{ color: AUTH_COLORS.primary }} className="text-[26px] font-extrabold">
        {title}
      </Text>
    </View>
  );
}
