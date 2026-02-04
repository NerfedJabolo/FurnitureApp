import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthHeader from '../components/auth/AuthHeader';
import AuthField from '../components/auth/AuthField';
import AuthPrimaryButton from '../components/auth/AuthPrimaryButton';
import AuthDivider from '../components/auth/AuthDivider';
import GoogleButton from '../components/auth/GoogleButton';
import { AUTH_COLORS } from '../components/auth/colors';

export default function SignInScreen({
  onBack,
  onSignIn,
  onGoogle,
  onGoSignUp,
}: {
  onBack?: () => void;
  onSignIn?: (data: { email: string; password: string }) => void;
  onGoogle?: () => void;
  onGoSignUp?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwHidden, setPwHidden] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">
        <AuthHeader title="Sign In" onBack={onBack} />

        <View className="mt-10 space-y-6">
          <AuthField
            label="E-mail"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <AuthField
            label="Password"
            placeholder="**********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={pwHidden}
            right={
              <Pressable onPress={() => setPwHidden((v) => !v)} hitSlop={10}>
                <Ionicons
                  name={pwHidden ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color={AUTH_COLORS.border}
                />
              </Pressable>
            }
          />
        </View>

        <View className="mt-10">
          <AuthPrimaryButton title="Sign In" onPress={() => onSignIn?.({ email, password })} />
        </View>

        <View className="mt-10">
          <AuthDivider text="Or sign in with" />
        </View>

        <View className="mt-8">
          <GoogleButton onPress={onGoogle} />
        </View>

        <View className="mt-10 items-center">
          <Text style={{ color: AUTH_COLORS.primary }} className="text-[14px]">
            Don’t have an account?{' '}
            <Text onPress={onGoSignUp} className="font-semibold underline">
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
