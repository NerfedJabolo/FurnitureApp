import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthGate } from '../services/authGate';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList } from '../navigation/types';

const COLORS = {
  bg: '#F3F3F4',
  text: '#2F2F2F',
  muted: '#9C9C9C',
  primary: '#4F63B6',
  card: '#FFFFFF',
};

function MenuCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Pressable
      className="h-[74px] flex-row items-center justify-between px-4"
      style={{ backgroundColor: COLORS.card }}>
      <View>
        <Text className="text-[32px] font-semibold" style={{ color: COLORS.primary }}>
          {title}
        </Text>
        <Text className="mt-1 text-[14px]" style={{ color: COLORS.muted }}>
          {subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { user } = useAuthGate();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <View className="flex-1 px-5 pt-3">
        <View className="h-12 flex-row items-center justify-center">
          <Text className="text-[32px] font-semibold" style={{ color: COLORS.text }}>
            Profile
          </Text>
          <Pressable className="absolute right-0 h-10 w-10 items-center justify-center">
            <Ionicons name="log-out-outline" size={24} color={COLORS.primary} />
          </Pressable>
        </View>

        <View className="mt-6">
          <Text className="text-[34px] font-semibold" style={{ color: COLORS.text }}>
            {user?.name ?? 'Elina Hovakimyan'}
          </Text>
          <Text className="mt-1 text-[14px]" style={{ color: COLORS.muted }}>
            {user?.email ?? 'hello@gmail.com'}
          </Text>
        </View>

        <View className="mt-6">
          <MenuCard title="My Listings" subtitle="Already have 10 listing" />
        </View>

        <View className="mt-5">
          <MenuCard title="Settings" subtitle="Account, FAQ, Contact" />
        </View>

        <View className="mt-auto pb-3">
          <Pressable
            onPress={() => navigation.navigate('CreateListing')}
            className="h-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: COLORS.primary }}>
            <Text className="text-[16px] font-semibold text-[#EDEDED]">Add a new listing</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
