import React from 'react';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function SplashScreen({
  onSignUp,
  onSignIn,
}: {
  onSignUp?: () => void;
  onSignIn?: () => void;
}) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        {/* Illustration */}
        <Image
          source={require('../assets/splash-illustration.png')}
          resizeMode="contain"
          style={{
            width: Math.min(width * 0.78, 320),
            height: Math.min(width * 0.78, 320),
          }}
        />

        {/* Title */}
        <View className="mt-8 items-center">
          <Text className="text-[34px] font-extrabold text-[#2F2F2F]">You&apos;ll Find</Text>

          {/* Underlined orange line */}
          <View className="mt-2 border-b-2 border-[#F2A14B] pb-1">
            <Text className="text-[34px] font-extrabold text-[#F2A14B]">All you need</Text>
          </View>

          <Text className="mt-2 text-[34px] font-extrabold text-[#2F2F2F]">Here!</Text>
        </View>

        {/* Button + link */}
        <View className="mt-10 w-full">
          <Pressable
            onPress={onSignUp}
            className="h-14 w-full items-center justify-center rounded-2xl bg-[#4F63B6]">
            <Text className="text-[16px] font-semibold text-white">Sign Up</Text>
          </Pressable>

          <Pressable onPress={onSignIn} className="mt-6 items-center">
            <Text className="text-[14px] font-semibold text-[#4F63B6]">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
