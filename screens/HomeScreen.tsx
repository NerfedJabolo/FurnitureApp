import React, { useMemo, useState } from 'react';
import { View, Text, Image, Pressable, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  imageUri: string;
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
    imageUri:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Minimal Stand',
    price: 25,
    imageUri:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Coffee Chair',
    price: 20,
    imageUri:
      'https://images.unsplash.com/photo-1519710887728-7d66f7a21f85?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Simple Desk',
    price: 50,
    imageUri:
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80',
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
        <Image source={{ uri: item.imageUri }} className="h-56 w-full" resizeMode="cover" />
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

function BottomTabBar({
  active,
  onTab,
}: {
  active: 'home' | 'bookmark' | 'profile';
  onTab?: (t: 'home' | 'bookmark' | 'profile') => void;
}) {
  const iconColor = (t: typeof active) => (t === active ? COLORS.primary : '#9B9B9B');

  return (
    <View className="px-10 pb-6 pt-4">
      <View className="flex-row items-center justify-between">
        <Pressable onPress={() => onTab?.('home')} hitSlop={12}>
          <Ionicons name="home-outline" size={34} color={iconColor('home')} />
        </Pressable>

        <Pressable onPress={() => onTab?.('bookmark')} hitSlop={12}>
          <Ionicons name="bookmark-outline" size={30} color={iconColor('bookmark')} />
        </Pressable>

        <Pressable onPress={() => onTab?.('profile')} hitSlop={12}>
          <Ionicons name="person-outline" size={30} color={iconColor('profile')} />
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen({
  onSearch,
  onProduct,
  onTab,
}: {
  onSearch?: () => void;
  onProduct?: (id: string) => void;
  onTab?: (t: 'home' | 'bookmark' | 'profile') => void;
}) {
  const [activeCat, setActiveCat] = useState('popular');
  const [activeTab] = useState<'home' | 'bookmark' | 'profile'>('home');

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

      {/* Bottom tabs */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <BottomTabBar active={activeTab} onTab={onTab} />
      </View>
    </SafeAreaView>
  );
}
