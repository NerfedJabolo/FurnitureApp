import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product, SEED_PRODUCTS } from '../data/products';
import { getCatalog } from './catalog';

type CatalogGateState = {
  booting: boolean;
  products: Product[];
  refresh: () => Promise<void>;
};

const Ctx = createContext<CatalogGateState | null>(null);

export function useCatalogGate() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCatalogGate must be used within CatalogGateProvider');
  return v;
}

export function CatalogGateProvider({ children }: { children: React.ReactNode }) {
  const [booting, setBooting] = useState(true);
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);

  async function refresh() {
    const next = await getCatalog();
    setProducts(next.length ? next : SEED_PRODUCTS);
  }

  useEffect(() => {
    (async () => {
      try {
        await refresh();
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  const value = useMemo(
    () => ({
      booting,
      products,
      refresh,
    }),
    [booting, products]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
