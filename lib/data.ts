export interface Service {
  icon: string;
  title: string;
  body: string;
}
export interface Step {
  n: string;
  title: string;
  body: string;
}
export interface CaseStudy {
  tag: string;
  amount: string;
  body: string;
}
export interface OutreachItem {
  icon: string;
  title: string;
  body: string;
}
export interface FaqItem {
  q: string;
  a: string;
}
export interface Testimonial {
  src: string;
  /** intrinsic dimensions — used for aspect-ratio so the rail lays out without shift */
  w: number;
  h: number;
}

export const services: Service[] = [
  {
    icon: "🔑",
    title: "Lost seed & key recovery",
    body: "Partial phrases, corrupted keystores, forgotten passwords — we reconstruct access paths with cryptographic tooling.",
  },
  {
    icon: "🎁",
    title: "Forgotten airdrops",
    body: "Unclaimed token allocations, staking rewards, and eligibility you never knew you had — surfaced and claimed.",
  },
  {
    icon: "🌉",
    title: "Stranded bridge transfers",
    body: "Funds stuck mid-bridge, sent to the wrong chain, or lost to a failed relayer — traced and released.",
  },
  {
    icon: "📄",
    title: "Failed tx & contract dust",
    body: "Value locked in reverted transactions, dead contracts, and unwithdrawn balances across protocols.",
  },
  {
    icon: "📜",
    title: "Inheritance & dormant wallets",
    body: "Recovering access to a wallet left behind — with the discretion and care the situation deserves.",
  },
  {
    icon: "🔎",
    title: "Scam & theft tracing",
    body: "Following stolen funds across mixers and chains to build an evidence trail for recovery or law enforcement.",
  },
];

export const steps: Step[] = [
  {
    n: "01",
    title: "Tell us what went missing",
    body: "Share a wallet address, a transaction, or just the story. The first scan is free and confidential.",
  },
  {
    n: "02",
    title: "We trace it onchain",
    body: "Our researchers map every hop, contract, and balance — building a verifiable picture of where the value sits.",
  },
  {
    n: "03",
    title: "You approve the plan",
    body: "We show you exactly what is recoverable, how, and what it costs. Nothing moves without your sign-off.",
  },
  {
    n: "04",
    title: "Recover & reclaim",
    body: "Funds are returned to a wallet you control. You only pay a share of what we successfully recover.",
  },
];

export const cases: CaseStudy[] = [
  {
    tag: "FORGOTTEN AIRDROP",
    amount: "$127K",
    body: "Three years of unclaimed governance tokens across four protocols, surfaced from a dormant 2021 wallet.",
  },
  {
    tag: "BRIDGE FAILURE",
    amount: "$48.2K",
    body: "A stablecoin transfer stranded by a defunct bridge relayer, traced and released to the original owner.",
  },
  {
    tag: "LOST KEYSTORE",
    amount: "$310K",
    body: "A partial seed phrase and an old encrypted file — reconstructed into full access after six weeks of work.",
  },
];

export const outreach: OutreachItem[] = [
  {
    icon: "📡",
    title: "Continuous scanning",
    body: "We monitor chains around the clock for unclaimed and forgotten value the market has overlooked.",
  },
  {
    icon: "🧭",
    title: "Owner attribution",
    body: "We trace stranded funds back to the rightful owner using verifiable onchain evidence.",
  },
  {
    icon: "🤝",
    title: "Verified outreach",
    body: "We reach out directly with a clear, no-obligation plan to help you claim what is yours.",
  },
];

export const testimonials: Testimonial[] = [
  { src: "/assets/testimonials/testimonial-1.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-2.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-3.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-4.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-5.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-6.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-7.jpg", w: 1179, h: 1246 },
  { src: "/assets/testimonials/testimonial-8.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-9.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-10.jpg", w: 988, h: 1280 },
  { src: "/assets/testimonials/testimonial-11.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-12.jpg", w: 590, h: 1280 },
  { src: "/assets/testimonials/testimonial-13.jpg", w: 1152, h: 1280 },
];

export const faqs: FaqItem[] = [
  {
    q: "How much does recovery cost?",
    a: "The initial scan is always free. If we recover funds, we take an agreed percentage of what is returned — you never pay out of pocket.",
  },
  {
    q: "Do you ever hold my keys or funds?",
    a: "Never. Orion Scope is fully non-custodial. Recovered funds go directly to a wallet you control, and we guide you through every signature.",
  },
  {
    q: "What can realistically be recovered?",
    a: "Forgotten airdrops, stranded bridge transfers, failed-transaction balances, dormant wallets, and many partial-key situations. If it is truly unrecoverable, we tell you upfront — for free.",
  },
  {
    q: "How long does a case take?",
    a: "A first-pass scan takes about 48 hours. Full recoveries range from days to several weeks depending on complexity — you get progress updates throughout.",
  },
];
