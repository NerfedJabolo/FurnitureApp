import React, { useMemo, useState } from 'react';
import { View, Text, Image, Pressable, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const COFFEE_CHAIR = require('../assets/coffee-chair.png');

const COLORS = {
  primary: '#4F63B6',
  text: '#2F2F2F',
  muted: '#8B8B8B',
  pillBg: '#F2F3F7',
  pillActiveBg: '#2E2E2E',
  cardBg: '#FFFFFF',
};

type Category = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type Product = {
  id: string;
  title: string;
  price: number;
  image: any;
};

const CATEGORIES: Category[] = [
  { key: 'popular', label: 'Popular', icon: 'star' },
  { key: 'chair', label: 'Chair', icon: 'cafe-outline' },
  { key: 'table', label: 'Table', icon: 'tablet-landscape-outline' },
  { key: 'armchair', label: 'Armchair', icon: 'person-outline' },
  { key: 'bed', label: 'Bed', icon: 'bed-outline' },
  { key: 'lamp', label: 'Lamp', icon: 'bulb-outline' },
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Black Simple Lamp',
    price: 12,
    image: COFFEE_CHAIR,
  },
  {
    id: '2',
    title: 'Minimal Stand',
    price: 25,
    image: COFFEE_CHAIR,
  },
  {
    id: '3',
    title: 'Coffee Chair',
    price: 20,
    image: COFFEE_CHAIR,
  },
  {
    id: '4',
    title: 'Simple Desk',
    price: 50,
    image: COFFEE_CHAIR,
  },
];

function CategoryPill({
  item,
  active,
  onPress,
}: {
  item: Category;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="mr-6 items-center">
      <View
        className="h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: active ? COLORS.pillActiveBg : COLORS.pillBg,
        }}>
        <Ionicons
          name={active ? (item.icon as any) : (item.icon as any)}
          size={24}
          color={active ? '#FFFFFF' : '#A0A0A0'}
        />
      </View>
      <Text
        className="mt-3 text-[18px] font-semibold"
        style={{ color: active ? COLORS.primary : COLORS.muted }}>
        {item.label}
      </Text>
    </Pressable>
  );
}

function ProductCard({
  item,
  cardWidth,
  onPress,
}: {
  item: Product;
  cardWidth: number;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={{ width: cardWidth }} className="mb-10">
      <View className="overflow-hidden rounded-3xl" style={{ backgroundColor: COLORS.cardBg }}>
        <Image source={item.image} className="h-56 w-full" resizeMode="cover" />
      </View>

      <Text className="mt-4 text-[20px] font-medium" style={{ color: COLORS.muted }}>
        {item.title}
      </Text>

      <Text className="mt-2 text-[22px] font-extrabold" style={{ color: COLORS.text }}>
        $ {item.price.toFixed(2)}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen({
  onSearch,
  onProduct,
}: {
  onSearch?: () => void;
  onProduct?: (id: string) => void;
  onTab?: (t: 'home' | 'bookmark' | 'profile') => void;
}) {
  const [activeCat, setActiveCat] = useState('popular');

  const data = useMemo(() => {
    return PRODUCTS;
  }, []);

  const screenW = Dimensions.get('window').width;
  const gap = 18;
  const sidePad = 24;
  const cardWidth = Math.floor((screenW - sidePad * 2 - gap) / 2);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top */}
      <View className="px-6 pt-4">
        <Pressable onPress={onSearch} hitSlop={12} className="h-12 w-12 justify-center">
          <Ionicons name="search-outline" size={34} color={COLORS.primary} />
        </Pressable>
      </View>

      {/* Categories */}
      <View className="mt-6">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          data={CATEGORIES}
          keyExtractor={(i) => i.key}
          renderItem={({ item }) => (
            <CategoryPill
              item={item}
              active={item.key === activeCat}
              onPress={() => setActiveCat(item.key)}
            />
          )}
        />
      </View>

      {/* Product grid */}
      <View className="flex-1 px-6 pt-10">
        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard item={item} cardWidth={cardWidth} onPress={() => onProduct?.(item.id)} />
          )}
          contentContainerStyle={{ paddingBottom: 110 }}
        />
      </View>
    </SafeAreaView>
  );
}
