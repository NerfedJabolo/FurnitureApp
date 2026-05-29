import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Image, Pressable, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryKey, Product } from '../data/products';
import { useCatalogGate } from '../services/catalogGate';

const COLORS = {
  primary: '#4F63B6',
  text: '#2F2F2F',
  muted: '#8B8B8B',
  pillBg: '#F2F3F7',
  pillActiveBg: '#2E2E2E',
  cardBg: '#FFFFFF',
};

type Category = {
  key: CategoryKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const CATEGORIES: Category[] = [
  { key: 'popular', label: 'Popular', icon: 'star' },
  { key: 'chair', label: 'Chair', icon: 'cafe-outline' },
  { key: 'table', label: 'Table', icon: 'tablet-landscape-outline' },
  { key: 'armchair', label: 'Armchair', icon: 'person-outline' },
  { key: 'bed', label: 'Bed', icon: 'bed-outline' },
  { key: 'lamp', label: 'Lamp', icon: 'bulb-outline' },
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
  const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

  return (
    <Pressable onPress={onPress} style={{ width: cardWidth }} className="mb-10">
      <View className="overflow-hidden rounded-3xl" style={{ backgroundColor: COLORS.cardBg }}>
        <Image source={imageSource} className="h-56 w-full" resizeMode="cover" />
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
  const { booting, products } = useCatalogGate();
  const [activeCat, setActiveCat] = useState<CategoryKey>('popular');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const data = useMemo(() => {
    let filtered = activeCat === 'popular' ? products : products.filter((item) => item.category === activeCat);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = products.filter((item) => item.title.toLowerCase().includes(q));
    }
    return filtered;
  }, [activeCat, products, searchQuery]);

  const screenW = Dimensions.get('window').width;
  const gap = 18;
  const sidePad = 24;
  const cardWidth = Math.floor((screenW - sidePad * 2 - gap) / 2);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top */}
      <View className="px-6 pt-4">
        {showSearch ? (
          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center rounded-xl bg-gray-100 px-4">
              <Ionicons name="search-outline" size={20} color={COLORS.muted} />
              <TextInput
                className="ml-2 flex-1 py-3 text-[18px]"
                style={{ color: COLORS.text }}
                placeholder="Search furniture..."
                placeholderTextColor={COLORS.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
                  <Ionicons name="close-circle" size={20} color={COLORS.muted} />
                </Pressable>
              )}
            </View>
            <Pressable
              onPress={() => {
                setShowSearch(false);
                setSearchQuery('');
              }}
              hitSlop={12}
              className="ml-3">
              <Text className="text-[18px] font-medium" style={{ color: COLORS.primary }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => setShowSearch(true)} hitSlop={12} className="h-12 w-12 justify-center">
            <Ionicons name="search-outline" size={34} color={COLORS.primary} />
          </Pressable>
        )}
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
        {booting ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
          </View>
        ) : null}
        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="pt-12">
              <Text className="text-center text-[16px]" style={{ color: COLORS.muted }}>
                No items available for this category.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard item={item} cardWidth={cardWidth} onPress={() => onProduct?.(item.id)} />
          )}
          contentContainerStyle={{ paddingBottom: 110 }}
        />
      </View>
    </SafeAreaView>
  );
}
