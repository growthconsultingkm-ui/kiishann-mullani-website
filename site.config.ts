/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one file to edit for owner-controlled details.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Anything marked  TO CONFIRM  is a placeholder waiting for Kiishann's
 *  approval. Empty strings are deliberate: the site hides an element when
 *  its value is empty, so nothing fake or broken is ever shown publicly.
 *  (When you run `npm run dev`, dashed "owner note" boxes show you every
 *  slot that is still empty. These notes never appear in production.)
 */

export type Photo = { src: string; alt: string; width?: number; height?: number };

export const site = {
  name: "Kiishann Mullani",
  firstName: "Kiishann",
  role: "Growth strategist",
  tagline: "Think better. Grow smarter. Build what matters.",
  positioning:
    "A growth strategist connecting business strategy, marketing, AI and human behaviour to help businesses grow and people move forward.",
  heroSupport:
    "I connect marketing, business strategy, practical AI and human behaviour to help businesses grow and people move forward.",
  metaDescription:
    "Growth strategist Kiishann Mullani connects business strategy, marketing, practical AI and human behaviour to help businesses grow and people move forward.",

  /** TO CONFIRM — shown as a small label in the hero and footer. Leave "" to hide. */
  location: "India",
  locale: "en_IN",

  /** Contact details. Leave "" to hide. Never put private numbers here. */
  contact: {
    /** Public email shown on the Contact page, footer and contact-form notice. */
    email: "growthconsultingkm@gmail.com",
    /** TO CONFIRM — optional. */
    phone: "",
    /** TO CONFIRM — Calendly / Cal.com / Google booking link. When set, a "Book a call" button appears. */
    bookingUrl: "",
    /**
     * Optional external enquiry page, shown while the site's own form awaits setup.
     * Left empty because this site now lives on kmgrowth.in, so the email above is used instead.
     */
    fallbackEnquiryUrl: "",
    fallbackEnquiryLabel: "",
  },

  /** TO CONFIRM — social profiles. Links with an empty url are not rendered. */
  socials: [
    { label: "LinkedIn", url: "" },
    { label: "Instagram", url: "" },
    { label: "YouTube", url: "" },
    { label: "X", url: "" },
  ],

  /**
   * Newsletter. Leave actionUrl "" until a real provider is connected
   * (e.g. Buttondown, ConvertKit/Kit, Mailchimp embedded form action).
   * While empty, the signup block is hidden in production.
   */
  newsletter: {
    provider: "",
    actionUrl: "",
    emailFieldName: "email",
  },

  /**
   * Google Analytics 4. The Measurement ID is public (it appears in every page's HTML),
   * so it lives here rather than in a secret. Tracking loads only in production builds,
   * so local development and GoDaddy previews (which run in dev mode) are not counted.
   * NEXT_PUBLIC_GA_MEASUREMENT_ID overrides it; set this to "" to switch analytics off.
   */
  analytics: {
    // GA4 property "KM Growth" → web stream https://kmgrowth.in (growthconsultingkm@gmail.com)
    gaMeasurementId: "G-VB2WTS2LCT",
  },

  /**
   * Draft articles are labelled "Draft" on the site and marked noindex.
   * Set to false before public launch to hide every article whose
   * frontmatter still says `status: draft`.
   */
  showDraftContent: true,

  /**
   * TO CONFIRM — authentic photographs only (never AI likenesses).
   * Put files in /public/images/ and reference them as "/images/filename.jpg".
   * When a src is empty, the site shows a branded panel instead.
   */
  photos: {
    heroVertical: { src: "", alt: "Portrait of Kiishann Mullani" } as Photo,
    heroHorizontal: { src: "", alt: "Kiishann Mullani at work" } as Photo,
    working: { src: "", alt: "Kiishann Mullani working at his desk" } as Photo,
    candid: { src: "", alt: "Kiishann Mullani thinking through a problem in his notebook" } as Photo,
    creator: { src: "", alt: "Kiishann Mullani speaking to camera" } as Photo,
    detail: { src: "", alt: "Notebook, laptop and camera on Kiishann's desk" } as Photo,
    monochrome: { src: "", alt: "Black-and-white portrait of Kiishann Mullani" } as Photo,
  },

  /**
   * Ventures. KM Growth is the primary business destination.
   * TO CONFIRM — set `show: true` for NuraFlow Digital / Kirvon only after
   * the relationship and the public description are approved.
   */
  ventures: [
    {
      name: "KM Growth Consulting",
      url: "https://kmgrowth.in/",
      // Hidden: this site now lives on kmgrowth.in, so the block would link to itself.
      show: false,
      primary: true,
      role: "Growth consultancy",
      description:
        "The consultancy through which strategy and advisory engagements are delivered — growth strategy, brand alignment and the plan to act on them.",
    },
    {
      name: "NuraFlow Digital",
      url: "https://nuraflowdigital.com/",
      show: false,
      primary: false,
      role: "", // TO CONFIRM
      description: "", // TO CONFIRM
    },
    {
      name: "Kirvon",
      url: "https://www.kirvon.co.in/",
      show: false,
      primary: false,
      role: "", // TO CONFIRM
      description: "", // TO CONFIRM
    },
  ],

  /**
   * TO CONFIRM — the About page introduction (first person).
   * Written without invented years, titles, clients or results.
   */
  about: {
    intro: [
      "I'm Kiishann Mullani. I work where marketing, business-building, technology and human behaviour meet — and I'm most useful when a business knows it should be growing faster but can't quite see why it isn't.",
      "Professionally I work in marketing management, and I build business initiatives alongside that work, including KM Growth Consulting. That combination keeps me honest: I spend my days with the same trade-offs owners face — limited time, limited budget, too many good ideas and not enough focus.",
      "This site is where I think out loud. I write about marketing that works, AI that earns its place in a business, the fundamentals of growth, why customers decide the way they do, and the habits that turn plans into results. If something here helps you make a better decision, it's done its job.",
    ],
    /** Optional — role history or experience details Kiishann wants public. */
    experience: [] as { period: string; title: string; organisation: string }[],
  },

  /**
   * Services. Keep descriptions enquiry-based. Fill `details` only once
   * scope, timing and fees are final — empty values are not shown publicly.
   */
  services: [
    {
      slug: "growth-strategy-sprint",
      number: "01",
      name: "Growth Strategy Sprint",
      summary:
        "A focused diagnostic and planning engagement for businesses that need clarity on what's holding growth back — and what to do first.",
      forWho: [
        "Owners and founders who feel busy but not in control of growth",
        "Businesses that have tried several marketing activities without a plan connecting them",
        "Teams preparing for a new phase — a launch, a new market or a new offer",
      ],
      problems: [
        "Marketing activity without a clear strategy behind it",
        "Positioning that doesn't tell customers why you're different",
        "Too many priorities and no agreed order",
        "Uncertainty about where AI genuinely helps",
      ],
      approach:
        "We look at the business as a whole — offer, customer, market, channels, numbers and team capacity — before recommending anything. The aim is a prioritised plan you can act on, not a deck of generic ideas.",
      details: { duration: "", format: "", fee: "", deliverables: [] as string[] }, // TO CONFIRM
      notIncluded: [
        "Guarantees of revenue, leads or growth",
        "Ongoing execution of the plan, unless separately scoped",
      ],
      cta: "Discuss a sprint",
    },
    {
      slug: "growth-advisory",
      number: "02",
      name: "Growth Advisory",
      summary:
        "Ongoing strategic support for owners who want a regular outside perspective, help with important decisions and steady accountability.",
      forWho: [
        "Owners making frequent growth decisions without a strategic sounding board",
        "Businesses with a team that executes well but needs direction and prioritisation",
        "Founders who want to be held accountable to the plan they've set",
      ],
      problems: [
        "Decisions made reactively instead of against a plan",
        "Good ideas that never get prioritised or finished",
        "Marketing and sales pulling in different directions",
        "No regular moment to step back and review what's working",
      ],
      approach:
        "A regular rhythm of review and decision-making. We revisit priorities, look at what the numbers and customers are saying, and decide what to build, stop or test next.",
      details: { cadence: "", scope: "", availability: "", fee: "" }, // TO CONFIRM
      notIncluded: [
        "Guarantees of revenue, leads or growth",
        "Day-to-day management of your team",
        "Regulated advice — legal, tax, accounting or investment",
      ],
      cta: "Discuss advisory",
    },
    {
      slug: "marketing-brand-strategy",
      number: "03",
      name: "Marketing & Brand Strategy",
      summary:
        "Positioning, audience, messaging and channel strategy — so your marketing says something clear, to the right people, in the right places.",
      forWho: [
        "Businesses whose marketing looks busy but doesn't sound distinctive",
        "Brands entering a new market, launching an offer or repositioning",
        "Teams that need a clear brief before investing in creative or media",
      ],
      problems: [
        "Messaging that sounds like every competitor",
        "Trying to speak to everyone, and reaching no one in particular",
        "Channel choices driven by trends rather than customers",
        "Creative work produced without a strategic brief",
      ],
      approach:
        "Start with the customer and the decision they're making. From there: positioning, the core message, the proof behind it and the channels where it will be heard.",
      details: { implementation: "", fee: "" }, // TO CONFIRM — e.g. whether implementation is included
      notIncluded: ["Guaranteed campaign results", "Implementation, unless separately scoped"],
      cta: "Discuss brand strategy",
    },
  ],

  /** Secondary pathway for individuals. TO CONFIRM — keep disabled until scope is approved. */
  claritySession: {
    enabled: false,
    name: "Clarity & Direction Session",
    summary:
      "A one-to-one strategy session for professionals and aspiring entrepreneurs who want clarity on direction, priorities and next steps.",
    disclaimer: "This is guidance and strategy. It is not therapy, counselling or clinical mental-health treatment.",
    details: { duration: "", format: "", fee: "" },
  },

  /** How an engagement starts. TO CONFIRM — edit to match how Kiishann actually works. */
  engagementSteps: [
    {
      title: "Send an enquiry",
      text: "Share a little about your business and the challenge. A few sentences is enough to start.",
    },
    {
      title: "A short conversation",
      text: "We talk through the situation to understand it properly — and to check whether I'm the right person for it.",
    },
    {
      title: "A clear proposal",
      text: "If it's a fit, you receive a written scope with timing and fee before any work begins.",
    },
  ],
} as const;

export const navigation = [
  { label: "Work With Me", href: "/work-with-me" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Speaking", href: "/speaking-collaborations" },
  { label: "Contact", href: "/contact" },
] as const;

export const categories = [
  {
    slug: "marketing-branding",
    name: "Marketing & Branding",
    short: "Marketing",
    description:
      "Positioning, creative effectiveness, channel strategy, content and the fundamentals of winning customers.",
  },
  {
    slug: "ai-automation",
    name: "AI & Practical Automation",
    short: "AI",
    description: "Tools, workflows and automation that save real time in real businesses — without adding complexity.",
  },
  {
    slug: "business-growth",
    name: "Business Growth & Strategy",
    short: "Growth",
    description: "Diagnosis, offers, systems, revenue fundamentals, prioritisation and the discipline of execution.",
  },
  {
    slug: "consumer-psychology",
    name: "Consumer Psychology",
    short: "Psychology",
    description: "How people notice, trust, decide and buy — and what that means for the way you market.",
  },
  {
    slug: "mindset-execution",
    name: "Mindset, Productivity & Execution",
    short: "Execution",
    description: "Focus, consistency, decision quality and the habits that turn plans into finished work.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const enquiryTypes = [
  { value: "growth", label: "Business growth / advisory" },
  { value: "speaking", label: "Speaking / workshops" },
  { value: "collaboration", label: "Brand collaboration" },
  { value: "general", label: "General" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];
