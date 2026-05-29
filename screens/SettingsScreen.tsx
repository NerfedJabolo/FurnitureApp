import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppStackParamList } from '../navigation/types';
import { useAuthGate } from '../services/authGate';

type Props = NativeStackScreenProps<AppStackParamList, 'Settings'>;

const COLORS = {
  bg: '#F3F3F4',
  text: '#2F2F2F',
  muted: '#9C9C9C',
  primary: '#4F63B6',
  card: '#FFFFFF',
  fieldBg: '#FFFFFF',
};

function HelpCard({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[56px] flex-row items-center justify-between rounded-xl px-4"
      style={{ backgroundColor: COLORS.card }}>
      <Text className="text-[18px] font-medium" style={{ color: COLORS.primary }}>
        {title}
      </Text>
      <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
    </Pressable>
  );
}

export default function SettingsScreen({ navigation }: Props) {
  const { user } = useAuthGate();

  return (
    <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <View className="flex-1 px-5 pt-3">
        <View className="h-12 flex-row items-center justify-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute left-0 h-10 w-10 items-center justify-center">
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </Pressable>
          <Text className="text-[32px] font-semibold" style={{ color: COLORS.text }}>
            Settings
          </Text>
        </View>

        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-[22px] font-semibold" style={{ color: COLORS.muted }}>
              Personal information
            </Text>
            <Ionicons name="create-outline" size={20} color={COLORS.muted} />
          </View>

          <View className="mt-4 rounded-xl px-4 py-4" style={{ backgroundColor: COLORS.fieldBg }}>
            <Text className="text-[14px]" style={{ color: COLORS.muted }}>
              Name
            </Text>
            <Text className="mt-1 text-[18px] font-medium" style={{ color: COLORS.primary }}>
              {user?.name ?? 'Elina Hovakimyan'}
            </Text>
          </View>

          <View className="mt-3 rounded-xl px-4 py-4" style={{ backgroundColor: COLORS.fieldBg }}>
            <Text className="text-[14px]" style={{ color: COLORS.muted }}>
              Email
            </Text>
            <Text className="mt-1 text-[18px] font-medium" style={{ color: COLORS.primary }}>
              {user?.email ?? 'hello@gmail.com'}
            </Text>
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-[22px] font-semibold" style={{ color: COLORS.muted }}>
            Help Center
          </Text>

          <View className="mt-4">
            <HelpCard title="FAQ" />
            <View className="h-3" />
            <HelpCard title="Contact Us" />
            <View className="h-3" />
            <HelpCard title="Privacy & Terms" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
