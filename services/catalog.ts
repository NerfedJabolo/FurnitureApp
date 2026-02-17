import AsyncStorage from '@react-native-async-storage/async-storage';
import { CatalogCategory, CATALOG_CATEGORIES, Product, SEED_PRODUCTS } from '../data/products';

const KEY = '@catalog_v1';
const TTL_MS = 1000 * 60 * 60 * 12;
const PER_CATEGORY = 12;

const CATEGORY_QUERY: Record<CatalogCategory, string> = {
  chair: 'modern chair furniture interior',
  table: 'modern table furniture interior',
  armchair: 'cozy armchair furniture interior',
  bed: 'modern bed bedroom interior',
  lamp: 'minimal lamp interior lighting',
};

const CATEGORY_DESCRIPTION: Record<CatalogCategory, string> = {
  chair: 'A practical chair with clean lines designed for everyday comfort and modern interiors.',
  table: 'A versatile table crafted for daily use, balancing utility with a minimal furniture style.',
  armchair: 'A comfortable armchair with a soft profile, ideal for reading corners and relaxed spaces.',
  bed: 'A simple bed design focused on comfort, calm styling, and an easy bedroom fit.',
  lamp: 'A minimal lamp that adds warm lighting and a modern accent to home interiors.',
};

type CachedCatalog = {
  fetchedAt: number;
  products: Product[];
};

type PexelsPhoto = {
  id: number;
  alt: string;
  src: {
    medium: string;
    large: string;
    large2x: string;
  };
};

type PexelsSearchResponse = {
  photos: PexelsPhoto[];
};

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function toTitle(category: CatalogCategory, alt: string, index: number) {
  const trimmed = alt.trim();
  if (!trimmed) return `${category[0].toUpperCase()}${category.slice(1)} ${index + 1}`;
  return trimmed
    .split(' ')
    .slice(0, 4)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toPrice(photoId: number, category: CatalogCategory): number {
  const ranges: Record<CatalogCategory, [number, number]> = {
    chair: [90, 260],
    table: [150, 520],
    armchair: [190, 480],
    bed: [320, 980],
    lamp: [40, 190],
  };

  const [min, max] = ranges[category];
  const spread = max - min;
  const value = min + (photoId % (spread + 1));
  return Math.round(value);
}

function normalizeProducts(products: Product[]): Product[] {
  const seen = new Set<string>();
  const normalized: Product[] = [];

  for (const item of products) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    normalized.push(item);
  }

  return normalized;
}

async function readCache(): Promise<CachedCatalog | null> {
  const raw = await AsyncStorage.getItem(KEY);
  const parsed = safeParse<CachedCatalog | null>(raw, null);
  if (!parsed?.products?.length) return null;
  return parsed;
}

async function writeCache(products: Product[]) {
  const payload: CachedCatalog = {
    fetchedAt: Date.now(),
    products: normalizeProducts(products),
  };
  await AsyncStorage.setItem(KEY, JSON.stringify(payload));
}

async function fetchCategory(category: CatalogCategory): Promise<Product[]> {
  const apiKey = process.env.EXPO_PUBLIC_PEXELS_API_KEY ?? process.env.PEXELS_API_KEY ?? '';

  const params = new URLSearchParams({
    query: CATEGORY_QUERY[category],
    per_page: String(PER_CATEGORY),
    orientation: 'portrait',
  });

  const res = await fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
    headers: { Authorization: apiKey },
  });

  if (!res.ok) {
    throw new Error(`Pexels request failed: ${res.status}`);
  }

  const json = (await res.json()) as PexelsSearchResponse;
  const photos = Array.isArray(json.photos) ? json.photos : [];

  return photos.map((photo, index) => ({
    id: `px-${category}-${photo.id}`,
    title: toTitle(category, photo.alt, index),
    price: toPrice(photo.id, category),
    description: CATEGORY_DESCRIPTION[category],
    image: photo.src.large2x || photo.src.large || photo.src.medium,
    category,
  }));
}

async function fetchFromPexels(): Promise<Product[]> {
  const apiKey = process.env.EXPO_PUBLIC_PEXELS_API_KEY ?? process.env.PEXELS_API_KEY ?? '';

  if (!apiKey) {
    throw new Error(
      'Missing Pexels API key. Set EXPO_PUBLIC_PEXELS_API_KEY in .env for Expo client access.'
    );
  }

  const chunks = await Promise.all(CATALOG_CATEGORIES.map((category) => fetchCategory(category)));
  return normalizeProducts(chunks.flat());
}

export async function getCatalog(params?: { forceRefresh?: boolean }): Promise<Product[]> {
  const forceRefresh = Boolean(params?.forceRefresh);
  const cached = await readCache();
  const freshCache = cached && Date.now() - cached.fetchedAt < TTL_MS;

  if (!forceRefresh && freshCache) {
    return cached.products;
  }

  try {
    const products = await fetchFromPexels();
    if (products.length) {
      await writeCache(products);
      return products;
    }
  } catch {
    if (cached?.products?.length) return cached.products;
  }

  return SEED_PRODUCTS;
}
