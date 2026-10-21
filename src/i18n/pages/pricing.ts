import type { PageCopy } from "@/i18n/page-copy";

/**
 * Pricing (SOW §3.3: "investor tiers, feature comparison, billing FAQ, and a
 * permanent 'innovators are always free' band"; §1.1; §2.4; §4.4). Prices and
 * the quota are not fixed (SOW §5), so they are announced at launch. The
 * payment provider is not named (clarifications).
 */
const en = {
  meta: {
    title: "Pricing",
    description:
      "Innovators use Xwavy free, always. Investors browse free and choose a monthly or annual subscription to unlock full detail and introduction requests.",
  },
  hero: {
    eyebrow: "Pricing",
    titleLead: "Free to post.",
    titleAccent: "Simple to subscribe.",
    body: "Innovators never pay. Investors browse free and choose a monthly or annual plan when they want the full picture and the ability to ask.",
    primary: "Post your idea, free",
    secondary: "Browse ideas",
    points: ["No listing fees", "No commission", "Cancel any time"],
  },
  plans: {
    eyebrow: "Plans",
    titleLead: "One side free.",
    titleAccent: "One simple subscription.",
    description: "Plan prices and the monthly request quota are announced at launch.",
    priceSoon: "Announced at launch",
    periodLabel: "Billing period",
    cards: [
      {
        audience: "Innovators",
        name: "Free",
        price: "0",
        cadence: "Always",
        body: "Everything an innovator needs, at no cost.",
        points: [
          "Post ideas in five short steps",
          "Human review with written feedback",
          "Receive and answer introduction requests",
          "Basic stats for every published idea",
        ],
        cta: "Post your idea",
      },
      {
        audience: "Investors",
        name: "Monthly",
        price: "",
        cadence: "Billed monthly",
        body: "The full subscriber toolkit, billed every month.",
        points: [
          "Everything on the free tier",
          "Full idea detail and innovator identity",
          "Advanced filters, sorting and CSV export",
          "A monthly quota of introduction requests",
        ],
        cta: "Browse ideas",
      },
      {
        audience: "Investors",
        name: "Annual",
        price: "",
        cadence: "Billed yearly",
        body: "The full subscriber toolkit, billed once a year.",
        points: [
          "Everything on the free tier",
          "Full idea detail and innovator identity",
          "Advanced filters, sorting and CSV export",
          "A monthly quota of introduction requests",
        ],
        cta: "Browse ideas",
      },
    ],
  },
  compare: {
    eyebrow: "Compare",
    titleLead: "Free and subscribed,",
    titleAccent: "side by side.",
    description: "Browsing is free at real volume. A subscription unlocks the substance and the ability to ask.",
  },
  billing: {
    eyebrow: "Billing",
    titleLead: "Clear billing,",
    titleAccent: "no surprises.",
    cards: [
      {
        title: "Secure card payments",
        body: "Subscriptions are processed by a global card payment provider. Card details never touch Xwavy’s servers.",
      },
      {
        title: "Manage it yourself",
        body: "Your billing page shows your plan, renewal date and invoices, with self-service plan changes, card updates and cancellation.",
      },
      {
        title: "A failed payment isn’t the end",
        body: "If a renewal fails, your access continues while the payment is retried, and we let you know by email and in the portal.",
      },
      {
        title: "Cancel and keep your connections",
        body: "You return to the free tier. Accepted connections, saved ideas, notes and request history stay with you.",
      },
    ],
  },
  band: {
    eyebrow: "Innovators",
    parts: [
      { text: "Innovators pay nothing, " },
      { text: "ever.", accent: true },
      { text: " No listing fees, no commission and no paywall on your side of the marketplace." },
    ],
  },
  faq: {
    eyebrow: "Billing questions",
    titleLead: "Good to",
    titleAccent: "know.",
    items: [
      {
        q: "When will prices be published?",
        a: "Plan prices and the monthly request quota are announced at launch. Until then, browsing and posting are free.",
      },
      {
        q: "What’s the difference between monthly and annual?",
        a: "How you’re billed: every month, or once a year. Both are investor subscriptions with a monthly quota of introduction requests.",
      },
      {
        q: "Do unanswered requests come back?",
        a: "Yes. A request that expires without an answer is credited back to your quota. A declined request has used its slot.",
      },
      {
        q: "What happens if my payment fails?",
        a: "Your subscription moves to past due and the payment is retried. You keep access during the retry window, and we remind you by email and in the portal.",
      },
      {
        q: "How do I cancel?",
        a: "From your billing page, any time. You return to the free tier and keep your connections, saved ideas, notes and request history.",
      },
      {
        q: "Do innovators ever pay?",
        a: "No. Posting ideas, receiving requests and accepting them are free for innovators, always.",
      },
      {
        q: "Does Xwavy take a commission?",
        a: "No. The only money in the system is the investor’s subscription. Xwavy holds no funds and takes no share of any deal.",
      },
    ],
  },
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  meta: {
    title: "الأسعار",
    description:
      "يستخدم المبتكرون Xwavy مجانًا، دائمًا. ويتصفح المستثمرون مجانًا، ويختارون اشتراكًا شهريًا أو سنويًا للاطلاع على التفاصيل الكاملة وطلب التعارف.",
  },
  hero: {
    eyebrow: "الأسعار",
    titleLead: "النشر مجاني.",
    titleAccent: "والاشتراك بسيط.",
    body: "المبتكرون لا يدفعون أبدًا. ويتصفح المستثمرون مجانًا، ويختارون باقة شهرية أو سنوية عندما يريدون الصورة الكاملة وإمكانية طلب التعارف.",
    primary: "انشر فكرتك مجانًا",
    secondary: "تصفّح الأفكار",
    points: ["بلا رسوم إدراج", "بلا عمولات", "ألغِ في أي وقت"],
  },
  plans: {
    eyebrow: "الباقات",
    titleLead: "طرف مجاني.",
    titleAccent: "واشتراك واحد بسيط.",
    description: "تُعلن أسعار الباقات والحصة الشهرية من الطلبات عند الإطلاق.",
    priceSoon: "يُعلن عند الإطلاق",
    periodLabel: "مدة الفوترة",
    cards: [
      {
        audience: "المبتكرون",
        name: "مجانية",
        price: "0",
        cadence: "دائمًا",
        body: "كل ما يحتاجه المبتكر، دون أي تكلفة.",
        points: [
          "انشر أفكارك في خمس خطوات قصيرة",
          "مراجعة بشرية مع ملاحظات مكتوبة",
          "استقبل طلبات التعارف وردّ عليها",
          "إحصاءات أساسية لكل فكرة منشورة",
        ],
        cta: "انشر فكرتك",
      },
      {
        audience: "المستثمرون",
        name: "شهرية",
        price: "",
        cadence: "تُدفع شهريًا",
        body: "أدوات المشترك كاملة، بفوترة كل شهر.",
        points: [
          "كل ما في المستوى المجاني",
          "تفاصيل الأفكار كاملة وهوية المبتكر",
          "فلاتر متقدمة وترتيب وتصدير بصيغة CSV",
          "حصة شهرية من طلبات التعارف",
        ],
        cta: "تصفّح الأفكار",
      },
      {
        audience: "المستثمرون",
        name: "سنوية",
        price: "",
        cadence: "تُدفع سنويًا",
        body: "أدوات المشترك كاملة، بفوترة مرة واحدة في السنة.",
        points: [
          "كل ما في المستوى المجاني",
          "تفاصيل الأفكار كاملة وهوية المبتكر",
          "فلاتر متقدمة وترتيب وتصدير بصيغة CSV",
          "حصة شهرية من طلبات التعارف",
        ],
        cta: "تصفّح الأفكار",
      },
    ],
  },
  compare: {
    eyebrow: "قارن",
    titleLead: "المجاني والاشتراك،",
    titleAccent: "جنبًا إلى جنب.",
    description: "التصفح مجاني وبحجم حقيقي. والاشتراك يفتح لك التفاصيل الجوهرية وإمكانية طلب التعارف.",
  },
  billing: {
    eyebrow: "الفوترة",
    titleLead: "فوترة واضحة،",
    titleAccent: "بلا مفاجآت.",
    cards: [
      {
        title: "مدفوعات آمنة بالبطاقة",
        body: "تتم معالجة الاشتراكات عبر مزوّد دفع عالمي بالبطاقات، ولا تصل بيانات البطاقة إلى خوادم Xwavy أبدًا.",
      },
      {
        title: "تحكّم بنفسك",
        body: "تعرض صفحة الفوترة باقتك وتاريخ التجديد والفواتير، ويمكنك بنفسك تغيير الباقة وتحديث البطاقة والإلغاء.",
      },
      {
        title: "تعثّر الدفع ليس النهاية",
        body: "إذا تعذّر التجديد، يستمر وصولك أثناء إعادة محاولة الدفع، ونبلغك بذلك عبر البريد الإلكتروني وفي البوابة.",
      },
      {
        title: "ألغِ واحتفظ بعلاقات التعارف",
        body: "تعود إلى المستوى المجاني، وتبقى معك علاقات التعارف المقبولة والأفكار المحفوظة والملاحظات وسجل الطلبات.",
      },
    ],
  },
  band: {
    eyebrow: "المبتكرون",
    parts: [
      { text: "المبتكرون لا يدفعون شيئًا، " },
      { text: "أبدًا.", accent: true },
      { text: " لا رسوم إدراج، ولا عمولات، ولا أي مدفوعات في جانبك من المنصة." },
    ],
  },
  faq: {
    eyebrow: "أسئلة الفوترة",
    titleLead: "معلومات",
    titleAccent: "تهمّك.",
    items: [
      {
        q: "متى تُنشر الأسعار؟",
        a: "تُعلن أسعار الباقات والحصة الشهرية من الطلبات عند الإطلاق. وحتى ذلك الحين، التصفح والنشر مجانيان.",
      },
      {
        q: "ما الفرق بين الباقة الشهرية والسنوية؟",
        a: "طريقة الفوترة فقط: كل شهر، أو مرة واحدة في السنة. وكلتاهما اشتراك للمستثمرين يتضمن حصة شهرية من طلبات التعارف.",
      },
      {
        q: "هل تُعاد الطلبات التي لم يُرد عليها؟",
        a: "نعم. الطلب الذي تنتهي صلاحيته دون رد يُعاد إلى حصتك. أما الطلب المرفوض فقد استهلك خانته.",
      },
      {
        q: "ماذا يحدث إذا تعذّر الدفع؟",
        a: "يصبح اشتراكك متأخر السداد، وتُعاد محاولة الدفع. ويبقى وصولك قائمًا خلال فترة إعادة المحاولة، ونذكّرك عبر البريد الإلكتروني وفي البوابة.",
      },
      {
        q: "كيف ألغي اشتراكي؟",
        a: "من صفحة الفوترة، في أي وقت. تعود إلى المستوى المجاني، وتحتفظ بعلاقات التعارف والأفكار المحفوظة والملاحظات وسجل الطلبات.",
      },
      {
        q: "هل يدفع المبتكرون في أي مرحلة؟",
        a: "لا. نشر الأفكار واستقبال طلبات التعارف وقبولها مجاني للمبتكرين، دائمًا.",
      },
      {
        q: "هل تتقاضى Xwavy عمولة؟",
        a: "لا. المال الوحيد في المنظومة هو اشتراك المستثمر. ولا تحتفظ Xwavy بأي أموال، ولا تأخذ حصة من أي صفقة.",
      },
    ],
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;
