import React from 'react';
import { View, Text } from 'react-native';
import { AUTH_COLORS } from './colors';

export default function AuthDivider({ text }: { text: string }) {
  return (
    <View className="flex-row items-center">
      <View style={{ backgroundColor: AUTH_COLORS.divider }} className="h-[1px] flex-1" />
      <Text style={{ color: AUTH_COLORS.primary }} className="mx-4 text-[14px] font-medium">
        {text}
      </Text>
      <View style={{ backgroundColor: AUTH_COLORS.divider }} className="h-[1px] flex-1" />
    </View>
  );
}
