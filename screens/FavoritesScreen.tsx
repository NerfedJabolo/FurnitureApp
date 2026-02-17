import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SEED_PRODUCTS } from '../data/products';
import { useFavoritesGate } from '../services/favoritesGate';
import { AppStackParamList } from '../navigation/types';
import { useCatalogGate } from '../services/catalogGate';

const COLORS = {
  bg: '#F7F7F7',
  title: '#2F2F2F',
  text: '#5B5B5B',
  price: '#3A3A3A',
  border: '#E6E6E6',
  accent: '#5A6CB9',
};

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { booting, favoriteIds, removeFavorite } = useFavoritesGate();
  const { products } = useCatalogGate();
  const sourceProducts = products.length ? products : SEED_PRODUCTS;

  const items = useMemo(() => {
    return favoriteIds
      .map((id) => sourceProducts.find((product) => product.id === id))
      .filter((product): product is (typeof sourceProducts)[number] => Boolean(product));
  }, [favoriteIds, sourceProducts]);

  if (booting) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <View className="px-6 pt-3">
        <Text className="text-center text-[32px] font-bold" style={{ color: COLORS.title }}>
          Favorites
        </Text>
      </View>

      <View className="mt-4 flex-1 px-6">
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View className="my-3 h-[1px]" style={{ backgroundColor: COLORS.border }} />
          )}
          ListEmptyComponent={
            <View className="pt-20">
              <Text className="text-center text-[16px]" style={{ color: COLORS.text }}>
                No favorites yet.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center">
              <Pressable
                onPress={() => navigation.navigate('Product', { productId: item.id })}
                className="mr-4 h-24 w-24 overflow-hidden rounded-2xl">
                <Image
                  source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('Product', { productId: item.id })}
                className="flex-1">
                <Text className="text-[16px] font-medium" style={{ color: COLORS.text }}>
                  {item.title}
                </Text>
                <Text className="mt-1 text-[20px] font-semibold" style={{ color: COLORS.price }}>
                  $ {item.price.toFixed(2)}
                </Text>
              </Pressable>

              <Pressable onPress={() => removeFavorite(item.id)} className="ml-3" hitSlop={10}>
                <Ionicons name="close-circle-outline" size={26} color={COLORS.accent} />
              </Pressable>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 110, paddingTop: 2 }}
        />
      </View>
    </SafeAreaView>
  );
}
