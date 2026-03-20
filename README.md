# SOLARIS CET

[![Deploy to GitHub Pages](https://github.com/aamclaudiu-hash/solaris-cet/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/aamclaudiu-hash/solaris-cet/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> **Hyper-scarce token (9,000 CET) powering rural agricultural innovation in Puiești — built on a Zero-Cost Edge-Web3 architecture with React 19, ONNX AI, TON Multi-Sig, and GitHub Actions.**

---

## 🌾 Project Vision

**SOLARIS CET** is more than a token — it is the financial and computational backbone of a precision-farming platform serving **Puiești**, a rural agricultural community in Romania.

The CET token is fixed at a maximum supply of **9,000 units**, making it one of the most hyper-scarce assets on the TON blockchain. This extreme scarcity is intentional: it aligns long-term incentives between landowners, agronomists, and technology contributors who collectively govern the protocol.

The platform delivers **ONNX-powered edge AI** inference (yield prediction, soil analytics, crop optimization) directly in the user's browser — with no cloud GPU servers, no subscription fees, and no single point of failure. All computation runs locally via Web Workers; all on-chain data is served from a GitHub Pages CDN snapshot updated by GitHub Actions.

This architecture proves that **rural communities do not need centralized infrastructure** to access world-class agricultural intelligence and decentralized finance.

---

## ⚙️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | [React](https://react.dev/) | 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) | 5 |
| Bundler / Dev Server | [Vite](https://vite.dev/) | 7 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | 3 |
| Animations | [GSAP](https://gsap.com/) | 3 |
| Edge AI Runtime | [ONNX Runtime Web](https://onnxruntime.ai/docs/get-started/with-javascript/web.html) | 1.24 |
| Smart Contracts | [Tact](https://tact-lang.org/) (TON) | — |
| Blockchain | [TON Network](https://ton.org/) | — |
| Wallet Integration | [TON Connect 2](https://docs.ton.org/develop/dapps/ton-connect/overview) | — |
| PWA / Service Worker | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) | — |
| Compression | [vite-plugin-compression2](https://github.com/nonzzz/vite-plugin-compression) (Brotli) | — |
| Hosting | [GitHub Pages](https://pages.github.com/) | — |
| CI/CD | [GitHub Actions](https://github.com/features/actions) | — |

---

## 🚀 Quick Start — Local Development

**All commands must be run from the `app/` subdirectory.**

### Prerequisites

- **Node.js** ≥ 20 ([download](https://nodejs.org/))
- **npm** ≥ 10 (bundled with Node.js)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/aamclaudiu-hash/solaris-cet.git
cd solaris-cet/app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# → http://localhost:5173
```

### Available Commands

```bash
# Development server with hot module replacement
npm run dev

# Production build → app/dist/
npm run build

# Preview the production build locally
npm run preview

# Lint with ESLint
npm run lint

# TypeScript type-check (no output)
npx tsc --noEmit
```

### One-Click Deploy (Fork & Host Your Own Instance)

1. **Fork** this repository: [https://github.com/aamclaudiu-hash/solaris-cet/fork](https://github.com/aamclaudiu-hash/solaris-cet/fork)
2. In your fork, go to **Settings → Pages → Source** and select **GitHub Actions**.
3. Push any commit to `main` — the site deploys automatically in ≈ 2 minutes.
4. Access your instance at `https://<your-username>.github.io/solaris-cet/`

---

## 🏗️ Project Structure

```text
solaris-cet/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Quality gate: lint, typecheck, unit tests, E2E
│   │   ├── deploy-pages.yml    # Build + deploy to GitHub Pages on every push to main
│   │   ├── codeql.yml          # CodeQL SAST security scanning
│   │   ├── lighthouse-ci.yml   # Lighthouse performance audit (≥ 85 required)
│   │   ├── multisig-ci.yml     # TON multi-sig contract build & test
│   │   └── ton-indexer.yml     # TON blockchain state indexing
│   ├── ISSUE_TEMPLATE/         # Bug report and feature request forms
│   └── PULL_REQUEST_TEMPLATE.md
├── api/                        # Edge API routes (Vercel)
│   └── chat/route.ts           # AI chat proxy (edge runtime)
├── app/                        # React + TypeScript + Vite source
│   ├── src/
│   │   ├── sections/           # Page sections (Hero, Tokenomics, etc.)
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/             # shadcn/ui primitives (Radix-based)
│   │   │   ├── AnimatedCounter.tsx   # GSAP counter triggered by IntersectionObserver
│   │   │   ├── CursorGlow.tsx        # Mouse-following radial-gradient spotlight
│   │   │   ├── GlowOrbs.tsx          # Ambient animated glow blobs (gold / cyan / mixed)
│   │   │   ├── Navigation.tsx        # Fixed nav with scroll-progress bar
│   │   │   ├── ReActTerminal.tsx     # AI reasoning terminal (ReAct protocol)
│   │   │   └── ParticleCanvas.tsx    # Interactive particle field (canvas)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── i18n/               # Internationalization (multi-language support)
│   │   ├── lib/                # Utility functions & chain-state helpers
│   │   ├── workers/            # Web Workers (AI inference, mining)
│   │   ├── App.tsx             # Root component; GSAP ScrollTrigger registration
│   │   └── main.tsx            # Entry point
│   ├── api/                    # App-level API routes (Node.js runtime)
│   │   └── chat/route.ts       # OpenAI-powered chat endpoint
│   ├── public/                 # Static assets (icons, images, state JSON)
│   ├── tests/                  # Playwright E2E tests
│   ├── index.html
│   ├── vite.config.ts         # Vite + PWA + Brotli config
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── contracts/                  # TON smart contracts (Tact language)
├── docs/                       # Additional documentation
├── scripts/                    # Automation scripts (state updates, etc.)
├── simulations/                # Financial / tokenomics simulations
├── CMC_APPLICATION.md          # CoinMarketCap listing application
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
└── WHITEPAPER.md
```

---

## 🌐 Zero-Cost Infrastructure Philosophy

SOLARIS CET is designed around a single constraint: **every layer must cost $0/month to operate.**

This is not a compromise — it is the architecture. By combining free-tier managed services with edge computation, the platform achieves production-grade reliability and global availability without any recurring infrastructure spend:

| Layer | Approach | Cost |
|---|---|---|
| **Data** | GitHub Actions cron pre-fetches DeDust RPC → static `api/state.json` | **$0** |
| **Delivery** | GitHub Pages CDN + Brotli compression + PWA offline cache | **$0** |
| **Compute** | ONNX Runtime Web Worker runs AI inference on the user's device | **$0** |
| **Security** | TON Tact Multi-Sig contract — no centralized key custodian | **Gas only** |

This philosophy makes the platform **fork-able, self-hostable, and censorship-resistant** — anyone can run their own full instance by forking this repository and enabling GitHub Pages.

For a deep-dive into each layer, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🔗 On-Chain References

| Layer         | Technology                                      |
|---------------|-------------------------------------------------|
| UI Framework  | [React 19](https://react.dev/)                  |
| Language      | [TypeScript 5](https://www.typescriptlang.org/) |
| Bundler       | [Vite 8](https://vite.dev/) + Rolldown          |
| Styling       | [Tailwind CSS 4](https://tailwindcss.com/)      |
| Components    | [shadcn/ui](https://ui.shadcn.com/) (Radix)     |
| Animations    | [GSAP 3](https://gsap.com/)                     |
| AI/ML         | [ONNX Runtime Web](https://onnxruntime.ai/) + [OpenAI](https://openai.com/) |
| Blockchain    | [TON Network](https://ton.org/) via TonConnect  |
| Hosting       | [GitHub Pages](https://pages.github.com/) / [Vercel](https://vercel.com/) |
| CI/CD         | [GitHub Actions](https://github.com/features/actions) |
| Security      | CodeQL SAST, Dependabot, npm audit              |

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a pull request.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.
You are free to fork, modify, and host your own instance under the same license terms.

