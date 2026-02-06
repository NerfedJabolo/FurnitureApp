import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useAuthGate } from '../services/authGate';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, signOut } = useAuthGate();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-xl font-extrabold">{user?.name ?? 'Profile'}</Text>
        <Text className="mt-2 text-base text-gray-500">{user?.email ?? ''}</Text>

        <Pressable
          onPress={signOut}
          className="mt-8 h-12 w-full items-center justify-center rounded-2xl bg-[#4F63B6]">
          <Text className="font-semibold text-white">Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
