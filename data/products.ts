const COFFEE_CHAIR = require('../assets/coffee-chair.png');

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: any;
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Black Simple Lamp',
    price: 12,
    description:
      'Black Simple Lamp adds a clean, modern accent to your room with focused light for reading and relaxing.',
    image: COFFEE_CHAIR,
  },
  {
    id: '2',
    title: 'Minimal Stand',
    price: 25,
    description:
      'Minimal Stand is made of natural wood with a simple design. It offers a practical surface while keeping your space light and organized.',
    image: COFFEE_CHAIR,
  },
  {
    id: '3',
    title: 'Coffee Chair',
    price: 20,
    description:
      'Coffee Chair combines comfort and simplicity. Its compact form makes it easy to place in living rooms, bedrooms, or reading corners.',
    image: COFFEE_CHAIR,
  },
  {
    id: '4',
    title: 'Simple Desk',
    price: 50,
    description:
      'Simple Desk provides a minimal workspace for daily tasks. The clean silhouette fits both home offices and smaller apartments.',
    image: COFFEE_CHAIR,
  },
];
