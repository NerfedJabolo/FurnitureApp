import React from 'react';
import { View, Text, Image, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppStackParamList } from '../navigation/types';
import { SEED_PRODUCTS } from '../data/products';
import { useFavoritesGate } from '../services/favoritesGate';
import { useCatalogGate } from '../services/catalogGate';

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

export default function ProductScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 760;
  const { isFavorite, toggleFavorite } = useFavoritesGate();
  const { products } = useCatalogGate();
  const sourceProducts = products.length ? products : SEED_PRODUCTS;
  const product =
    sourceProducts.find((item) => item.id === route.params?.productId) ?? sourceProducts[0];
  const productIsFavorite = isFavorite(product.id);
  const imageSource = typeof product.image === 'string' ? { uri: product.image } : product.image;

  const heroHeightPercent = compact ? '46%' : '50%';
  const titleSize = compact ? 28 : 32;
  const priceSize = compact ? 30 : 34;
  const descriptionLines = compact ? 5 : 7;
  const descriptionMarginTop = compact ? 10 : 14;

  const actionRowBottomPadding = insets.bottom + 16;
  const actionRowTopPadding = 16;

  return (
    <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <View className="flex-1">
        <View style={{ height: heroHeightPercent }}>
          <Image source={imageSource} resizeMode="cover" className="h-full w-full" />

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
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12 }}>
            <Text
              className="font-semibold"
              style={{ fontFamily: 'serif', color: '#404040', fontSize: titleSize }}>
              {product.title}
            </Text>

            <Text
              className="mt-1 font-semibold"
              style={{ color: COLORS.text, fontSize: priceSize }}>
              $ {product.price}
            </Text>

            <Text
              className="text-[14px] leading-[22px]"
              numberOfLines={descriptionLines}
              style={{ color: COLORS.body, marginTop: descriptionMarginTop }}>
              {product.description}
            </Text>
          </ScrollView>

          <View
            className="flex-row items-center"
            style={{ paddingTop: actionRowTopPadding, paddingBottom: actionRowBottomPadding }}>
            <Pressable
              onPress={() => toggleFavorite(product.id)}
              className="h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: COLORS.bookmarkBg }}>
              <Ionicons
                name={productIsFavorite ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={COLORS.primary}
              />
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
