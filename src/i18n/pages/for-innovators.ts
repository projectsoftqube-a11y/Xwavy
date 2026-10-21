import type { PageCopy } from "@/i18n/page-copy";

/**
 * For innovators (SOW §3.3: "post free, stay in control of who reaches you,
 * decline without explanation"; §2.2 innovator portal; §4.2 journey).
 */
const en = {
  meta: {
    title: "For innovators",
    description:
      "Post your idea on Xwavy free. A person reviews it, subscribed investors can ask to meet you, and your contact details stay sealed until you accept.",
  },
  hero: {
    eyebrow: "For innovators",
    titleLead: "Post your idea free.",
    titleAccent: "Decide who reaches you.",
    body: "Publish what you’re building at no cost, ever. A person reviews it, investors find it, and your contact details stay sealed until you accept an introduction.",
    primary: "Post your idea, free",
    secondary: "How it works",
    points: ["Free, always", "Contact sealed until you accept", "Decline without a reason"],
  },
  composer: {
    eyebrow: "Add your idea",
    titleLead: "Five short steps.",
    titleAccent: "Saved after each one.",
    body: "Every detail is marked as it goes in: public, so anyone can find you, or for subscribers only. Your contact details are never on this list; they stay sealed until you accept a request.",
    accessLabel: "Who sees it",
    publicLabel: "Public",
    paidLabel: "Subscribers",
    stepLabel: "Step",
    savedLabel: "Saved",
    steps: [
      {
        name: "Basics",
        fields: [
          { label: "Title", layer: "public" },
          { label: "One-line pitch", layer: "public" },
          { label: "Sector, stage and region", layer: "public" },
        ],
      },
      {
        name: "Problem & solution",
        fields: [
          { label: "Problem statement", layer: "public" },
          { label: "The full narrative", layer: "paid" },
        ],
      },
      {
        name: "Traction",
        fields: [
          { label: "Traction, as you report it", layer: "paid" },
          { label: "Financials", layer: "paid" },
          { label: "Team", layer: "paid" },
        ],
      },
      {
        name: "The ask",
        fields: [
          { label: "Ask band", layer: "public" },
          { label: "Exact raise", layer: "paid" },
        ],
      },
      {
        name: "Media",
        fields: [{ label: "Pitch deck", layer: "paid" }],
      },
    ],
  },
  review: {
    eyebrow: "Review",
    titleLead: "A person reads",
    titleAccent: "every idea.",
    description: "Each submission is checked against our published acceptable-use policy. You always get one of three outcomes, in the portal and by email.",
    cards: [
      {
        kicker: "Approved",
        title: "You’re live.",
        body: "Your public summary is published and searchable. Your contact details stay sealed.",
        points: ["Indexed so investors can find you", "Pause, resume or archive whenever you like"],
      },
      {
        kicker: "Changes requested",
        title: "Close, with notes.",
        body: "Most ideas aren’t breaking any rules; they just need more detail. You get written feedback on a dedicated thread and one action: edit and resubmit.",
        points: ["Every review pass is kept on the thread", "Resubmit as often as you need"],
      },
      {
        kicker: "Rejected",
        title: "Not this version.",
        body: "If an idea breaches the acceptable-use policy, it isn’t published, and you’re told why. You can rewrite it and submit it again.",
        points: ["Always with a reason", "Never indexed"],
      },
    ],
  },
  decision: {
    eyebrow: "When an investor asks",
    titleLead: "You see who’s asking.",
    titleAccent: "They don’t see how to reach you.",
    body: "Every request comes from a subscribed investor and arrives with a personal note. You decide with the full picture, and with no clock running.",
    seeTitle: "What you see",
    see: ["Their firm and investor type", "Their mandate and cheque size", "A personal note written to you"],
    hiddenTitle: "What stays hidden until you accept",
    hidden: ["Their email and phone", "Their links and calendar", "Your contact details, from them"],
    promise: "Accept and decline carry equal weight. No countdown, no penalty, no reason needed.",
  },
  dashboard: {
    eyebrow: "Your dashboard",
    titleLead: "Everything in",
    titleAccent: "one place.",
    items: [
      { title: "One next action", body: "The dashboard surfaces the single thing worth doing next." },
      { title: "Ideas by state", body: "Drafts, in review, published, paused and archived, each with a clear badge." },
      { title: "Basic stats", body: "See how each published idea is doing, free." },
      { title: "Feedback thread", body: "Every review pass, outcome and note, kept with the idea." },
      { title: "Introduction inbox", body: "Pending, accepted, declined and expired requests, with a decision screen for each." },
      { title: "Connections", body: "Accepted investors’ contact details, ready to copy, with your private notes." },
    ],
  },
  faq: {
    eyebrow: "Questions",
    titleLead: "For",
    titleAccent: "innovators.",
    items: [
      { q: "Is it really free?", a: "Yes. Posting ideas, receiving introduction requests and accepting them costs innovators nothing." },
      { q: "Who can see my idea?", a: "Anyone can see your public summary. Subscribed investors also see the full narrative, financials, traction, team, deck, exact raise and your identity. Nobody sees your contact details until you accept a request." },
      { q: "Can I contact investors myself?", a: "Introductions always start with an investor’s request, so you’re never cold-pitching and never cold-pitched." },
      { q: "Do I have to answer every request?", a: "No. You can accept, decline without giving a reason, or let it expire at the end of the response window. Nothing is shared unless you accept." },
      { q: "Can I edit, pause or remove my idea?", a: "Yes. A material edit to a published idea goes back to review while the live version stays up. Pausing hides it from discovery; archiving delists it, and you can relist later." },
      { q: "Can I post in Arabic?", a: "Yes. Post in Arabic or English, whichever you prefer. The whole platform is available in both." },
      { q: "What happens after I accept?", a: "You and the investor receive each other’s contact details at the same moment. The conversation continues off the platform; Xwavy isn’t a party to any deal." },
    ],
  },
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  meta: {
    title: "للمبتكرين",
    description:
      "انشر فكرتك على Xwavy مجانًا. يراجعها شخص من فريقنا، ويمكن للمستثمرين المشتركين طلب التعارف معك، وتبقى بيانات تواصلك مختومة حتى تقبل.",
  },
  hero: {
    eyebrow: "للمبتكرين",
    titleLead: "انشر فكرتك مجانًا.",
    titleAccent: "وقرّر من يصل إليك.",
    body: "انشر ما تعمل عليه دون أي تكلفة، دائمًا. يراجعه شخص من فريقنا، ويجده المستثمرون، وتبقى بيانات تواصلك مختومة حتى تقبل طلب تعارف.",
    primary: "انشر فكرتك مجانًا",
    secondary: "كيف تعمل المنصة",
    points: ["مجاني دائمًا", "بيانات تواصلك مختومة حتى تقبل", "ارفض دون ذكر السبب"],
  },
  composer: {
    eyebrow: "أضف فكرتك",
    titleLead: "خمس خطوات قصيرة.",
    titleAccent: "تُحفظ بعد كل خطوة.",
    body: "يُحدَّد مستوى ظهور كل تفصيل لحظة إدخاله: عام ليجدك الجميع، أو للمشتركين فقط. أما بيانات تواصلك فليست ضمن هذه القائمة؛ تبقى مختومة حتى تقبل طلبًا.",
    accessLabel: "من يراه",
    publicLabel: "عام",
    paidLabel: "للمشتركين",
    stepLabel: "الخطوة",
    savedLabel: "تم الحفظ",
    steps: [
      {
        name: "الأساسيات",
        fields: [
          { label: "العنوان", layer: "public" },
          { label: "النبذة المختصرة", layer: "public" },
          { label: "القطاع والمرحلة والمنطقة", layer: "public" },
        ],
      },
      {
        name: "المشكلة والحل",
        fields: [
          { label: "بيان المشكلة", layer: "public" },
          { label: "القصة الكاملة", layer: "paid" },
        ],
      },
      {
        name: "مؤشرات النمو",
        fields: [
          { label: "مؤشرات النمو كما تعرضها", layer: "paid" },
          { label: "البيانات المالية", layer: "paid" },
          { label: "الفريق", layer: "paid" },
        ],
      },
      {
        name: "التمويل المطلوب",
        fields: [
          { label: "نطاق التمويل المطلوب", layer: "public" },
          { label: "مبلغ التمويل الدقيق", layer: "paid" },
        ],
      },
      {
        name: "الوسائط",
        fields: [{ label: "العرض التقديمي", layer: "paid" }],
      },
    ],
  },
  review: {
    eyebrow: "المراجعة",
    titleLead: "يقرأ شخص من فريقنا",
    titleAccent: "كل فكرة.",
    description: "تُراجع كل فكرة مقدَّمة وفق سياسة الاستخدام المقبول المعلنة. وتصلك دائمًا إحدى ثلاث نتائج، في البوابة وعبر البريد الإلكتروني.",
    cards: [
      {
        kicker: "مقبولة",
        title: "فكرتك منشورة.",
        body: "يُنشر ملخصك العام ويصبح قابلًا للبحث، وتبقى بيانات تواصلك مختومة.",
        points: ["تظهر في نتائج البحث ليجدك المستثمرون", "أوقفها مؤقتًا أو استأنفها أو أرشفها متى شئت"],
      },
      {
        kicker: "طلب تعديلات",
        title: "قريبة، مع ملاحظات.",
        body: "معظم الأفكار لا تخالف أي قاعدة، وكل ما تحتاجه مزيد من التفاصيل. تصلك ملاحظات مكتوبة في سلسلة ملاحظات مخصصة، ويبقى أمامك إجراء واحد: عدّل وأعد الإرسال.",
        points: ["تُحفظ كل جولة مراجعة في سلسلة الملاحظات", "أعد الإرسال كلما احتجت"],
      },
      {
        kicker: "مرفوضة",
        title: "ليست بهذه النسخة.",
        body: "إذا خالفت الفكرة سياسة الاستخدام المقبول فلن تُنشر، وستعرف السبب. ويمكنك إعادة كتابتها وإرسالها من جديد.",
        points: ["مع ذكر السبب دائمًا", "لا تظهر في محركات البحث أبدًا"],
      },
    ],
  },
  decision: {
    eyebrow: "عندما يطلب مستثمر التعارف",
    titleLead: "ترى من يطلب.",
    titleAccent: "ولا يرى هو كيف يصل إليك.",
    body: "يصل كل طلب من مستثمر مشترك ومعه رسالة شخصية. فتقرر وأمامك الصورة كاملة، ودون عدّ تنازلي.",
    seeTitle: "ما تراه",
    see: ["شركته ونوع المستثمر", "توجهه الاستثماري وحجم استثماره", "رسالة شخصية موجهة إليك"],
    hiddenTitle: "ما يبقى مخفيًا حتى تقبل",
    hidden: ["بريده الإلكتروني وهاتفه", "روابطه وتقويمه", "بيانات تواصلك، فلا تصل إليه"],
    promise: "للقبول والرفض الوزن نفسه. لا عدّ تنازلي، ولا عواقب، ولا حاجة إلى ذكر السبب.",
  },
  dashboard: {
    eyebrow: "لوحة التحكم",
    titleLead: "كل شيء في",
    titleAccent: "مكان واحد.",
    items: [
      { title: "خطوتك التالية", body: "تُبرز لك اللوحة الأمر الوحيد الذي يستحق أن تقوم به الآن." },
      { title: "الأفكار حسب حالتها", body: "المسودات، وقيد المراجعة، والمنشورة، والمتوقفة مؤقتًا، والمؤرشفة، ولكل منها شارة واضحة." },
      { title: "إحصاءات أساسية", body: "تابع أداء كل فكرة منشورة، مجانًا." },
      { title: "سلسلة الملاحظات", body: "كل جولة مراجعة ونتيجتها وملاحظاتها، محفوظة مع الفكرة." },
      { title: "صندوق طلبات التعارف", body: "الطلبات المعلّقة والمقبولة والمرفوضة والمنتهية الصلاحية، مع شاشة قرار لكل طلب." },
      { title: "علاقات التعارف", body: "بيانات تواصل المستثمرين الذين قبلت طلباتهم، جاهزة للنسخ، مع ملاحظاتك الخاصة." },
    ],
  },
  faq: {
    eyebrow: "أسئلة",
    titleLead: "إجابات",
    titleAccent: "للمبتكرين.",
    items: [
      { q: "هل النشر مجاني فعلًا؟", a: "نعم. نشر الأفكار واستقبال طلبات التعارف وقبولها لا يكلّف المبتكرين شيئًا." },
      { q: "من يمكنه رؤية فكرتي؟", a: "يمكن لأي شخص رؤية ملخصك العام. ويرى المستثمرون المشتركون أيضًا القصة الكاملة والبيانات المالية ومؤشرات النمو والفريق والعرض التقديمي ومبلغ التمويل الدقيق وهويتك. ولا يرى أحد بيانات تواصلك حتى تقبل طلبًا." },
      { q: "هل يمكنني التواصل مع المستثمرين بنفسي؟", a: "يبدأ التعارف دائمًا بطلب من المستثمر، فلا تحتاج أبدًا إلى مراسلة مستثمرين لا يعرفونك، ولا تصلك رسائل عشوائية." },
      { q: "هل عليّ الرد على كل طلب؟", a: "لا. يمكنك القبول، أو الرفض دون ذكر السبب، أو ترك الطلب حتى تنتهي صلاحيته بانتهاء مدة الرد. ولا يُشارك أي شيء ما لم تقبل." },
      { q: "هل يمكنني تعديل فكرتي أو إيقافها مؤقتًا أو إزالتها؟", a: "نعم. أي تعديل جوهري على فكرة منشورة يعيدها إلى المراجعة، وتبقى النسخة الحالية منشورة. والإيقاف المؤقت يخفيها عن التصفح، والأرشفة تلغي إدراجها، ويمكنك إعادة إدراجها لاحقًا." },
      { q: "هل يمكنني النشر بالعربية؟", a: "نعم. انشر بالعربية أو الإنجليزية، باللغة التي تفضلها. والمنصة كاملة متاحة باللغتين." },
      { q: "ماذا يحدث بعد أن أقبل؟", a: "تصلك أنت والمستثمر بيانات تواصل كل منكما في اللحظة نفسها. وتستمر المحادثة خارج المنصة، ولا تكون Xwavy طرفًا في أي صفقة." },
    ],
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;
