import type { PageCopy } from "@/i18n/page-copy";

/**
 * How it works. Source: Scope of Work v1.0 (§1, §2, §3.2–3.7, §4.2–4.5) and
 * the clarifications of 16 Sep 2026. No invented timings: moderation has no
 * published turnaround; the response window length is not stated here.
 */
const en = {
  meta: {
    title: "How it works",
    description:
      "How Xwavy turns a published idea into an introduction: innovators post free, investors subscribe to ask, and contact details move only when both sides say yes.",
  },
  hero: {
    eyebrow: "How Xwavy works",
    titleLead: "How an idea becomes",
    titleAccent: "an introduction.",
    body: "Innovators post free and stay in control. Investors browse free and subscribe to ask. Contact details move only when both sides say yes, and Xwavy never touches the money.",
    primary: "Post your idea, free",
    secondary: "I invest",
  },
  tracks: {
    eyebrow: "Two paths, one meeting point",
    titleLead: "Each side takes three steps.",
    titleAccent: "Then they meet.",
    innovator: {
      label: "Innovator",
      steps: [
        { title: "Post free", body: "Write your idea up in five short steps. It saves after each one." },
        { title: "Get reviewed", body: "A person reads it before it goes live, and tells you the outcome." },
        { title: "Accept or decline", body: "When an investor asks, you decide. No reason needed." },
      ],
    },
    investor: {
      label: "Investor",
      steps: [
        { title: "Browse free", body: "See every published idea and filter by sector, stage and region." },
        { title: "Subscribe", body: "Unlock the full detail, advanced filters and the ability to ask." },
        { title: "Request an introduction", body: "Send a short personal note from your monthly quota." },
      ],
    },
    meeting: {
      title: "Introduced",
      body: "Both sides said yes. Contact details are revealed to both, at once.",
    },
  },
  simulator: {
    eyebrow: "The double opt-in",
    titleLead: "Two yeses before any",
    titleAccent: "contact detail moves.",
    body: "An investor sends a request with a short personal note. The innovator sees who is asking, but not how to reach them. Then one of three things happens.",
    choose: "What does the innovator do?",
    accept: "Accept",
    decline: "Decline",
    silence: "No reply",
    outcomes: {
      accept: {
        title: "Introduced.",
        body: "Both contact blocks are revealed in the same moment: the investor gets the innovator's, and the innovator gets the investor's. The conversation moves to email or a call.",
        quota: "The request used one slot from the investor's monthly quota.",
      },
      decline: {
        title: "Nothing is shared.",
        body: "Neither side receives the other's details, permanently. The innovator doesn't give a reason, and the investor can't send another request for this idea.",
        quota: "The request still used its slot: asking has a real cost.",
      },
      silence: {
        title: "The request expires.",
        body: "If the innovator doesn't answer within the response window, the request expires and nothing is shared.",
        quota: "The slot is credited back to the investor's quota.",
      },
    },
  },
  lifecycle: {
    eyebrow: "The life of an idea",
    titleLead: "Eight states.",
    titleAccent: "Nothing gets lost.",
    body: "Every idea is always in exactly one of these states, and each one says who can move it on.",
    whoLabel: "Who moves it",
    pickLabel: "Choose a state",
    states: [
      { name: "Draft", body: "Private and saved after every step. Never indexed, freely editable, and not in anyone's queue until you submit it.", who: "Innovator" },
      { name: "In review", body: "Submitted and locked while a reviewer reads it, so nothing changes underneath them.", who: "Xwavy team" },
      { name: "Changes requested", body: "Reviewed but not approved yet, with written feedback. Edit and resubmit as often as you need.", who: "Innovator" },
      { name: "Rejected", body: "Breaches the acceptable-use policy. Never indexed, but you can rewrite it and submit again.", who: "Innovator" },
      { name: "Published", body: "The public summary is live and searchable. Your contact details stay sealed.", who: "Innovator or Xwavy team" },
      { name: "Paused", body: "Hidden from discovery and closed to new requests. Resume any time, with no new review.", who: "Innovator" },
      { name: "Archived", body: "Read-only and delisted, but kept. Relisting sends it back to review.", who: "Innovator or Xwavy team" },
      { name: "Removed", body: "Taken down by the Xwavy team after a report. Kept only for the record.", who: "Xwavy team" },
    ],
    editNote: "A material edit to a published idea goes back to review. The live version stays up until the new one is approved.",
  },
  layers: {
    eyebrow: "Who sees what",
    titleLead: "Three layers.",
    titleAccent: "One rule for each.",
    viewLabel: "See it as",
    viewers: ["Anyone", "A subscriber", "After both say yes"],
    visibleLabel: "Visible",
    lockedLabel: "Locked",
    description: "The server decides what each visitor receives. Withheld details are never sent to the browser, so they can't be uncovered.",
    cards: [
      {
        kicker: "Public · anyone",
        title: "The summary.",
        body: "What makes an idea findable, and enough for an investor to judge whether the pool is worth paying for.",
        points: ["Title and one-line pitch", "Sector, stage and region", "Problem statement", "Ask band, not the exact raise"],
      },
      {
        kicker: "Subscribers",
        title: "The substance.",
        body: "What a subscription unlocks, together with advanced filters, sorting, export and the ability to ask.",
        points: ["Full narrative and financials", "Traction and team", "Pitch deck and exact raise", "The innovator's identity"],
      },
      {
        kicker: "Private · until both say yes",
        title: "The contact block.",
        body: "Email, phone, LinkedIn and calendar link. Stored sealed from the moment it's entered, never shown on a profile, and released only on acceptance.",
        points: ["Never public, at any tier", "Released to both sides at once", "A decline releases nothing"],
      },
    ],
  },
  facilitator: {
    eyebrow: "Our role",
    parts: [
      { text: "Xwavy introduces people. " },
      { text: "That's all it does.", accent: true },
      { text: " It holds no funds, brokers no securities and gives no investment advice. Everything after the introduction happens between the two of you." },
    ],
    footnote: "The only money in the system is an investor's subscription to Xwavy.",
  },
  faq: {
    eyebrow: "Questions",
    titleLead: "How it works,",
    titleAccent: "in detail.",
    items: [
      { q: "How long does review take?", a: "A member of our team reviews every idea before it goes live. You're notified of the outcome in the portal and by email, and you can follow every review pass on the idea's feedback page." },
      { q: "Can I edit my idea after it's published?", a: "Yes. A material edit sends it back to review, and your current version stays live until the new one is approved. Pausing and resuming don't need a new review." },
      { q: "Can an investor contact me without a request?", a: "No. Your contact details are never shown on your profile or idea. The only way an investor reaches you is an introduction request, which you can accept or decline." },
      { q: "What if I don't answer a request?", a: "It expires at the end of the response window. Nothing is shared, and the investor's request is credited back to their quota." },
      { q: "Can an investor ask again after I decline?", a: "No. A decline is final for that idea, and it releases nothing in either direction." },
      { q: "Do investors have to be verified?", a: "No, verification is optional. Investors can submit company and identity documents for a verified badge; our team reviews them manually, which normally takes two business days. Some sensitive features may need it." },
      { q: "Which languages can I use?", a: "Arabic or English. The whole platform is available in both, and you can post in whichever you prefer." },
    ],
  },
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  meta: {
    title: "كيف تعمل المنصة",
    description:
      "كيف تحوّل Xwavy فكرة منشورة إلى تعارف: ينشر المبتكرون مجانًا، ويشترك المستثمرون لطلب التعارف، ولا تنتقل بيانات التواصل إلا عندما يوافق الطرفان.",
  },
  hero: {
    eyebrow: "كيف تعمل Xwavy",
    titleLead: "كيف تتحول الفكرة",
    titleAccent: "إلى تعارف.",
    body: "ينشر المبتكرون مجانًا ويبقون أصحاب القرار. ويتصفح المستثمرون مجانًا ويشتركون لطلب التعارف. ولا تنتقل بيانات التواصل إلا عندما يوافق الطرفان، ولا تتعامل Xwavy مع الأموال إطلاقًا.",
    primary: "انشر فكرتك مجانًا",
    secondary: "أنا مستثمر",
  },
  tracks: {
    eyebrow: "مساران ونقطة لقاء واحدة",
    titleLead: "لكل طرف ثلاث خطوات.",
    titleAccent: "ثم يلتقيان.",
    innovator: {
      label: "المبتكر",
      steps: [
        { title: "انشر مجانًا", body: "اكتب فكرتك في خمس خطوات قصيرة، وتُحفظ بعد كل خطوة." },
        { title: "تُراجَع فكرتك", body: "يقرؤها شخص من فريقنا قبل نشرها، ويبلغك بالنتيجة." },
        { title: "اقبل أو ارفض", body: "عندما يطلب مستثمر التعارف، فالقرار لك، دون الحاجة إلى ذكر السبب." },
      ],
    },
    investor: {
      label: "المستثمر",
      steps: [
        { title: "تصفّح مجانًا", body: "اطّلع على جميع الأفكار المنشورة وصفّها حسب القطاع والمرحلة والمنطقة." },
        { title: "اشترك", body: "افتح التفاصيل الكاملة والفلاتر المتقدمة وإمكانية طلب التعارف." },
        { title: "اطلب التعارف", body: "أرسل رسالة شخصية قصيرة ضمن حصتك الشهرية." },
      ],
    },
    meeting: {
      title: "تم التعارف",
      body: "وافق الطرفان، فتُكشف بيانات التواصل لكليهما في آن واحد.",
    },
  },
  simulator: {
    eyebrow: "الموافقة المزدوجة",
    titleLead: "موافقتان قبل أن تنتقل",
    titleAccent: "أي بيانات تواصل.",
    body: "يرسل المستثمر طلبًا مع رسالة شخصية قصيرة. يرى المبتكر من يطلب التعارف، دون أن يرى كيف يتواصل معه. ثم يحدث أحد ثلاثة أمور.",
    choose: "ماذا يفعل المبتكر؟",
    accept: "قبول",
    decline: "رفض",
    silence: "لا رد",
    outcomes: {
      accept: {
        title: "تم التعارف.",
        body: "تُكشف بيانات التواصل للطرفين في اللحظة نفسها: يحصل المستثمر على بيانات المبتكر، ويحصل المبتكر على بيانات المستثمر. وتنتقل المحادثة إلى البريد الإلكتروني أو مكالمة.",
        quota: "استهلك الطلب خانة واحدة من الحصة الشهرية للمستثمر.",
      },
      decline: {
        title: "لا يُشارك أي شيء.",
        body: "لا يحصل أي طرف على بيانات الآخر، وبشكل دائم. لا يذكر المبتكر سببًا، ولا يمكن للمستثمر إرسال طلب آخر لهذه الفكرة.",
        quota: "ومع ذلك استهلك الطلب خانته، فلطلب التعارف كلفة حقيقية.",
      },
      silence: {
        title: "تنتهي صلاحية الطلب.",
        body: "إذا لم يرد المبتكر خلال مدة الرد، تنتهي صلاحية الطلب ولا يُشارك أي شيء.",
        quota: "تُعاد الخانة إلى حصة المستثمر.",
      },
    },
  },
  lifecycle: {
    eyebrow: "دورة حياة الفكرة",
    titleLead: "ثماني حالات.",
    titleAccent: "لا يضيع شيء.",
    body: "تكون كل فكرة دائمًا في حالة واحدة فقط من هذه الحالات، ولكل حالة من يملك نقلها.",
    whoLabel: "من ينقلها",
    pickLabel: "اختر حالة",
    states: [
      { name: "مسودة", body: "خاصة وتُحفظ بعد كل خطوة. لا تظهر في محركات البحث، ويمكن تعديلها بحرية، ولا تدخل قائمة المراجعة حتى ترسلها.", who: "المبتكر" },
      { name: "قيد المراجعة", body: "أُرسلت وأُقفلت أثناء قراءة المراجِع لها، كي لا يتغير شيء أثناء المراجعة.", who: "فريق Xwavy" },
      { name: "طلب تعديلات", body: "روجعت ولم تُعتمد بعد، مع ملاحظات مكتوبة. عدّلها وأعد إرسالها كلما احتجت.", who: "المبتكر" },
      { name: "مرفوضة", body: "تخالف سياسة الاستخدام المقبول. لا تظهر في محركات البحث، لكن يمكنك إعادة كتابتها وإرسالها من جديد.", who: "المبتكر" },
      { name: "منشورة", body: "الملخص العام منشور وقابل للبحث، وتبقى بيانات تواصلك مختومة.", who: "المبتكر أو فريق Xwavy" },
      { name: "متوقفة مؤقتًا", body: "مخفية عن التصفح ومغلقة أمام الطلبات الجديدة. استأنفها متى شئت دون مراجعة جديدة.", who: "المبتكر" },
      { name: "مؤرشفة", body: "للقراءة فقط وغير مدرجة، لكنها محفوظة. وإعادة إدراجها تعيدها إلى المراجعة.", who: "المبتكر أو فريق Xwavy" },
      { name: "محذوفة", body: "أزالها فريق Xwavy بعد بلاغ، وتُحفظ للسجل فقط.", who: "فريق Xwavy" },
    ],
    editNote: "أي تعديل جوهري على فكرة منشورة يعيدها إلى المراجعة، وتبقى النسخة الحالية منشورة حتى تُعتمد النسخة الجديدة.",
  },
  layers: {
    eyebrow: "من يرى ماذا",
    titleLead: "ثلاث طبقات.",
    titleAccent: "لكل منها قاعدة واحدة.",
    viewLabel: "اعرضها كما يراها",
    viewers: ["أي زائر", "مشترك", "بعد موافقة الطرفين"],
    visibleLabel: "ظاهرة",
    lockedLabel: "مقفلة",
    description: "يحدد الخادم ما يصل إلى كل زائر. والتفاصيل المحجوبة لا تُرسل إلى المتصفح أبدًا، فلا يمكن كشفها.",
    cards: [
      {
        kicker: "عامة · للجميع",
        title: "الملخص.",
        body: "ما يجعل الفكرة قابلة للعثور عليها، ويكفي المستثمر ليقرر هل تستحق مجموعة الأفكار الاشتراك.",
        points: ["العنوان والنبذة المختصرة", "القطاع والمرحلة والمنطقة", "بيان المشكلة", "نطاق التمويل المطلوب، لا مبلغ التمويل الدقيق"],
      },
      {
        kicker: "للمشتركين",
        title: "الجوهر.",
        body: "ما يفتحه الاشتراك، إلى جانب الفلاتر المتقدمة والترتيب والتصدير وإمكانية طلب التعارف.",
        points: ["القصة الكاملة والبيانات المالية", "مؤشرات النمو والفريق", "العرض التقديمي ومبلغ التمويل الدقيق", "هوية المبتكر"],
      },
      {
        kicker: "خاصة · حتى يوافق الطرفان",
        title: "بيانات التواصل.",
        body: "البريد الإلكتروني والهاتف وLinkedIn ورابط التقويم. تُحفظ مختومة منذ لحظة إدخالها، ولا تظهر في أي ملف تعريفي، ولا تُكشف إلا عند القبول.",
        points: ["ليست عامة أبدًا، في أي مستوى", "تُكشف للطرفين في آن واحد", "الرفض لا يكشف شيئًا"],
      },
    ],
  },
  facilitator: {
    eyebrow: "دورنا",
    parts: [
      { text: "تُعرّف Xwavy الناس ببعضهم. " },
      { text: "وهذا كل ما تفعله.", accent: true },
      { text: " فهي لا تحتفظ بأموال، ولا تتوسط في أوراق مالية، ولا تقدم استشارات استثمارية. وكل ما يلي التعارف يجري بينكما مباشرة." },
    ],
    footnote: "المال الوحيد في المنظومة هو اشتراك المستثمر في Xwavy.",
  },
  faq: {
    eyebrow: "أسئلة",
    titleLead: "كيف تعمل المنصة،",
    titleAccent: "بالتفصيل.",
    items: [
      { q: "كم تستغرق المراجعة؟", a: "يراجع أحد أعضاء فريقنا كل فكرة قبل نشرها. وتصلك النتيجة في البوابة وعبر البريد الإلكتروني، ويمكنك متابعة كل جولة مراجعة في صفحة الملاحظات الخاصة بالفكرة." },
      { q: "هل يمكنني تعديل فكرتي بعد نشرها؟", a: "نعم. التعديل الجوهري يعيدها إلى المراجعة، وتبقى نسختك الحالية منشورة حتى تُعتمد النسخة الجديدة. أما الإيقاف المؤقت والاستئناف فلا يحتاجان إلى مراجعة جديدة." },
      { q: "هل يمكن لمستثمر التواصل معي دون طلب؟", a: "لا. لا تظهر بيانات تواصلك أبدًا في ملفك التعريفي أو في فكرتك. والطريقة الوحيدة لوصول المستثمر إليك هي طلب تعارف، ولك أن تقبله أو ترفضه." },
      { q: "ماذا لو لم أرد على طلب؟", a: "تنتهي صلاحيته بانتهاء مدة الرد. لا يُشارك أي شيء، ويُعاد الطلب إلى حصة المستثمر." },
      { q: "هل يمكن للمستثمر أن يطلب مجددًا بعد رفضي؟", a: "لا. الرفض نهائي بالنسبة لتلك الفكرة، ولا يكشف شيئًا لأي من الطرفين." },
      { q: "هل يجب أن يكون المستثمرون موثّقين؟", a: "لا، التوثيق اختياري. يمكن للمستثمرين تقديم مستندات الشركة والهوية للحصول على شارة التوثيق، ويراجعها فريقنا يدويًا، وتستغرق المراجعة عادةً يومَي عمل. وقد تتطلبه بعض الميزات الحساسة." },
      { q: "ما اللغات التي يمكنني استخدامها؟", a: "العربية أو الإنجليزية. المنصة كاملة متاحة باللغتين، ويمكنك النشر باللغة التي تفضلها." },
    ],
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;
