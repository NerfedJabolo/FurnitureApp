import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'CreateListing'>;

const COLORS = {
  bg: '#F3F3F4',
  text: '#2F2F2F',
  muted: '#C2C2C2',
  primary: '#4F63B6',
  border: '#B9C3E2',
  tile: '#EFEFF1',
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text className="mb-2 text-[14px] font-semibold" style={{ color: COLORS.primary }}>
      {children}
    </Text>
  );
}

function Field({
  placeholder,
  right,
  tall,
}: {
  placeholder: string;
  right?: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <View
      className={`w-full rounded-2xl border px-4 ${tall ? 'h-32' : 'h-14'} flex-row items-center`}
      style={{ borderColor: COLORS.border }}>
      <Text className="text-[14px]" style={{ color: COLORS.muted }}>
        {placeholder}
      </Text>
      {right ? <View className="ml-auto">{right}</View> : null}
    </View>
  );
}

export default function CreateListingScreen({ navigation }: Props) {
  return (
    <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <View className="flex-1 px-6 pt-3">
        <View className="h-12 flex-row items-center justify-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute left-0 h-10 w-10 items-center justify-center">
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </Pressable>
          <Text className="text-[34px] font-semibold" style={{ color: COLORS.text }}>
            Create a new listing
          </Text>
        </View>

        <View className="mt-5">
          <Label>Upload photos</Label>
          <View className="flex-row">
            <View
              className="h-20 w-20 items-center justify-center rounded-xl border border-dashed"
              style={{ borderColor: '#B7B7B7' }}>
              <View className="h-8 w-8 items-center justify-center rounded-full bg-[#D9D9D9]">
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </View>
            </View>

            <View className="ml-3 h-20 w-20 overflow-hidden rounded-xl" style={{ backgroundColor: COLORS.tile }}>
              <View className="h-full w-full bg-[#E6E8ED]" />
              <View className="absolute right-0 top-0 h-5 w-5 items-center justify-center rounded-full bg-[#E5E8F2]">
                <Ionicons name="close" size={14} color={COLORS.primary} />
              </View>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Label>Title</Label>
          <Field placeholder="Listing Title" />
        </View>

        <View className="mt-5">
          <Label>Category</Label>
          <Field
            placeholder="Select the category"
            right={<Ionicons name="chevron-down" size={22} color={COLORS.primary} />}
          />
        </View>

        <View className="mt-5">
          <Label>Price</Label>
          <Field placeholder="Enter price in USD" />
        </View>

        <View className="mt-5">
          <Label>Description</Label>
          <Field placeholder="Tell us more..." tall />
        </View>

        <View className="mt-auto pb-6">
          <Pressable className="h-14 items-center justify-center rounded-xl" style={{ backgroundColor: COLORS.primary }}>
            <Text className="text-[17px] font-semibold text-[#EDEDED]">Submit</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
