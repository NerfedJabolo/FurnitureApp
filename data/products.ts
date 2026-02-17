export const CATALOG_CATEGORIES = ['chair', 'table', 'armchair', 'bed', 'lamp'] as const;

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number];
export type CategoryKey = CatalogCategory | 'popular';

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string | number;
  category: CatalogCategory;
};

const COFFEE_CHAIR = require('../assets/coffee-chair.png');

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'seed-chair-1',
    title: 'Nordic Chair',
    price: 129,
    description: 'A compact wooden chair with soft curves, made for dining corners and small rooms.',
    image: COFFEE_CHAIR,
    category: 'chair',
  },
  {
    id: 'seed-chair-2',
    title: 'Modern Chair',
    price: 159,
    description: 'Simple modern chair with a clean silhouette that fits living and office spaces.',
    image: COFFEE_CHAIR,
    category: 'chair',
  },
  {
    id: 'seed-table-1',
    title: 'Oak Side Table',
    price: 199,
    description: 'Minimal side table in oak finish, designed for lamps, books, and everyday use.',
    image: COFFEE_CHAIR,
    category: 'table',
  },
  {
    id: 'seed-table-2',
    title: 'Dining Table',
    price: 449,
    description: 'Clean rectangular table with enough surface for family meals and gatherings.',
    image: COFFEE_CHAIR,
    category: 'table',
  },
  {
    id: 'seed-armchair-1',
    title: 'Soft Armchair',
    price: 289,
    description: 'Comfort-focused armchair with plush seating for reading corners and lounges.',
    image: COFFEE_CHAIR,
    category: 'armchair',
  },
  {
    id: 'seed-armchair-2',
    title: 'Accent Armchair',
    price: 319,
    description: 'A statement armchair that balances visual character and practical comfort.',
    image: COFFEE_CHAIR,
    category: 'armchair',
  },
  {
    id: 'seed-bed-1',
    title: 'Queen Bed Frame',
    price: 599,
    description: 'Low-profile bed frame with a neutral style that matches modern bedrooms.',
    image: COFFEE_CHAIR,
    category: 'bed',
  },
  {
    id: 'seed-bed-2',
    title: 'Wood Bed',
    price: 679,
    description: 'Solid wood bed with a simple headboard and durable construction.',
    image: COFFEE_CHAIR,
    category: 'bed',
  },
  {
    id: 'seed-lamp-1',
    title: 'Desk Lamp',
    price: 89,
    description: 'Directional desk lamp with focused light for late-night work and reading.',
    image: COFFEE_CHAIR,
    category: 'lamp',
  },
  {
    id: 'seed-lamp-2',
    title: 'Floor Lamp',
    price: 139,
    description: 'Slim floor lamp that adds warm ambient light to living rooms and bedrooms.',
    image: COFFEE_CHAIR,
    category: 'lamp',
  },
];
