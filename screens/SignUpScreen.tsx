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

export default function SignUpScreen({
  onBack,
  onSignUp,
  onGoogle,
  onGoSignIn,
  onTerms,
}: {
  onBack?: () => void;
  onSignUp?: (data: { name: string; email: string; password: string; agreed: boolean }) => void;
  onGoogle?: () => void;
  onGoSignIn?: () => void;
  onTerms?: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwHidden, setPwHidden] = useState(true);
  const [agreed, setAgreed] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">
        <AuthHeader title="Sign Up" onBack={onBack} />

        <View className="mt-10 space-y-6">
          <AuthField
            label="Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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
                  name={pwHidden ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color={AUTH_COLORS.border}
                />
              </Pressable>
            }
          />
        </View>

        <Pressable
          onPress={() => setAgreed((v) => !v)}
          className="mt-6 flex-row items-center"
          hitSlop={8}>
          <View
            className="h-5 w-5 items-center justify-center rounded-md"
            style={{
              backgroundColor: agreed ? AUTH_COLORS.primary : 'transparent',
              borderColor: AUTH_COLORS.border,
              borderWidth: agreed ? 0 : 1,
            }}>
            {agreed ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
          </View>

          <Text style={{ color: AUTH_COLORS.primary }} className="ml-3 text-[14px]">
            I agree with{' '}
            <Text onPress={onTerms} className="font-semibold">
              Terms &amp; Privacy
            </Text>
          </Text>
        </Pressable>

        <View className="mt-6">
          <AuthPrimaryButton
            title="Sign Up"
            onPress={() => onSignUp?.({ name, email, password, agreed })}
          />
        </View>

        <View className="mt-10">
          <AuthDivider text="Or sign up with" />
        </View>

        <View className="mt-8">
          <GoogleButton onPress={onGoogle} />
        </View>

        <View className="mt-10 items-center">
          <Text style={{ color: AUTH_COLORS.primary }} className="text-[14px]">
            Already have an account?{' '}
            <Text onPress={onGoSignIn} className="font-semibold underline">
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
