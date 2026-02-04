import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USERS: '@auth_users_v1',
  SESSION: '@auth_session_v1',
};

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
};

export type Session = {
  userId: string;
  createdAt: number;
};

export type PublicUser = Omit<StoredUser, 'password'>;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function getUsers(): Promise<StoredUser[]> {
  const raw = await AsyncStorage.getItem(KEYS.USERS);
  return safeParse(raw, []);
}

async function setUsers(users: StoredUser[]) {
  await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

async function setSession(session: Session | null) {
  if (!session) {
    await AsyncStorage.removeItem(KEYS.SESSION);
    return;
  }
  await AsyncStorage.setItem(KEYS.SESSION, JSON.stringify(session));
}

export async function register(params: {
  name: string;
  email: string;
  password: string;
}): Promise<PublicUser> {
  const name = params.name.trim();
  const email = normalizeEmail(params.email);
  const password = params.password;

  if (!name) throw new Error('Name is required');
  if (!email) throw new Error('E-mail is required');
  if (!password) throw new Error('Password is required');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');

  const users = await getUsers();
  const exists = users.some((u) => u.email === email);
  if (exists) throw new Error('An account with this e-mail already exists');

  const user: StoredUser = {
    id: uid(),
    name,
    email,
    password,
    createdAt: Date.now(),
  };

  users.push(user);
  await setUsers(users);

  await setSession({ userId: user.id, createdAt: Date.now() });

  // return public
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...publicUser } = user;
  return publicUser;
}

export async function login(params: { email: string; password: string }): Promise<PublicUser> {
  const email = normalizeEmail(params.email);
  const password = params.password;

  if (!email) throw new Error('E-mail is required');
  if (!password) throw new Error('Password is required');

  const users = await getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) throw new Error('No account found with this e-mail');
  if (user.password !== password) throw new Error('Incorrect password');

  await setSession({ userId: user.id, createdAt: Date.now() });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...publicUser } = user;
  return publicUser;
}

export async function logout(): Promise<void> {
  await setSession(null);
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const rawSession = await AsyncStorage.getItem(KEYS.SESSION);
  const session = safeParse<Session | null>(rawSession, null);
  if (!session?.userId) return null;

  const users = await getUsers();
  const user = users.find((u) => u.id === session.userId);
  if (!user) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...publicUser } = user;
  return publicUser;
}

// Optional helper for debugging during dev
export async function resetAuthStorage() {
  await AsyncStorage.multiRemove([KEYS.USERS, KEYS.SESSION]);
}
