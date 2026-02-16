import React from 'react';
import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppStackParamList } from '../navigation/types';

const PRODUCT_IMAGE = require('../assets/coffee-chair.png');

type Props = NativeStackScreenProps<AppStackParamList, 'Product'>;

const COLORS = {
  bg: '#EFEFF1',
  primary: '#4F63B6',
  body: '#8D8D8D',
  text: '#2E2E2E',
  card: '#F8F8F8',
  dotMuted: '#E3E3E3',
  bookmarkBg: '#E9E9E9',
};

export default function ProductScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 760;

  const heroHeightPercent = compact ? '46%' : '50%';
  const titleSize = compact ? 34 : 40;
  const priceSize = compact ? 36 : 42;
  const descriptionLines = compact ? 5 : 7;
  const descriptionMarginTop = compact ? 20 : 32;

  const actionRowHeight = 56;
  const actionRowBottomPadding = insets.bottom + 16;
  const actionRowTopPadding = 16;
  const actionRowTotalHeight = actionRowHeight + actionRowBottomPadding + actionRowTopPadding;

  return (
    <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <View className="flex-1">
        <View style={{ height: heroHeightPercent }}>
          <Image source={PRODUCT_IMAGE} resizeMode="cover" className="h-full w-full" />

          <View className="absolute left-6 top-4">
            <Pressable
              onPress={() => navigation.goBack()}
              className="h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F3F4]">
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </Pressable>
          </View>

          <View className="absolute bottom-8 left-0 right-0 flex-row items-center justify-center">
            <View className="h-[6px] w-10 rounded-full bg-[#323232]" />
            <View
              className="ml-4 h-[6px] w-6 rounded-full"
              style={{ backgroundColor: COLORS.dotMuted }}
            />
            <View
              className="ml-4 h-[6px] w-6 rounded-full"
              style={{ backgroundColor: COLORS.dotMuted }}
            />
          </View>
        </View>

        <View
          className="-mt-4 flex-1 rounded-t-[30px] px-6 pt-10"
          style={{ backgroundColor: COLORS.card }}>
          <Text className="font-semibold" style={{ fontFamily: 'serif', color: '#404040', fontSize: titleSize }}>
            Minimal Stand
          </Text>

          <Text className="mt-2 font-semibold" style={{ color: COLORS.text, fontSize: priceSize }}>
            $ 50
          </Text>

          <Text
            className="text-[14px] leading-[22px]"
            numberOfLines={descriptionLines}
            style={{ color: COLORS.body, marginTop: descriptionMarginTop, paddingBottom: actionRowTotalHeight }}>
            Minimal Stand is made of by natural wood. The design that is very simple and minimal.
            This is truly one of the best furnitures in any family for now. With 3 different
            colors, you can easily select the best match for your home.
          </Text>

          <View
            className="absolute bottom-0 left-6 right-6 flex-row items-center"
            style={{ paddingTop: actionRowTopPadding, paddingBottom: actionRowBottomPadding }}>
            <Pressable
              className="h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: COLORS.bookmarkBg }}>
              <Ionicons name="bookmark" size={24} color={COLORS.primary} />
            </Pressable>

            <Pressable
              className="ml-4 h-14 flex-1 items-center justify-center rounded-2xl"
              style={{ backgroundColor: COLORS.primary }}>
              <Text className="text-[16px] font-semibold text-[#EFEFEF]">Contact Seller</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
