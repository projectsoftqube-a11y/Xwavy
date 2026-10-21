import type { PageCopy } from "@/i18n/page-copy";

/**
 * For investors (SOW §3.3: "curated deal flow, advanced filters, and an honest
 * free-against-paid comparison"; §2.3 investor portal; §4.3 journey; §4.4
 * revocation). Verification is optional (clarifications). No quota numbers or
 * prices: not fixed yet.
 */
const en = {
  meta: {
    title: "For investors",
    description:
      "Browse every published idea on Xwavy free. Subscribe to unlock the full picture, advanced filters and introductions that happen only when the innovator says yes.",
  },
  hero: {
    eyebrow: "For investors",
    titleLead: "Browse the pool free.",
    titleAccent: "Subscribe when you want to ask.",
    body: "See every published idea before you pay anything. A subscription unlocks the substance (financials, traction, team and the deck) and the ability to ask for an introduction.",
    primary: "Browse ideas",
    secondary: "See plans",
    points: ["Browse free, at real volume", "Introductions by consent only", "Cancel any time"],
  },
  steps: {
    eyebrow: "How it works for you",
    titleLead: "From browsing to",
    titleAccent: "a warm introduction.",
    stepLabel: "Step",
    of: "of",
    play: "Play steps",
    pause: "Pause steps",
    items: [
      {
        name: "Browse",
        status: "Browsing free",
        title: "See the real pool, free.",
        body: "Every published idea, filtered by sector, stage, region and keyword. Sign up to save ideas and keep private notes.",
      },
      {
        name: "Mandate",
        status: "Mandate saved",
        title: "Say who you are.",
        body: "Your firm, investor type, sector and stage focus, cheque band, geography and a short thesis: exactly what an innovator sees when you ask.",
      },
      {
        name: "Subscribe",
        status: "Full picture unlocked",
        title: "Unlock the full picture.",
        body: "Full narrative, financials, traction, team, deck, exact raise and the innovator’s identity, plus advanced filters, sorting and export.",
      },
      {
        name: "Request",
        status: "Request sent",
        title: "Ask for an introduction.",
        body: "Send a personal note from your monthly quota. If the innovator accepts, you both receive each other’s contact details at the same moment.",
      },
    ],
  },
  compare: {
    eyebrow: "Free or subscribed",
    titleLead: "Look for free.",
    titleAccent: "Pay to ask.",
    description: "An honest comparison. The free tier shows enough to judge whether the pool is worth paying for; a subscription unlocks the substance.",
    cta: "See plans",
  },
  rules: {
    eyebrow: "The rules of asking",
    titleLead: "Fair to both sides,",
    titleAccent: "by design.",
    cards: [
      {
        title: "Asking has a real cost",
        body: "Each request uses one slot from your monthly quota, so requests stay considered. A request that can’t be sent never uses a slot.",
      },
      {
        title: "No reply, slot back",
        body: "If the innovator doesn’t answer within the response window, the request expires, nothing is shared, and the slot is credited back.",
      },
      {
        title: "A decline is final",
        body: "If the innovator declines, nothing is shared in either direction, and you can’t request the same idea again.",
      },
      {
        title: "Optional verification",
        body: "Submit company and identity documents for a verified badge. Our team reviews them by hand, normally within two business days.",
      },
    ],
  },
  cancel: {
    eyebrow: "If you cancel",
    titleLead: "Your connections",
    titleAccent: "stay yours.",
    body: "Cancel any time from your billing page. You return to the free tier, and nothing an innovator agreed to is taken away.",
    keepTitle: "Stays with you",
    keep: [
      "Accepted connections and their contact details",
      "Saved ideas and private notes",
      "Your request history, read-only",
      "Your account, to browse and save free",
    ],
    lockTitle: "Locks again",
    lock: ["New introduction requests", "Full idea detail and innovator identity", "Advanced filters, sorting and export"],
  },
  faq: {
    eyebrow: "Questions",
    titleLead: "For",
    titleAccent: "investors.",
    items: [
      {
        q: "Can I really browse for free?",
        a: "Yes. Every published idea’s summary is public: title, pitch, sector, stage, region, problem statement and ask band. You can filter by sector, stage, region and keyword without paying.",
      },
      {
        q: "What does a subscription unlock?",
        a: "The full narrative, financials, traction, team, pitch deck, exact raise and the innovator’s identity; advanced filters, sorting and CSV export; and introduction requests from a monthly quota.",
      },
      {
        q: "How many introductions can I request?",
        a: "Each plan carries a monthly quota of introduction requests. Plan prices and quotas are announced at launch.",
      },
      {
        q: "Can I contact an innovator directly?",
        a: "No. Contact details are never shown on profiles or ideas. They’re shared only when an innovator accepts your request, and then in both directions at once.",
      },
      {
        q: "What if an innovator doesn’t reply?",
        a: "The request expires at the end of the response window. Nothing is shared, and the slot is credited back to your quota.",
      },
      {
        q: "Does Xwavy take a fee on deals?",
        a: "No. Xwavy introduces people. It holds no funds, brokers no securities and gives no investment advice. The only payment is your subscription.",
      },
    ],
  },
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  meta: {
    title: "للمستثمرين",
    description:
      "تصفّح جميع الأفكار المنشورة على Xwavy مجانًا. واشترك لتطّلع على الصورة الكاملة والفلاتر المتقدمة، ولتطلب تعارفًا لا يتم إلا عندما يوافق المبتكر.",
  },
  hero: {
    eyebrow: "للمستثمرين",
    titleLead: "تصفّح الأفكار مجانًا.",
    titleAccent: "واشترك عندما تريد طلب التعارف.",
    body: "اطّلع على جميع الأفكار المنشورة قبل أن تدفع شيئًا. والاشتراك يفتح لك التفاصيل الجوهرية (البيانات المالية ومؤشرات النمو والفريق والعرض التقديمي) وإمكانية طلب التعارف.",
    primary: "تصفّح الأفكار",
    secondary: "اطّلع على الباقات",
    points: ["تصفّح مجاني وبحجم حقيقي", "لا تعارف إلا بالموافقة", "ألغِ في أي وقت"],
  },
  steps: {
    eyebrow: "كيف تعمل المنصة لك",
    titleLead: "من التصفح",
    titleAccent: "إلى تعارف يرحّب به الطرفان.",
    stepLabel: "الخطوة",
    of: "من",
    play: "تشغيل الخطوات",
    pause: "إيقاف الخطوات مؤقتًا",
    items: [
      {
        name: "التصفح",
        status: "تصفّح مجاني",
        title: "اطّلع على الأفكار الفعلية، مجانًا.",
        body: "جميع الأفكار المنشورة، مع التصفية حسب القطاع والمرحلة والمنطقة والكلمات المفتاحية. وسجّل حسابًا لتحفظ الأفكار وتدوّن ملاحظات خاصة.",
      },
      {
        name: "التوجه الاستثماري",
        status: "حُفظ التوجه الاستثماري",
        title: "عرّف بنفسك.",
        body: "شركتك، ونوع المستثمر، والقطاعات والمراحل التي تركز عليها، وحجم الاستثمار، والنطاق الجغرافي، وأطروحة استثمارية قصيرة: وهذا بالضبط ما يراه المبتكر عندما تطلب التعارف.",
      },
      {
        name: "الاشتراك",
        status: "الصورة الكاملة متاحة",
        title: "افتح الصورة الكاملة.",
        body: "القصة الكاملة والبيانات المالية ومؤشرات النمو والفريق والعرض التقديمي ومبلغ التمويل الدقيق وهوية المبتكر، إلى جانب الفلاتر المتقدمة والترتيب والتصدير.",
      },
      {
        name: "الطلب",
        status: "أُرسل الطلب",
        title: "اطلب التعارف.",
        body: "أرسل رسالة شخصية ضمن حصتك الشهرية. وإذا قبل المبتكر، يحصل كل منكما على بيانات تواصل الآخر في اللحظة نفسها.",
      },
    ],
  },
  compare: {
    eyebrow: "مجاني أم باشتراك",
    titleLead: "اطّلع مجانًا.",
    titleAccent: "وادفع لتطلب التعارف.",
    description: "مقارنة صريحة. يعرض المستوى المجاني ما يكفي لتحكم هل تستحق مجموعة الأفكار الاشتراك، والاشتراك يفتح لك التفاصيل الجوهرية.",
    cta: "اطّلع على الباقات",
  },
  rules: {
    eyebrow: "قواعد طلب التعارف",
    titleLead: "منصفة للطرفين،",
    titleAccent: "منذ التصميم.",
    cards: [
      {
        title: "لطلب التعارف كلفة حقيقية",
        body: "يستهلك كل طلب خانة واحدة من حصتك الشهرية، فتبقى الطلبات مدروسة. أما الطلب الذي يتعذر إرساله فلا يستهلك أي خانة.",
      },
      {
        title: "لا رد؟ تُعاد الخانة",
        body: "إذا لم يرد المبتكر خلال مدة الرد، تنتهي صلاحية الطلب، ولا يُشارك أي شيء، وتُعاد الخانة إلى حصتك.",
      },
      {
        title: "الرفض نهائي",
        body: "إذا رفض المبتكر، لا يُشارك أي شيء في أي اتجاه، ولا يمكنك طلب التعارف للفكرة نفسها مرة أخرى.",
      },
      {
        title: "توثيق اختياري",
        body: "قدّم مستندات الشركة والهوية للحصول على شارة التوثيق. ويراجعها فريقنا يدويًا، عادةً خلال يومَي عمل.",
      },
    ],
  },
  cancel: {
    eyebrow: "إذا ألغيت اشتراكك",
    titleLead: "علاقات التعارف",
    titleAccent: "تبقى لك.",
    body: "ألغِ في أي وقت من صفحة الفوترة. تعود إلى المستوى المجاني، ولا يُسحب منك شيء وافق عليه مبتكر.",
    keepTitle: "يبقى معك",
    keep: [
      "علاقات التعارف المقبولة وبيانات التواصل الخاصة بها",
      "الأفكار المحفوظة والملاحظات الخاصة",
      "سجل طلباتك، للقراءة فقط",
      "حسابك، لتتصفح وتحفظ مجانًا",
    ],
    lockTitle: "يُقفل من جديد",
    lock: ["طلبات التعارف الجديدة", "تفاصيل الأفكار كاملة وهوية المبتكر", "الفلاتر المتقدمة والترتيب والتصدير"],
  },
  faq: {
    eyebrow: "أسئلة",
    titleLead: "إجابات",
    titleAccent: "للمستثمرين.",
    items: [
      {
        q: "هل يمكنني التصفح مجانًا فعلًا؟",
        a: "نعم. الملخص العام لكل فكرة منشورة متاح للجميع: العنوان والنبذة والقطاع والمرحلة والمنطقة وبيان المشكلة ونطاق التمويل المطلوب. ويمكنك التصفية حسب القطاع والمرحلة والمنطقة والكلمات المفتاحية دون أن تدفع.",
      },
      {
        q: "ماذا يفتح الاشتراك؟",
        a: "القصة الكاملة والبيانات المالية ومؤشرات النمو والفريق والعرض التقديمي ومبلغ التمويل الدقيق وهوية المبتكر؛ والفلاتر المتقدمة والترتيب والتصدير بصيغة CSV؛ وطلبات التعارف ضمن حصة شهرية.",
      },
      {
        q: "كم طلب تعارف يمكنني إرساله؟",
        a: "لكل باقة حصة شهرية من طلبات التعارف. وتُعلن أسعار الباقات وحصصها عند الإطلاق.",
      },
      {
        q: "هل يمكنني التواصل مع المبتكر مباشرة؟",
        a: "لا. لا تظهر بيانات التواصل أبدًا في الملفات التعريفية أو الأفكار، ولا تُشارك إلا عندما يقبل المبتكر طلبك، وحينها تُشارك في الاتجاهين معًا.",
      },
      {
        q: "ماذا لو لم يرد المبتكر؟",
        a: "تنتهي صلاحية الطلب بانتهاء مدة الرد. لا يُشارك أي شيء، وتُعاد الخانة إلى حصتك.",
      },
      {
        q: "هل تتقاضى Xwavy رسومًا على الصفقات؟",
        a: "لا. تُعرّف Xwavy الناس ببعضهم فقط؛ فهي لا تحتفظ بأموال، ولا تتوسط في أوراق مالية، ولا تقدم استشارات استثمارية. والمبلغ الوحيد الذي تدفعه هو اشتراكك.",
      },
    ],
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;
