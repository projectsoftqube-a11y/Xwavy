import type { PageCopy } from "@/i18n/page-copy";

/**
 * About (SOW §3.3: "company story, team, mission"; story and model from §1,
 * §1.1, §1.3), in the old xwavy.com voice (story, mission, values). No team
 * members, dates or figures: the old site's were dummy data. Operator line as
 * in the footer ("Powered by Wavy Solutions").
 */
const en = {
  meta: {
    title: "About",
    description:
      "Learn about Xwavy’s mission to connect bold innovators with investors, on terms both sides agree to. Innovators post free; investors subscribe to ask; contact moves only on mutual consent.",
  },
  hero: {
    eyebrow: "About Xwavy",
    titleLead: "We believe every idea",
    titleAccent: "deserves a chance.",
    body: "Innovators and investors still find each other through luck and warm introductions, so too many good ideas never reach the right people. We built the bridge: one place to meet, on terms both sides agree to.",
    primary: "Post your idea, free",
    secondary: "Browse ideas",
  },
  story: {
    eyebrow: "Our story",
    parts: [
      { text: "Xwavy was born from a simple frustration: " },
      { text: "too many brilliant ideas die", accent: true },
      { text: " because their creators can’t find the right investors. Our job is to make that first contact happen, fairly." },
    ],
  },
  mission: {
    eyebrow: "Our mission",
    titleLead: "Democratising access",
    titleAccent: "to investors.",
    body: "The path from idea to investment has always been opaque, exclusive and dependent on who you know. Xwavy changes that with an open marketplace where innovators present their ideas and investors discover opportunities they would never find through traditional channels. Innovators pay nothing, ever; investors subscribe for the full picture, better tools and the ability to ask.",
    innovatorsTitle: "Innovators get",
    innovators: ["Free posting and basic stats", "A person reviewing every idea", "Control over who reaches them"],
    investorsTitle: "Investors get",
    investors: ["The full picture on every idea", "Advanced filters and export", "Warm, consented introductions"],
  },
  principles: {
    eyebrow: "What we stand for",
    titleLead: "Four principles.",
    titleAccent: "No exceptions.",
    cards: [
      {
        title: "Consent before contact",
        body: "Contact details move only when both sides say yes, and then in both directions at once. A decline releases nothing.",
      },
      {
        title: "Human connection",
        body: "Technology facilitates, but people build. A person reads every idea before it goes live, against a published acceptable-use policy.",
      },
      {
        title: "Ideas first",
        body: "Every great company starts with a single idea. No idea is too early or too ambitious to be seen, which is why posting is free, always.",
      },
      {
        title: "Global reach",
        body: "Innovation knows no borders. Xwavy serves innovators and investors worldwide, in Arabic and English, whether you’re a first-time founder in Riyadh or a seasoned entrepreneur in Berlin.",
      },
    ],
  },
  operator: {
    eyebrow: "Who we are",
    parts: [{ text: "Xwavy is " }, { text: "powered by Wavy Solutions.", accent: true }],
    footnote: "Xwavy introduces people: it holds no funds, brokers no securities and gives no investment advice. An innovator with a question, an investor wanting to join or a partner looking to collaborate? Write to info@xwavy.com.",
  },
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  meta: {
    title: "من نحن",
    description:
      "تعرّف على رسالة Xwavy في ربط المبتكرين الطموحين بالمستثمرين، وبشروط يتفق عليها الطرفان. ينشر المبتكرون مجانًا، ويشترك المستثمرون لطلب التعارف، ولا يتم التواصل إلا بموافقة الطرفين.",
  },
  hero: {
    eyebrow: "عن Xwavy",
    titleLead: "نؤمن بأن كل فكرة",
    titleAccent: "تستحق فرصة.",
    body: "ما زال المبتكرون والمستثمرون يلتقون بالصدفة أو عبر المعارف المشتركة، فلا تصل أفكار جيدة كثيرة إلى الأشخاص المناسبين. لذلك بنينا الجسر: مكان واحد للقاء، وبشروط يتفق عليها الطرفان.",
    primary: "انشر فكرتك مجانًا",
    secondary: "تصفّح الأفكار",
  },
  story: {
    eyebrow: "قصتنا",
    parts: [
      { text: "وُلدت Xwavy من إحباط بسيط: " },
      { text: "أفكار رائعة كثيرة تموت", accent: true },
      { text: " لأن أصحابها لا يجدون المستثمرين المناسبين. ومهمتنا أن يتم هذا التواصل الأول، وبإنصاف." },
    ],
  },
  mission: {
    eyebrow: "رسالتنا",
    titleLead: "نجعل الوصول إلى المستثمرين",
    titleAccent: "متاحًا للجميع.",
    body: "لطالما كان الطريق من الفكرة إلى الاستثمار غامضًا ومحصورًا، ويعتمد على من تعرف. وتغيّر Xwavy ذلك بسوق مفتوحة يعرض فيها المبتكرون أفكارهم، ويكتشف فيها المستثمرون فرصًا ما كانوا ليجدوها عبر القنوات التقليدية. لا يدفع المبتكرون شيئًا، أبدًا؛ ويشترك المستثمرون للحصول على الصورة الكاملة وأدوات أفضل وإمكانية طلب التعارف.",
    innovatorsTitle: "ما يحصل عليه المبتكرون",
    innovators: ["نشر مجاني وإحصاءات أساسية", "شخص من فريقنا يراجع كل فكرة", "التحكم في من يصل إليهم"],
    investorsTitle: "ما يحصل عليه المستثمرون",
    investors: ["الصورة الكاملة لكل فكرة", "فلاتر متقدمة وتصدير", "تعارف مباشر بموافقة الطرفين"],
  },
  principles: {
    eyebrow: "ما نلتزم به",
    titleLead: "أربعة مبادئ.",
    titleAccent: "بلا استثناء.",
    cards: [
      {
        title: "الموافقة قبل التواصل",
        body: "لا تنتقل بيانات التواصل إلا عندما يوافق الطرفان، وعندها تنتقل في الاتجاهين في آن واحد. والرفض لا يكشف شيئًا.",
      },
      {
        title: "التواصل الإنساني",
        body: "التقنية تيسّر، لكن الناس هم من يبنون. يقرأ شخص من فريقنا كل فكرة قبل نشرها، وفق سياسة الاستخدام المقبول المعلنة.",
      },
      {
        title: "الأفكار أولًا",
        body: "كل شركة عظيمة تبدأ بفكرة واحدة. ولا توجد فكرة مبكرة جدًا أو طموحة أكثر من اللازم كي تُرى، ولهذا يبقى النشر مجانيًا دائمًا.",
      },
      {
        title: "انتشار عالمي",
        body: "الابتكار لا يعرف حدودًا. تخدم Xwavy المبتكرين والمستثمرين حول العالم، بالعربية والإنجليزية، سواء كنت مؤسسًا لأول مرة في الرياض أو رائد أعمال متمرسًا في برلين.",
      },
    ],
  },
  operator: {
    eyebrow: "من نحن",
    parts: [{ text: "تعمل Xwavy " }, { text: "بدعم من Wavy Solutions.", accent: true }],
    footnote: "تعرّف Xwavy الناس ببعضهم: لا تحتفظ بأموال، ولا تتوسط في أوراق مالية، ولا تقدم استشارات استثمارية. مبتكر لديه سؤال، أو مستثمر يرغب في الانضمام، أو شريك يتطلع إلى التعاون؟ راسلنا على info@xwavy.com.",
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;
