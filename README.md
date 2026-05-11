# LumaAI — AI Architectural Lighting Planner

A professional AI-powered lighting planning platform for homeowners, builders, electricians, architects, and interior designers.

## Features

- Upload room photos or enter dimensions
- Choose from curated ambience styles (Warm Minimal, Luxury Modern, Coastal, etc.)
- AI-powered lighting analysis via Claude Vision
- Visual light placement overlay on your room photo
- Zone mapping, fixture recommendations, colour temperature guidance
- Project history and dashboard
- Export-ready recommendations

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/lumaai.git
cd lumaai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_key_here
```

Get an API key at [console.anthropic.com](https://console.anthropic.com).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

The fastest way to deploy:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add `ANTHROPIC_API_KEY` in Vercel's Environment Variables settings
4. Deploy

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/page.tsx    # User dashboard
│   ├── projects/
│   │   ├── new/page.tsx      # New project wizard
│   │   └── [id]/page.tsx     # Project results view
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   └── api/
│       └── analyse/route.ts  # Secure Anthropic API route
├── components/
│   ├── ui/                   # Reusable UI primitives
│   ├── NavBar.tsx
│   ├── LandingPage.tsx
│   ├── Dashboard.tsx
│   ├── ProjectWizard.tsx
│   ├── ResultsView.tsx
│   └── LightingOverlay.tsx
├── contexts/
│   └── AppContext.tsx         # Global state
└── lib/
    ├── types.ts               # TypeScript types
    ├── storage.ts             # localStorage helpers
    └── prompts.ts             # AI prompt builders
```

## Upgrading to Production Auth

Currently the app uses localStorage for demo purposes. To add real authentication:

1. Create a [Supabase](https://supabase.com) project
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
3. Replace the `AppContext` auth functions with Supabase Auth calls

Or use [Clerk](https://clerk.com) for a faster drop-in solution.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **AI**: Anthropic Claude (claude-sonnet-4-20250514)
- **Fonts**: Cormorant Garamond + Outfit (Google Fonts)
- **Deployment**: Vercel (recommended)

## License

MIT
