import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuthGate } from './authGate';
import { getFavoriteIds, setFavoriteIds } from './favorites';

type FavoritesGateState = {
  booting: boolean;
  favoriteIds: string[];
  isFavorite: (productId: string) => boolean;
  addFavorite: (productId: string) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
};

const Ctx = createContext<FavoritesGateState | null>(null);

export function useFavoritesGate() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useFavoritesGate must be used within FavoritesGateProvider');
  return v;
}

export function FavoritesGateProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthGate();
  const [booting, setBooting] = useState(true);
  const [favoriteIds, setFavoriteIdsState] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      setBooting(true);
      try {
        if (!user?.id) {
          setFavoriteIdsState([]);
          return;
        }
        const ids = await getFavoriteIds(user.id);
        setFavoriteIdsState(ids);
      } finally {
        setBooting(false);
      }
    })();
  }, [user?.id]);

  const persist = useCallback(
    async (nextIds: string[]) => {
      if (!user?.id) return;
      setFavoriteIdsState(nextIds);
      await setFavoriteIds(user.id, nextIds);
    },
    [user?.id]
  );

  const addFavorite = useCallback(
    async (productId: string) => {
      if (favoriteIds.includes(productId)) return;
      await persist([...favoriteIds, productId]);
    },
    [favoriteIds, persist]
  );

  const removeFavorite = useCallback(
    async (productId: string) => {
      await persist(favoriteIds.filter((id) => id !== productId));
    },
    [favoriteIds, persist]
  );

  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (favoriteIds.includes(productId)) {
        await removeFavorite(productId);
        return;
      }
      await addFavorite(productId);
    },
    [favoriteIds, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (productId: string) => {
      return favoriteIds.includes(productId);
    },
    [favoriteIds]
  );

  const value = useMemo(
    () => ({
      booting,
      favoriteIds,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [booting, favoriteIds, isFavorite, addFavorite, removeFavorite, toggleFavorite]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
