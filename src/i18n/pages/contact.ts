import type { PageCopy } from "@/i18n/page-copy";

/**
 * Contact (SOW §3.3: "contact form with a category selector that routes to
 * the right inbox"). Only one inbox is confirmed (info@xwavy.com), so the
 * form opens the visitor's email app with the topic in the subject line.
 * No address, phone, hours or response-time promise: none supplied.
 */
const en = {
  meta: {
    title: "Contact",
    description: "Contact the Xwavy team. Choose a topic and send your message to info@xwavy.com.",
  },
  hero: {
    eyebrow: "Contact",
    titleLead: "Talk to",
    titleAccent: "the Xwavy team.",
    body: "Questions about posting an idea, investor plans, partnerships or anything else? Choose a topic so your message reaches the right people.",
  },
  form: {
    eyebrow: "Send a message",
    titleLead: "How can we",
    titleAccent: "help?",
    description: "Your message opens in your email app, addressed to info@xwavy.com with your topic in the subject line. Nothing is sent until you press send there.",
    nameLabel: "Your name",
    emailLabel: "Your email",
    topicLabel: "Topic",
    messageLabel: "Message",
    messagePlaceholder: "Tell us what you need…",
    submit: "Open in my email app",
    directLabel: "Or write to us directly",
    privacyNote: "Please don’t include passwords or card details in your message.",
    topics: [
      "General question",
      "Innovator support",
      "Investor support and billing",
      "Partnerships",
      "Press and media",
      "Report a concern",
    ],
  },
  links: {
    eyebrow: "Before you write",
    titleLead: "You may find",
    titleAccent: "your answer here.",
    cards: [
      { title: "How introductions work", body: "The double opt-in, the idea lifecycle and who sees what.", link: "How it works", href: "/how-it-works" },
      { title: "Plans and billing", body: "What a subscription unlocks, and how billing and cancellation work.", link: "Pricing", href: "/pricing" },
      { title: "Policies", body: "Terms, privacy, cookies, acceptable use and our no-advice disclaimer.", link: "Legal", href: "/legal" },
    ],
  },
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  meta: {
    title: "اتصل بنا",
    description: "تواصل مع فريق Xwavy. اختر الموضوع وأرسل رسالتك إلى info@xwavy.com.",
  },
  hero: {
    eyebrow: "اتصل بنا",
    titleLead: "تحدّث مع",
    titleAccent: "فريق Xwavy.",
    body: "لديك سؤال عن نشر فكرة، أو باقات المستثمرين، أو الشراكات، أو أي أمر آخر؟ اختر الموضوع لتصل رسالتك إلى الأشخاص المعنيين.",
  },
  form: {
    eyebrow: "أرسل رسالة",
    titleLead: "كيف يمكننا",
    titleAccent: "مساعدتك؟",
    description: "تُفتح رسالتك في تطبيق البريد لديك، موجّهة إلى info@xwavy.com ويظهر موضوعها في سطر العنوان. ولا يُرسل شيء حتى تضغط زر الإرسال هناك.",
    nameLabel: "اسمك",
    emailLabel: "بريدك الإلكتروني",
    topicLabel: "الموضوع",
    messageLabel: "الرسالة",
    messagePlaceholder: "أخبرنا بما تحتاج إليه…",
    submit: "افتح في تطبيق البريد",
    directLabel: "أو راسلنا مباشرة",
    privacyNote: "يُرجى عدم ذكر كلمات المرور أو بيانات البطاقة في رسالتك.",
    topics: [
      "سؤال عام",
      "دعم المبتكرين",
      "دعم المستثمرين والفوترة",
      "الشراكات",
      "الصحافة والإعلام",
      "الإبلاغ عن مشكلة",
    ],
  },
  links: {
    eyebrow: "قبل أن تراسلنا",
    titleLead: "قد تجد",
    titleAccent: "إجابتك هنا.",
    cards: [
      { title: "كيف يتم التعارف", body: "الموافقة المزدوجة، ودورة حياة الفكرة، ومن يرى ماذا.", link: "كيف تعمل المنصة", href: "/how-it-works" },
      { title: "الباقات والفوترة", body: "ما يفتحه الاشتراك، وكيف تتم الفوترة والإلغاء.", link: "الأسعار", href: "/pricing" },
      { title: "السياسات", body: "شروط الخدمة، والخصوصية، وملفات تعريف الارتباط، والاستخدام المقبول، وإخلاء المسؤولية عن تقديم المشورة.", link: "الشؤون القانونية", href: "/legal" },
    ],
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;
