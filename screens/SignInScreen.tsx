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

import { login, PublicUser } from '../services/auth';

export default function SignInScreen({
  onBack,
  onSignedIn,
  onGoSignUp,
}: {
  onBack?: () => void;
  onSignedIn?: (user: PublicUser) => void;
  onGoSignUp?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwHidden, setPwHidden] = useState(true);
  const [err, setErr] = useState<string>('');
  const [busy, setBusy] = useState(false);

  async function handleSignIn() {
    try {
      setErr('');
      setBusy(true);
      const user = await login({ email, password });
      onSignedIn?.(user);
    } catch (e: any) {
      setErr(e?.message || 'Failed to sign in');
    } finally {
      setBusy(false);
    }
  }

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

          {err ? (
            <Text className="text-[13px] font-medium" style={{ color: '#D13B3B' }}>
              {err}
            </Text>
          ) : null}
        </View>

        <View className="mt-10">
          <AuthPrimaryButton title={busy ? 'Signing In...' : 'Sign In'} onPress={handleSignIn} />
        </View>

        <View className="mt-10">
          <AuthDivider text="Or sign in with" />
        </View>

        <View className="mt-8 opacity-50">
          <GoogleButton onPress={() => {}} />
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
