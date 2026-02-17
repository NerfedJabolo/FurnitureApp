import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_PREFIX = '@favorites_v1';

function keyForUser(userId: string) {
  return `${KEY_PREFIX}:${userId}`;
}

function safeParse(raw: string | null): string[] {
  try {
    const value = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export async function getFavoriteIds(userId: string): Promise<string[]> {
  const raw = await AsyncStorage.getItem(keyForUser(userId));
  return safeParse(raw);
}

export async function setFavoriteIds(userId: string, ids: string[]): Promise<void> {
  await AsyncStorage.setItem(keyForUser(userId), JSON.stringify(ids));
}
