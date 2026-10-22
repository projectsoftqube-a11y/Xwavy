import type { PageCopy } from "@/i18n/page-copy";

/**
 * Ideas (SOW §3.4 discovery: public list and summaries, paid detail, contact
 * never public; §2.1 basic filters). An explainer that links to the live
 * directory: no example listings, because the launch database starts empty
 * and sector names are still being confirmed (clarifications).
 */
const en = {
  meta: {
    title: "Browse ideas",
    description:
      "Discover bold ideas on Xwavy. Every idea is reviewed by a person before it’s published. Browse the summaries free; subscribers see the full picture. Contact details are never public.",
  },
  hero: {
    eyebrow: "Browse ideas",
    titleLead: "Discover bold ideas,",
    titleAccent: "free to browse.",
    body: "Browse every idea that has passed review, and find the one that matches your investment thesis. Anyone can read the summaries; subscribers see the full picture and can ask for an introduction.",
    primary: "Open the directory",
    secondary: "How it works",
    points: ["Reviewed by a person before publishing", "Filter by sector, stage, region and keyword", "Contact details never public"],
  },
  layers: {
    eyebrow: "What you’ll see",
    titleLead: "Three layers",
    titleAccent: "on every idea.",
    description: "What each visitor receives is decided on the server. Details you can’t see are never sent to your browser.",
    cards: [
      {
        kicker: "Public · anyone",
        title: "The summary",
        points: ["Title and one-line pitch", "Sector, stage and region", "Problem statement", "Ask band, not the exact raise"],
      },
      {
        kicker: "Subscribers",
        title: "The full picture",
        points: ["Full narrative and financials", "Traction, team and pitch deck", "Exact raise and the innovator’s identity", "The Request intro button"],
      },
      {
        kicker: "Never public",
        title: "Contact details",
        points: ["Email, phone, LinkedIn and calendar link", "Shared only when both sides say yes", "Then in both directions at once"],
      },
    ],
  },
  filters: {
    eyebrow: "Finding the right idea",
    titleLead: "Filters for everyone.",
    titleAccent: "Power tools for subscribers.",
    cards: [
      {
        kicker: "Free",
        title: "Basic filters",
        points: ["Sector, stage and region", "Keyword search", "Result counts", "Save ideas with a free account"],
      },
      {
        kicker: "Subscribers",
        title: "Advanced tools",
        points: ["Traction and revenue band", "Raise size and recent activity", "Sort by traction or raise", "CSV export"],
      },
    ],
  },
  review: {
    eyebrow: "Quality",
    parts: [
      { text: "Every idea in the directory " },
      { text: "was read by a person", accent: true },
      { text: " before it was published, against our published acceptable-use policy." },
    ],
    footnote: "Figures such as traction and revenue are as reported by the innovator. Xwavy reviews against policy, not investment merit.",
  },
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  meta: {
    title: "تصفّح الأفكار",
    description:
      "اكتشف أفكارًا طموحة على Xwavy. يراجع شخص من فريقنا كل فكرة قبل نشرها. تصفّح الملخصات مجانًا، ويرى المشتركون الصورة الكاملة. ولا تكون بيانات التواصل عامة أبدًا.",
  },
  hero: {
    eyebrow: "تصفّح الأفكار",
    titleLead: "اكتشف أفكارًا طموحة،",
    titleAccent: "وتصفّحها مجانًا.",
    body: "تصفّح كل فكرة اجتازت المراجعة، واعثر على الفكرة التي تناسب أطروحتك الاستثمارية. يمكن لأي شخص قراءة الملخصات، ويرى المشتركون الصورة الكاملة ويمكنهم طلب التعارف.",
    primary: "افتح الدليل",
    secondary: "كيف تعمل المنصة",
    points: ["يراجعها شخص من فريقنا قبل النشر", "التصفية حسب القطاع والمرحلة والمنطقة والكلمات المفتاحية", "بيانات التواصل ليست عامة أبدًا"],
  },
  layers: {
    eyebrow: "ما ستراه",
    titleLead: "ثلاث طبقات",
    titleAccent: "لكل فكرة.",
    description: "يحدد الخادم ما يصل إلى كل زائر. والتفاصيل التي لا يحق لك رؤيتها لا تُرسل إلى متصفحك أبدًا.",
    cards: [
      {
        kicker: "عامة · للجميع",
        title: "الملخص",
        points: ["العنوان والنبذة المختصرة", "القطاع والمرحلة والمنطقة", "بيان المشكلة", "نطاق التمويل المطلوب، لا مبلغ التمويل الدقيق"],
      },
      {
        kicker: "للمشتركين",
        title: "الصورة الكاملة",
        points: ["القصة الكاملة والبيانات المالية", "مؤشرات النمو والفريق والعرض التقديمي", "مبلغ التمويل الدقيق وهوية المبتكر", "زر طلب التعارف"],
      },
      {
        kicker: "ليست عامة أبدًا",
        title: "بيانات التواصل",
        points: ["البريد الإلكتروني والهاتف وLinkedIn ورابط التقويم", "لا تُشارك إلا عندما يوافق الطرفان", "وعندها تُكشف للطرفين في آن واحد"],
      },
    ],
  },
  filters: {
    eyebrow: "العثور على الفكرة المناسبة",
    titleLead: "فلاتر للجميع.",
    titleAccent: "وأدوات متقدمة للمشتركين.",
    cards: [
      {
        kicker: "مجاني",
        title: "الفلاتر الأساسية",
        points: ["القطاع والمرحلة والمنطقة", "البحث بالكلمات المفتاحية", "عدد النتائج", "حفظ الأفكار بحساب مجاني"],
      },
      {
        kicker: "للمشتركين",
        title: "أدوات متقدمة",
        points: ["مؤشرات النمو ونطاق الإيرادات", "حجم التمويل والنشاط الأخير", "الترتيب حسب مؤشرات النمو أو حجم التمويل", "تصدير بصيغة CSV"],
      },
    ],
  },
  review: {
    eyebrow: "الجودة",
    parts: [
      { text: "كل فكرة في الدليل " },
      { text: "قرأها شخص من فريقنا", accent: true },
      { text: " قبل نشرها، وفق سياسة الاستخدام المقبول المعلنة." },
    ],
    footnote: "الأرقام مثل مؤشرات النمو والإيرادات هي كما يعرضها المبتكر. وتراجع Xwavy الأفكار وفق السياسة، لا وفق جدواها الاستثمارية.",
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;
