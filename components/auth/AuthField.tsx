import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { AUTH_COLORS } from './colors';

export default function AuthField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  right,
  keyboardType,
  autoCapitalize = 'none',
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  right?: React.ReactNode;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) {
  return (
    <View className="w-full">
      <Text style={{ color: AUTH_COLORS.label }} className="mb-2 text-[14px] font-medium">
        {label}
      </Text>

      <View
        style={{ borderColor: AUTH_COLORS.border }}
        className="h-14 w-full flex-row items-center rounded-2xl border px-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={AUTH_COLORS.placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className="flex-1 text-[14px]"
          style={{
            color: AUTH_COLORS.text,
            paddingVertical: Platform.OS === 'android' ? 10 : 12,
          }}
        />
        {right ? <View className="pl-3">{right}</View> : null}
      </View>
    </View>
  );
}
