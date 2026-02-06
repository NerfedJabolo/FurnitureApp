import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, logout, PublicUser } from './auth';

type AuthGateState = {
  booting: boolean;
  user: PublicUser | null;
  setUser: (u: PublicUser | null) => void;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const Ctx = createContext<AuthGateState | null>(null);

export function useAuthGate() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuthGate must be used within AuthGateProvider');
  return v;
}

export function AuthGateProvider({ children }: { children: React.ReactNode }) {
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState<PublicUser | null>(null);

  async function refresh() {
    const u = await getCurrentUser();
    setUser(u);
  }

  async function signOut() {
    await logout();
    setUser(null);
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

  const value = useMemo(() => ({ booting, user, setUser, signOut, refresh }), [booting, user]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
