export interface Product {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  subLabel: string;
  image: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  variants: string[];
}

export interface Category {
  slug: string;
  label: string;
  count: number;
  image: string;
  filters: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'reels',
    label: 'Reels',
    count: 58,
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/04/Seahawk-Nano-Spin-09-300x300.jpg',
    filters: ['All', 'Spinning', 'Baitcasting', 'Ultralight', 'Surf'],
  },
  {
    slug: 'rods',
    label: 'Rods',
    count: 112,
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/07/Seahawk-Solid-Strike-08C-300x300.jpg',
    filters: ['All', 'Spinning', 'Casting', 'Eging', 'Jigging'],
  },
  {
    slug: 'lines',
    label: 'Lines',
    count: 24,
    image: 'https://tce-sports.com/wp-content/uploads/2023/06/Seahawk-Bass-Hunter-X6-01-300x300.jpg',
    filters: ['All', 'Braided', 'Fluorocarbon', 'Monofilament'],
  },
  {
    slug: 'lures',
    label: 'Lures',
    count: 86,
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/07/Seahawk-Glass-Toto-LT-01-Orange-Yellow-300x300.jpg',
    filters: ['All', 'Hardbait', 'Softbait', 'Jig', 'Popper'],
  },
  {
    slug: 'terminal-tackle',
    label: 'Terminal tackle',
    count: 41,
    image: 'https://tce-sports.com/wp-content/uploads/2023/07/Seahawk-Sabiki-222-Main-2-300x300.jpg',
    filters: ['All', 'Hooks', 'Swivels', 'Sinkers'],
  },
  {
    slug: 'accessories',
    label: 'Accessories',
    count: 33,
    image: 'https://tce-sports.com/wp-content/uploads/2022/10/Seahawk-Fluoromax-FC-Main-300x300.jpg',
    filters: ['All', 'Tools', 'Storage', 'Apparel'],
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'desert-storm-103hsl',
    name: 'Desert Storm 103HSL',
    category: 'reels',
    categoryLabel: 'Reels / Baitcasting',
    subLabel: 'BAITCASTING',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/07/Seahawk-Desert-Storm-01C-300x300.jpg',
    description:
      'Low-profile baitcaster with machined aluminium frame and magnetic brake — built for heavy cover and brackish water.',
    features: [
      '10+1 stainless bearings, saltwater sealed',
      'Carbon drag washers, 7 kg max',
      '2-year warranty on registration',
    ],
    specs: [
      { label: 'Gear ratio', value: '7.1 : 1' },
      { label: 'Weight', value: '207 g' },
      { label: 'Line capacity', value: '0.28 mm / 130 m' },
    ],
    variants: ['103HSL', '103HSR'],
  },
  {
    slug: 'nano-spin-4000',
    name: 'Nano Spin 4000',
    category: 'reels',
    categoryLabel: 'Reels / Spinning',
    subLabel: 'SPINNING',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/04/Seahawk-Nano-Spin-09-300x300.jpg',
    description:
      'All-round spinning reel with a light alloy body and smooth multi-disc drag — a member favourite for shore and boat.',
    features: [
      '8+1 stainless bearings, saltwater sealed',
      'Multi-disc oiled felt drag, 8 kg max',
      '2-year warranty on registration',
    ],
    specs: [
      { label: 'Gear ratio', value: '5.2 : 1' },
      { label: 'Weight', value: '265 g' },
      { label: 'Line capacity', value: '0.30 mm / 150 m' },
    ],
    variants: ['4000', '3000'],
  },
  {
    slug: 'ionic-2',
    name: 'Ionic 2',
    category: 'reels',
    categoryLabel: 'Reels / Spinning',
    subLabel: 'SPINNING',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/04/Seahawk-Ionic-2-01-300x300.jpg',
    description: 'Compact ultralight-leaning spinning reel tuned for finesse presentations and long casts.',
    features: ['6+1 stainless bearings', 'Carbon drag washers, 5 kg max', '2-year warranty on registration'],
    specs: [
      { label: 'Gear ratio', value: '5.0 : 1' },
      { label: 'Weight', value: '198 g' },
      { label: 'Line capacity', value: '0.20 mm / 120 m' },
    ],
    variants: ['2000', '2500'],
  },
  {
    slug: 'lite-pro-rx-800',
    name: 'Lite Pro RX 800',
    category: 'reels',
    categoryLabel: 'Reels / Ultralight',
    subLabel: 'ULTRALIGHT',
    image: 'https://tce-sports.com/wp-content/uploads/2023/07/Seahawk-Noro-Ultimate-1-300x300.jpg',
    description: 'Featherweight reel for micro jigging and ultralight rods — built to keep pace with a fast retrieve.',
    features: ['4+1 stainless bearings', 'Carbon drag washers, 3 kg max', '2-year warranty on registration'],
    specs: [
      { label: 'Gear ratio', value: '5.5 : 1' },
      { label: 'Weight', value: '154 g' },
      { label: 'Line capacity', value: '0.16 mm / 100 m' },
    ],
    variants: ['800'],
  },
  {
    slug: 'ocean-rhino-or-02',
    name: 'Ocean Rhino OR-02',
    category: 'reels',
    categoryLabel: 'Reels / Overhead',
    subLabel: 'OVERHEAD',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/05/Seahawk-Ocean-Rhino-OR-02-2-Sec-300x300.jpg',
    description: 'Two-speed overhead reel for deep drop and heavy jigging — sealed for extended saltwater use.',
    features: ['6+1 stainless bearings, saltwater sealed', 'Carbon drag washers, 18 kg max', '2-year warranty on registration'],
    specs: [
      { label: 'Gear ratio', value: '6.3 : 1 / 2.6 : 1' },
      { label: 'Weight', value: '620 g' },
      { label: 'Line capacity', value: '0.50 mm / 300 m' },
    ],
    variants: ['OR-02'],
  },
  {
    slug: 'power-surf-6000',
    name: 'Power Surf 6000',
    category: 'reels',
    categoryLabel: 'Reels / Surf',
    subLabel: 'SURF',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/06/Seahawk-Power-Galah-Pro-01-300x300.jpg',
    description: 'Long-cast surf reel with a deep spool and reinforced rotor for distance and heavy drag pressure.',
    features: ['9+1 stainless bearings, saltwater sealed', 'Carbon drag washers, 12 kg max', '2-year warranty on registration'],
    specs: [
      { label: 'Gear ratio', value: '4.9 : 1' },
      { label: 'Weight', value: '512 g' },
      { label: 'Line capacity', value: '0.35 mm / 280 m' },
    ],
    variants: ['6000', '8000'],
  },
  {
    slug: 'air-storm-4',
    name: 'Air Storm 4',
    category: 'rods',
    categoryLabel: 'Rods / Spinning',
    subLabel: 'SPINNING',
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/07/Seahawk-Air-Storm-4-01-300x300.jpg',
    description: 'Four-piece travel spinning rod with a high-modulus carbon blank — packs down for the boat bag.',
    features: ['4-piece travel blank', 'Stainless guides with SiC inserts', '2-year warranty on registration'],
    specs: [
      { label: 'Length', value: "7'0\"" },
      { label: 'Line weight', value: '6–14 lb' },
      { label: 'Sections', value: '4' },
    ],
    variants: ['7\'0"', '6\'6"'],
  },
];

export function productsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categorySlug);
}

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export interface Dealer {
  id: string;
  name: string;
  distanceKm: number;
  address: string;
  phone: string;
}

export const DEALERS: Dealer[] = [
  {
    id: 'pancing-pro-georgetown',
    name: 'Pancing Pro Georgetown',
    distanceKm: 1.2,
    address: '150 Beach Street, 10300 Georgetown, Penang',
    phone: '+604-261 0022',
  },
  {
    id: 'bait-tackle-bayan-lepas',
    name: 'Bait & Tackle Bayan Lepas',
    distanceKm: 8.7,
    address: '22 Jalan Sultan Azlan Shah, 11900 Bayan Lepas',
    phone: '+604-644 5510',
  },
  {
    id: 'butterworth-angling-supplies',
    name: 'Butterworth Angling Supplies',
    distanceKm: 11.4,
    address: '5 Jalan Bagan Luar, 12000 Butterworth, Penang',
    phone: '+604-332 8871',
  },
  {
    id: 'nibong-tebal-fishing-mart',
    name: 'Nibong Tebal Fishing Mart',
    distanceKm: 24.9,
    address: '18 Jalan Besar, 14300 Nibong Tebal, Penang',
    phone: '+604-593 1147',
  },
];

export interface FaqItem {
  id: string;
  category: 'Warranty' | 'Service' | 'Points';
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'warranty-length',
    category: 'Warranty',
    question: 'How long is my warranty?',
    answer:
      'Two years from purchase for reels and rods, once the card is registered in the app. Registration must be within 30 days of purchase.',
  },
  {
    id: 'claim-without-receipt',
    category: 'Warranty',
    question: 'Can I claim without a receipt?',
    answer:
      'A receipt or proof of purchase is required to register a warranty. If you\'ve lost yours, contact support with your card number and we\'ll help verify the purchase with the dealer.',
  },
  {
    id: 'service-centres',
    category: 'Service',
    question: 'Where are the service centres?',
    answer:
      'Service centres are listed under Book a service — pick the centre closest to you when scheduling. Most reel servicing turns around within 5 working days.',
  },
  {
    id: 'earn-points',
    category: 'Points',
    question: 'How do I earn points?',
    answer:
      'You earn points for registering a warranty, logging a verified catch, and completing your profile. Points determine your loyalty tier — Silver, Gold, and Platinum.',
  },
  {
    id: 'catch-photo-public',
    category: 'Points',
    question: 'Is my catch photo public?',
    answer:
      'Catch photos are only shown on the leaderboard if you opt in when logging the catch. Otherwise they stay private to your catch log.',
  },
];

export interface Catch {
  id: string;
  species: string;
  lengthCm: number;
  weightKg: number;
  estimated: boolean;
  date: string;
  location: string;
}

export const INITIAL_CATCHES: Catch[] = [
  {
    id: 'c1',
    species: 'Barramundi',
    lengthCm: 63.0,
    weightKg: 2.84,
    estimated: true,
    date: 'Today 06:52',
    location: 'Sungai Perai',
  },
  {
    id: 'c2',
    species: 'Mangrove jack',
    lengthCm: 41.5,
    weightKg: 1.32,
    estimated: true,
    date: '21 Aug',
    location: 'Batu Kawan',
  },
  {
    id: 'c3',
    species: 'Giant trevally',
    lengthCm: 78.0,
    weightKg: 4.1,
    estimated: true,
    date: '14 Aug',
    location: 'Pulau Aman',
  },
];

export interface LeaderboardEntry {
  rank: number;
  name: string;
  location: string;
  heaviestKg: number;
  longestCm: number;
  catchCount: number;
}

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Zulkifli A.', location: 'Kuala Selangor', heaviestKg: 8.42, longestCm: 91.0, catchCount: 14 },
  { rank: 2, name: 'Wong K. L.', location: 'Klang', heaviestKg: 7.1, longestCm: 84.5, catchCount: 22 },
  { rank: 3, name: 'Ramesh P.', location: 'Butterworth', heaviestKg: 6.88, longestCm: 80.2, catchCount: 9 },
  { rank: 4, name: 'Siti N.', location: 'Kuantan', heaviestKg: 5.94, longestCm: 76.0, catchCount: 17 },
];

export const YOU_LEADERBOARD = { rank: 18, heaviestKg: 4.1, toTop10Kg: 1.58 };

export interface WarrantyRecord {
  id: string;
  productName: string;
  productType: string;
  cardNo: string;
  purchasedDate: string;
  expiresDate: string;
  status: 'ACTIVE' | 'EXPIRED';
}

export const INITIAL_WARRANTIES: WarrantyRecord[] = [
  {
    id: 'w1',
    productName: 'Nano Spin 4000',
    productType: 'Spinning reel',
    cardNo: '4471-08822',
    purchasedDate: '14 Mar 2026',
    expiresDate: '14 Mar 2028',
    status: 'ACTIVE',
  },
  {
    id: 'w2',
    productName: 'Egi Meister 2',
    productType: 'Eging rod',
    cardNo: '4471-09103',
    purchasedDate: '02 Jan 2026',
    expiresDate: '02 Jan 2028',
    status: 'ACTIVE',
  },
  {
    id: 'w3',
    productName: 'Bass Strike 662C',
    productType: 'Casting rod',
    cardNo: '4471-05519',
    purchasedDate: '20 Jul 2024',
    expiresDate: '20 Jul 2026',
    status: 'EXPIRED',
  },
];

export const SERVICE_CENTRES = ['Georgetown, Penang', 'Bayan Lepas, Penang', 'Butterworth, Penang'];

export const SPECIES_CANDIDATES = [
  { name: 'Barramundi', latin: 'Lates calcarifer · Siakap', confidence: 92 },
  { name: 'Mangrove jack', latin: '', confidence: 6 },
  { name: 'Giant trevally', latin: '', confidence: 2 },
];

export interface Tier {
  name: string;
  floor: number;
}

export const TIERS: Tier[] = [
  { name: 'Silver', floor: 0 },
  { name: 'Gold', floor: 5000 },
  { name: 'Diamond', floor: 9357 },
];

export function tierInfo(points: number) {
  let current = TIERS[0];
  let next: Tier | undefined;
  for (let i = 0; i < TIERS.length; i++) {
    if (points >= TIERS[i].floor) current = TIERS[i];
    else {
      next = TIERS[i];
      break;
    }
  }
  if (!next) return { tier: current, next: null, progress: 1, pointsToNext: 0 };
  const range = next.floor - current.floor;
  const progress = range > 0 ? (points - current.floor) / range : 1;
  return { tier: current, next, progress, pointsToNext: next.floor - points };
}

export interface RewardItem {
  slug: string;
  name: string;
  category: string;
  cost: number;
  image: string;
}

export const REWARDS_CATALOG: RewardItem[] = [
  {
    slug: 'nano-spin-4000',
    name: 'Nano Spin 4000',
    category: 'Reel',
    cost: 2500,
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/04/Seahawk-Nano-Spin-09-300x300.jpg',
  },
  {
    slug: 'ionic-2',
    name: 'Ionic 2 Spinning Reel',
    category: 'Reel',
    cost: 9000,
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/04/Seahawk-Ionic-2-01-300x300.jpg',
  },
  {
    slug: 'desert-storm-103hsl',
    name: 'Desert Storm 103HSL',
    category: 'Reel',
    cost: 4800,
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/07/Seahawk-Desert-Storm-01C-300x300.jpg',
  },
  {
    slug: 'ocean-rhino-or-02',
    name: 'Ocean Rhino OR-02',
    category: 'Reel',
    cost: 1250,
    image: 'https://seahawkfishing.com/wp-content/uploads/2026/05/Seahawk-Ocean-Rhino-OR-02-2-Sec-300x300.jpg',
  },
];

export const REWARD_CATEGORIES = ['Reel', 'Rod', 'Lures', 'Lines', 'Hooks'];

export interface Coupon {
  id: string;
  type: 'voucher' | 'free-service';
  title: string;
  subtitle: string;
  code?: string;
  expires: string;
  status: 'active' | 'used';
}

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cp1',
    type: 'voucher',
    title: 'RM 50 OFF',
    subtitle: 'Any reel above RM 300',
    code: 'SH-50-4471',
    expires: '30 Sep 2026',
    status: 'active',
  },
  {
    id: 'cp2',
    type: 'free-service',
    title: 'Reel service & lube',
    subtitle: 'Any Seahawk service centre',
    expires: '12 Dec 2026',
    status: 'active',
  },
];

export interface ActivityEntry {
  id: string;
  label: string;
  date: string;
  amount: number;
}

export const INITIAL_ACTIVITY: ActivityEntry[] = [
  { id: 'a1', label: 'Receipt · Pancing Pro', date: '28 Aug 2026', amount: 389 },
  { id: 'a2', label: 'Redeemed RM 50 voucher', date: '21 Aug 2026', amount: -1000 },
  { id: 'a3', label: 'Warranty · Nano Spin 4000', date: '14 Aug 2026', amount: 250 },
  { id: 'a4', label: 'Catch logged · Barramundi', date: '14 Aug 2026', amount: 120 },
];
