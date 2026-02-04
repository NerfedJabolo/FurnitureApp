import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#4F63B6',
  label: '#4F63B6',
  text: '#2F2F2F',
  border: '#B7BFE3',
  placeholder: '#B7B7B7',
  googleBtn: '#3E495A',
  divider: '#D9DCEB',
};

function Field({
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
      <Text style={{ color: COLORS.label }} className="mb-2 text-[14px] font-medium">
        {label}
      </Text>

      <View
        style={{ borderColor: COLORS.border }}
        className="h-14 w-full flex-row items-center rounded-2xl border px-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className="flex-1 text-[14px]"
          style={{ color: COLORS.text, paddingVertical: Platform.OS === 'android' ? 10 : 12 }}
        />
        {right ? <View className="pl-3">{right}</View> : null}
      </View>
    </View>
  );
}

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
  const [agreed, setAgreed] = useState(true); // screenshot shows checked

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">
        {/* Header */}
        <View className="flex-row items-center">
          <Pressable
            onPress={onBack}
            hitSlop={12}
            className="mr-2 h-10 w-10 items-center justify-center">
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </Pressable>

          <Text style={{ color: COLORS.primary }} className="text-[26px] font-extrabold">
            Sign Up
          </Text>
        </View>

        {/* Form */}
        <View className="mt-10 space-y-6">
          <Field
            label="Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Field
            label="E-mail"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Field
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
                  color={COLORS.border}
                />
              </Pressable>
            }
          />
        </View>

        {/* Checkbox row */}
        <Pressable
          onPress={() => setAgreed((v) => !v)}
          className="mt-6 flex-row items-center"
          hitSlop={8}>
          <View
            className="h-5 w-5 items-center justify-center rounded-md"
            style={{
              backgroundColor: agreed ? COLORS.primary : 'transparent',
              borderColor: COLORS.border,
              borderWidth: agreed ? 0 : 1,
            }}>
            {agreed ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
          </View>

          <Text style={{ color: COLORS.primary }} className="ml-3 text-[14px]">
            I agree with{' '}
            <Text onPress={onTerms} className="font-semibold">
              Terms &amp; Privacy
            </Text>
          </Text>
        </Pressable>

        {/* Primary button */}
        <Pressable
          onPress={() => onSignUp?.({ name, email, password, agreed })}
          className="mt-6 h-14 w-full items-center justify-center rounded-2xl"
          style={{ backgroundColor: COLORS.primary }}>
          <Text className="text-[16px] font-semibold text-white">Sign Up</Text>
        </Pressable>

        {/* Divider */}
        <View className="mt-10 flex-row items-center">
          <View style={{ backgroundColor: COLORS.divider }} className="h-[1px] flex-1" />
          <Text style={{ color: COLORS.primary }} className="mx-4 text-[14px] font-medium">
            Or sign up with
          </Text>
          <View style={{ backgroundColor: COLORS.divider }} className="h-[1px] flex-1" />
        </View>

        {/* Google button */}
        <Pressable
          onPress={onGoogle}
          className="mx-auto mt-8 h-14 w-36 items-center justify-center rounded-2xl"
          style={{ backgroundColor: COLORS.googleBtn }}>
          <Ionicons name="logo-google" size={28} color="#FFFFFF" />
        </Pressable>

        {/* Bottom link */}
        <View className="mt-10 items-center">
          <Text style={{ color: COLORS.primary }} className="text-[14px]">
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
