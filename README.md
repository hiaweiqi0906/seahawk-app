# Seahawk App

Clickable prototype of the Seahawk loyalty app, implemented from the "Warm Charcoal" design system (`Seahawk App.dc.html`). React + TypeScript + Vite SPA, client-side routed, with mock data persisted to `localStorage`.

## Run

```bash
npm install
npm run dev
```

Log in with any email/password (auth is mocked) to reach Home.

## Structure

- `src/pages/` — one component per screen: Login, Home, Warranty (list/register/book service), Products (categories/items/detail), Buy Now (dealer search), FAQ, catch flow (capture/species confirm/log/leaderboard), Rewards (overview/redemption shop/receipt submission/my rewards), and a More hub.
- `src/components/` — shared chrome (bottom nav, back header, buttons, screen shell)
- `src/data/mockData.ts` — products, dealers, FAQs, warranties, catches, leaderboard, reward tiers/catalog/coupons
- `src/state/AppState.tsx` — auth + user/warranty/catch/rewards state, persisted to `localStorage`

## Navigation

Five bottom tabs: **Home · Warranty · Rewards · Products · More**. Dealer locator and FAQ live under **More** rather than being top-level tabs; profile/settings and notifications are stubbed there as "coming soon".

## Not yet implemented

Per the design's own "not drawn yet" note: registration/OTP, profile & settings, the full More drawer, notifications inbox, Beli & Menang campaign detail, and empty/error states.
