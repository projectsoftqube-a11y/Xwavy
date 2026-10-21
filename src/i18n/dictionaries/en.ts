/**
 * English copy. Source of truth for every string on the public site.
 *
 * Written from the client's documents (copies in docs/client/), not from the
 * old xwavy.com site, whose content Wavy Solutions confirmed is dummy data:
 *   - "Xwavy Scope of Work, Site Map and Flowcharts" v1.0, 18 Aug 2026
 *   - "Response to Clarifications for the Revised Scope of Work", 16 Sep 2026
 *
 * Rules: no invented figures, users, testimonials or prices. Plan prices,
 * the twelve category names and live counters arrive from Wavy Solutions or
 * the database. The Arabic file (ar.ts) must mirror this shape exactly.
 */
/** The five platform steps, in order (post, review, discover, request, connect). */
type ProcessSteps = { name: string; title: string; body: string }[];

const processSteps: ProcessSteps = [
  {
    name: "Post",
    title: "Write it up in five short steps.",
    body: "Basics, problem and solution, traction, the ask, and media. Every step saves as you go, and a live preview shows exactly what visitors and subscribers will see.",
  },
  {
    name: "Review",
    title: "A person reads every idea.",
    body: "Each submission is checked against our acceptable-use policy. The outcome is always clear: approved, changes requested with written feedback, or not accepted, and you can revise and resubmit.",
  },
  {
    name: "Discover",
    title: "Investors find you.",
    body: "Your summary goes live and becomes searchable. Investors browse by sector, stage and region. Subscribers see the full picture; nobody sees how to reach you.",
  },
  {
    name: "Request",
    title: "An investor asks to meet.",
    body: "A subscribed investor sends an introduction request with a personal note. You see their firm, mandate and cheque size. Not their contact details, and never a cold email.",
  },
  {
    name: "Connect",
    title: "Say yes, and you’re introduced.",
    body: "Accept, and both sides’ contact details are revealed at the same moment. Decline, and nothing is shared, ever. Unanswered requests simply expire.",
  },
];

const en = {
  meta: {
    title: "Xwavy: where ideas meet investment",
    titleTemplate: "%s | Xwavy",
    description:
      "Xwavy is the marketplace where innovators publish ideas free and investors subscribe to see the full picture and request introductions. Contact is shared only when both sides agree.",
  },

  common: {
    skipToContent: "Skip to content",
    nav: {
      label: "Main",
      browseIdeas: "Browse ideas",
      forInnovators: "For innovators",
      forInvestors: "For investors",
      howItWorks: "How it works",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
    },
    signIn: "Sign in",
    postIdea: "Post your idea",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    /** Card beside every FAQ. No response-time promise. */
    faqHelp: {
      title: "Still have a question?",
      body: "Write to us at info@xwavy.com, or choose a topic on the contact page.",
      cta: "Contact us",
    },
  },

  footer: {
    /** The four main pages, as numbered links across the top of the footer. */
    nextLabel: "Where to next",
    next: [
      { href: "/for-innovators", title: "For innovators", line: "Post your idea, free." },
      { href: "/for-investors", title: "For investors", line: "Subscribe for the full picture." },
      { href: "/how-it-works", title: "How it works", line: "Two yeses before any contact moves." },
      { href: "/pricing", title: "Pricing", line: "Free for innovators; investors subscribe." },
    ],
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Browse ideas", href: "/ideas" },
          { label: "About Xwavy", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of service", href: "/legal/terms" },
          { label: "Privacy policy", href: "/legal/privacy" },
          { label: "Cookie policy", href: "/legal/cookies" },
          { label: "Acceptable use", href: "/legal/acceptable-use" },
          { label: "No-advice disclaimer", href: "/legal/no-advice-disclaimer" },
        ],
      },
    ],
    contactTitle: "Get in touch",
    disclaimer:
      "Xwavy introduces people. It holds no funds, brokers no securities and gives no investment advice.",
    contactLabel: "Questions?",
    rights: "All rights reserved.",
    poweredBy: "Powered by Wavy Solutions",
    backToTop: "Back to top",
  },

  home: {
    hero: {
      eyebrow: "The innovator and investor marketplace",
      /** Rendered as one headline; "after" is the serif accent. */
      title: { line1: "Where ideas", before: "meet", after: "investment." },
      body: "Innovators publish what they’re building, free. Investors subscribe to see the full picture and ask for an introduction. Contact details move only when both sides say yes.",
      primaryCta: "Post your idea, free",
      secondaryCta: "I invest",
      points: [
        "Free for innovators, always",
        "Every idea reviewed by a person",
        "Contact shared only on mutual consent",
      ],
      /** The double opt-in in four moments; the hero shows "requested" and "connected". */
      story: [
        { title: "Idea published", detail: "Reviewed, live, contact sealed" },
        { title: "Introduction requested", detail: "By a subscribed investor" },
        { title: "Request accepted", detail: "The innovator said yes" },
        { title: "Connected", detail: "Contact shared with both sides, at once" },
      ],
    },

    roles: {
      eyebrow: "Two sides, one platform",
      titleLead: "Built for both sides",
      titleAccent: "of the table.",
      innovators: {
        label: "For innovators",
        title: "Publish free. Stay in control.",
        points: [
          "Post your idea free. No listing fees, no commission",
          "Your contact details stay sealed until you accept",
          "Decline any request without giving a reason",
          "See basic stats for every idea you publish",
        ],
        cta: "How it works for innovators",
      },
      investors: {
        label: "For investors",
        title: "Curated deal flow. Warm introductions.",
        points: [
          "Browse every published idea before you pay",
          "Unlock financials, traction, team and the deck",
          "Advanced filters, sorting and CSV export",
          "Request introductions from a monthly quota",
        ],
        cta: "How it works for investors",
      },
    },

    process: {
      eyebrow: "How it works",
      titleLead: "From first draft to",
      titleAccent: "first conversation.",
      stepLabel: "Step",
      of: "of",
      /** Status shown on the photo for each step, in order. */
      statuses: ["Draft saved", "Approved", "Published", "Request sent", "Connected"],
      play: "Play steps",
      pause: "Pause steps",
      steps: processSteps,
    },

    consent: {
      eyebrow: "Double opt-in",
      investorRole: "Investor",
      innovatorRole: "Innovator",
      accept: "Accept",
      decline: "Decline",
      lockLabel: "Contact details",
      sealed: "Sealed",
      revealed: "Shared with both",
      fields: ["Email", "Phone", "LinkedIn", "Calendar link"],
      titleLead: "Two yeses before a single",
      titleAccent: "contact detail moves.",
      body: "An investor opts in by spending a request from their monthly quota. The innovator opts in by accepting. Only then are contact details released, to both sides, at the same time.",
      stages: [
        { label: "The investor asks", detail: "Firm, mandate and a personal note. It costs a request from their quota." },
        { label: "The innovator decides", detail: "Accept or decline. No countdown, no pressure, no penalty." },
        { label: "Both are introduced", detail: "Email, phone and links are revealed both ways, at once." },
      ],
      rules: [
        "A decline releases nothing, permanently.",
        "Unanswered requests expire and the investor’s request is credited back.",
        "Nobody can re-request their way past a decline.",
      ],
    },

    access: {
      eyebrow: "For investors",
      titleLead: "See the pool",
      titleAccent: "before you pay for it.",
      body: "Browsing is genuinely free, at real volume. A subscription unlocks the substance, and the ability to ask.",
      free: {
        label: "Free",
        items: [
          "Every published idea",
          "Title, pitch, sector, stage and region",
          "Problem statement and ask band",
          "Filter by sector, stage, region and keyword",
          "Save ideas and keep private notes",
        ],
      },
      paid: {
        label: "Subscriber",
        items: [
          "Full narrative and financials",
          "Traction, team and pitch deck",
          "Exact raise and founder identity",
          "Advanced filters, sorting and CSV export",
          "Introduction requests from a monthly quota",
        ],
      },
      note: "Cancel any time. Connections you’ve made and ideas you’ve saved stay with you.",
      cta: "See investor plans",
    },

    trust: {
      eyebrow: "Trust and safety",
      titleLead: "Designed to be trusted",
      titleAccent: "by both sides.",
      items: [
        {
          title: "Human moderation",
          body: "Every idea is reviewed before it’s published, against a published acceptable-use policy.",
        },
        {
          title: "Sealed contact details",
          body: "Contact information is stored sealed and released only on mutual acceptance. It never appears on a public profile.",
        },
        {
          title: "Optional investor verification",
          body: "Investors can submit company and identity documents for a verified badge. Our team reviews them by hand, normally within two business days.",
        },
        {
          title: "Secure payments",
          body: "Subscriptions are processed by a global card payment provider. Card details never touch Xwavy.",
        },
        {
          title: "Arabic and English",
          body: "The whole platform in both languages, with full right-to-left support. Post in whichever you prefer.",
        },
        {
          title: "A facilitator, not a broker",
          body: "Xwavy introduces people. We hold no funds, broker no securities and give no investment advice.",
        },
      ],
    },

    pricing: {
      eyebrow: "Pricing",
      headingLead: "Free to post.",
      headingAccent: "Subscribe to ask.",
      title: "Innovators are always free.",
      zeroLabel: "Fees for innovators",
      body: "No listing fees, no commission, no paywall on your side of the marketplace.",
      investorsTitle: "Investors choose a plan.",
      investorsBody: "Monthly or annual, each with a monthly quota of introduction requests. Cancel any time from your billing page.",
      cta: "View pricing",
      /** Facts from the Scope of Work, shown as a scroll-driven band. */
      facts: [
        "Free to post",
        "No listing fees",
        "No commission",
        "Decline without a reason",
        "Your contact stays sealed",
      ],
    },

    faq: {
      eyebrow: "Questions",
      titleLead: "Good to",
      titleAccent: "know.",
      items: [
        {
          q: "Is Xwavy really free for innovators?",
          a: "Yes. Posting ideas, receiving introduction requests and accepting them costs innovators nothing.",
        },
        {
          q: "Who can see my contact details?",
          a: "Nobody, until you accept an introduction request. They are then shared with that one investor, and you receive theirs at the same time.",
        },
        {
          q: "What does an investor subscription include?",
          a: "Full idea detail (financials, traction, team, deck, exact raise and founder identity), advanced filters, sorting and CSV export, and a monthly quota of introduction requests.",
        },
        {
          q: "What happens if I decline a request?",
          a: "Nothing is shared in either direction, and you don’t need to give a reason. The investor can’t send another request for the same idea.",
        },
        {
          q: "What if I don’t respond to a request?",
          a: "It expires at the end of the response window. Nothing is shared, and the request is credited back to the investor’s quota.",
        },
        {
          q: "How are ideas reviewed?",
          a: "A member of our team reviews every submission. It is approved, sent back with written feedback, or declined with a reason, and you can always revise and resubmit.",
        },
        {
          q: "Does Xwavy invest, take equity or handle funds?",
          a: "No. Xwavy only makes introductions. Any discussion or agreement about investment happens directly between the two parties, off the platform.",
        },
        {
          q: "Which languages can I use?",
          a: "Arabic and English. The platform is fully available in both, and you can post in either.",
        },
      ],
    },

  },
};

export type Dictionary = typeof en;
export default en;


