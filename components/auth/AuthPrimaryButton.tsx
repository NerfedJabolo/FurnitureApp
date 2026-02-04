import React from 'react';
import { Pressable, Text } from 'react-native';
import { AUTH_COLORS } from './colors';

export default function AuthPrimaryButton({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-14 w-full items-center justify-center rounded-2xl"
      style={{ backgroundColor: AUTH_COLORS.primary }}>
      <Text className="text-[16px] font-semibold text-white">{title}</Text>
    </Pressable>
  );
}
