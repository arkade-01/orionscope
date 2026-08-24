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
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

/**
 * The headline figures.
 *
 * Each was previously written twice in Hero.tsx — once as the seed value and
 * again as the count-up target — so changing one and missing the other made a
 * counter start at the old number and animate to the new one.
 */
export interface HeroStat {
  /** The real value. Formatting happens at render. */
  value: number;
  label: string;
  format: "usdMillions" | "count" | "percent";
}

export const heroStats: HeroStat[] = [
  { value: 5_400_000, label: "Assets recovered", format: "usdMillions" },
  { value: 8_420, label: "Wallets investigated", format: "count" },
  { value: 91, label: "Recovery rate", format: "percent" },
];

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
    tag: "FORGOTTEN AIRDROPS",
    amount: "$2M",
    body: "Governance and incentive allocations that went unclaimed — often for years, often by holders who never knew they qualified.",
  },
  {
    tag: "TOKENS THAT APPRECIATED",
    amount: "$1.5M",
    body: "Balances written off as worthless when they were received, surfaced back to their owners after the market disagreed.",
  },
  {
    tag: "SUNSETTED PROTOCOLS",
    amount: "$1.9M",
    body: "Funds left behind in protocols that shut down, wound back, or quietly stopped maintaining a front-end to withdraw from.",
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
  {
    quote:
      "Good dude, he is finding people who have unclaimed BONK and trying to let them know. He went through me yesterday to get in contact with a lad who had like 2.7 billion vested BONK he had no idea existed.",
    name: "Case (@case_fud)",
    role: "2.7B vested BONK surfaced for a friend",
    avatar: "/assets/testimonials/pfp/case-fud.jpg",
  },
  {
    quote:
      "Okay bro nws I respect the hustle, I knew about it just never bothered.",
    name: "Aydan",
    role: "Alerted to ~$2,500 in unclaimed $W",
    avatar: "/assets/testimonials/pfp/aydan.jpg",
  },
  {
    quote:
      "It actually worked! It took some time not trying to get scammed. Well thanks! I'll send you 30% of what I claimed now, what's your wallet?",
    name: "SolanaBacker.sol",
    role: "Claimed an airdrop we surfaced",
    avatar: "/assets/testimonials/pfp/solanabacker.jpg",
  },
  {
    quote:
      "Thanks for pushing me to claim them. If you see any more feel free to let me know.",
    name: "JamesCarnley.eth",
    role: "Claimed airdrops flagged by our outreach",
    avatar: "/assets/testimonials/pfp/jamescarnley.jpg",
  },
  {
    quote:
      "Oh woah… thank you so much!! I'm going to get this claimed but gotta talk to lawyers.",
    name: "512mace",
    role: "A find big enough to involve lawyers",
    avatar: "/assets/testimonials/pfp/512mace.jpg",
  },
  {
    quote:
      "Hey. Ur dms were hidden. Appreciate the heads up. What's ur addy? Want to send a thnx.",
    name: "aaronv.eth",
    role: "Offered a tip after our heads-up",
    avatar: "/assets/testimonials/pfp/aaronv-eth.jpg",
  },
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
