import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  INITIAL_ACTIVITY,
  INITIAL_CATCHES,
  INITIAL_COUPONS,
  INITIAL_WARRANTIES,
  type ActivityEntry,
  type Catch,
  type Coupon,
  type RewardItem,
  type WarrantyRecord,
} from '../data/mockData';

const STORAGE_KEY = 'seahawk-app-state-v2';

export type Theme = 'light' | 'dark';

export interface UserProfile {
  name: string;
  email: string;
  greeting: string;
  points: number;
  memberSince: string;
}

export interface ClaimedItem {
  id: string;
  name: string;
  image: string;
  date: string;
}

const INITIAL_CLAIMED: ClaimedItem[] = [
  {
    id: 'cl1',
    name: 'Egi Meister 2',
    image: 'https://tce-sports.com/wp-content/uploads/2023/07/Seahawk-Noro-Ultimate-1-300x300.jpg',
    date: '02 Jun 2026',
  },
  {
    id: 'cl2',
    name: 'Air Storm 4',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/07/Seahawk-Air-Storm-4-01-300x300.jpg',
    date: '18 Apr 2026',
  },
  {
    id: 'cl3',
    name: 'Power Surf 6000',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/06/Seahawk-Power-Galah-Pro-01-300x300.jpg',
    date: '02 Feb 2026',
  },
  {
    id: 'cl4',
    name: 'Bass Strike 662C',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/07/Seahawk-Solid-Strike-08C-300x300.jpg',
    date: '19 Dec 2025',
  },
];

interface PersistedState {
  isAuthenticated: boolean;
  theme: Theme;
  user: UserProfile;
  warranties: WarrantyRecord[];
  catches: Catch[];
  coupons: Coupon[];
  claimed: ClaimedItem[];
  activity: ActivityEntry[];
}

function systemTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function defaultState(): PersistedState {
  return {
    isAuthenticated: false,
    theme: systemTheme(),
    user: {
      name: 'Hafiz Rahman',
      email: 'hafiz@example.com',
      greeting: 'Selamat pagi',
      points: 6888,
      memberSince: '2025',
    },
    warranties: INITIAL_WARRANTIES,
    catches: INITIAL_CATCHES,
    coupons: INITIAL_COUPONS,
    claimed: INITIAL_CLAIMED,
    activity: INITIAL_ACTIVITY,
  };
}

function loadState(): PersistedState {
  const fallback = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

interface AppStateValue {
  isAuthenticated: boolean;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  user: UserProfile;
  warranties: WarrantyRecord[];
  catches: Catch[];
  coupons: Coupon[];
  claimed: ClaimedItem[];
  activity: ActivityEntry[];
  login: () => void;
  logout: () => void;
  addWarranty: (record: Omit<WarrantyRecord, 'id' | 'status'>) => void;
  addCatch: (record: Omit<Catch, 'id'>) => void;
  addActivity: (label: string, amount: number) => void;
  redeemReward: (item: RewardItem) => boolean;
  markCouponUsed: (couponId: string) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const value = useMemo<AppStateValue>(
    () => ({
      isAuthenticated: state.isAuthenticated,
      theme: state.theme,
      toggleTheme: () => setState((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setTheme: (theme) => setState((s) => ({ ...s, theme })),
      user: state.user,
      warranties: state.warranties,
      catches: state.catches,
      coupons: state.coupons,
      claimed: state.claimed,
      activity: state.activity,
      login: () => setState((s) => ({ ...s, isAuthenticated: true })),
      logout: () => setState((s) => ({ ...s, isAuthenticated: false })),
      addWarranty: (record) =>
        setState((s) => ({
          ...s,
          warranties: [
            { ...record, id: `w${Date.now()}`, status: 'ACTIVE' },
            ...s.warranties,
          ],
          user: { ...s.user, points: s.user.points + 250 },
          activity: [
            { id: `a${Date.now()}`, label: `Warranty · ${record.productName}`, date: 'Just now', amount: 250 },
            ...s.activity,
          ],
        })),
      addCatch: (record) =>
        setState((s) => ({
          ...s,
          catches: [{ ...record, id: `c${Date.now()}` }, ...s.catches],
          user: { ...s.user, points: s.user.points + 120 },
          activity: [
            { id: `a${Date.now()}`, label: `Catch logged · ${record.species}`, date: 'Just now', amount: 120 },
            ...s.activity,
          ],
        })),
      addActivity: (label, amount) =>
        setState((s) => ({
          ...s,
          user: { ...s.user, points: s.user.points + amount },
          activity: [{ id: `a${Date.now()}`, label, date: 'Just now', amount }, ...s.activity],
        })),
      redeemReward: (item) => {
        if (state.user.points < item.cost) return false;
        setState((s) => ({
          ...s,
          user: { ...s.user, points: s.user.points - item.cost },
          claimed: [{ id: `cl${Date.now()}`, name: item.name, image: item.image, date: 'Just now' }, ...s.claimed],
          activity: [
            { id: `a${Date.now()}`, label: `Redeemed ${item.name}`, date: 'Just now', amount: -item.cost },
            ...s.activity,
          ],
        }));
        return true;
      },
      markCouponUsed: (couponId) =>
        setState((s) => ({
          ...s,
          coupons: s.coupons.map((c) => (c.id === couponId ? { ...c, status: 'used' } : c)),
        })),
    }),
    [state],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
