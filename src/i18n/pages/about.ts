import type { PageCopy } from "@/i18n/page-copy";

/**
 * About (SOW §3.3: "company story, team, mission"; story and model from §1,
 * §1.1, §1.3). No team members are named: none have been supplied. Operator
 * line as in the footer ("Powered by Wavy Solutions").
 */
const en = {
  meta: {
    title: "About",
    description:
      "Xwavy gives innovators and investors one place to meet, on terms both sides agree to. Innovators post free; investors subscribe to ask; contact moves only on mutual consent.",
  },
  hero: {
    eyebrow: "About Xwavy",
    titleLead: "We make the first",
    titleAccent: "conversation happen.",
    body: "Innovators and investors still find each other through luck and warm introductions. Xwavy gives both sides one place to meet, on terms both of them agree to.",
    primary: "Post your idea, free",
    secondary: "Browse ideas",
  },
  story: {
    eyebrow: "Our story",
    parts: [
      { text: "Innovators publish what they’re building. Investors search that pool. " },
      { text: "When both say yes,", accent: true },
      { text: " they’re introduced. Making that first contact happen, fairly, is the whole job." },
    ],
  },
  mission: {
    eyebrow: "Our mission",
    titleLead: "Make introductions",
    titleAccent: "fair to both sides.",
    body: "Charging innovators before a marketplace has grown starves it, so innovators pay nothing, ever. Investors subscribe for what turns browsing into deal flow: the full picture, better tools and the ability to ask.",
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
        title: "A person reads every idea",
        body: "Every submission is reviewed against a published acceptable-use policy before it goes live.",
      },
      {
        title: "Free for the side that builds",
        body: "Innovators never pay to post, to be found or to say yes.",
      },
      {
        title: "A facilitator, not a broker",
        body: "We introduce people. We hold no funds, broker no securities and give no investment advice.",
      },
    ],
  },
  operator: {
    eyebrow: "Who we are",
    parts: [{ text: "Xwavy is " }, { text: "powered by Wavy Solutions.", accent: true }],
    footnote: "Built for Arabic and English from day one. Questions about Xwavy? Write to info@xwavy.com.",
  },
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  meta: {
    title: "من نحن",
    description:
      "تجمع Xwavy المبتكرين والمستثمرين في مكان واحد، وبشروط يتفق عليها الطرفان. ينشر المبتكرون مجانًا، ويشترك المستثمرون لطلب التعارف، ولا يتم التواصل إلا بموافقة الطرفين.",
  },
  hero: {
    eyebrow: "عن Xwavy",
    titleLead: "نفتح الباب",
    titleAccent: "لأول محادثة.",
    body: "ما زال المبتكرون والمستثمرون يلتقون بالصدفة أو عبر المعارف المشتركة. وتمنح Xwavy الطرفين مكانًا واحدًا للقاء، وبشروط يتفق عليها كلاهما.",
    primary: "انشر فكرتك مجانًا",
    secondary: "تصفّح الأفكار",
  },
  story: {
    eyebrow: "قصتنا",
    parts: [
      { text: "ينشر المبتكرون ما يعملون عليه، ويبحث المستثمرون بين هذه الأفكار. " },
      { text: "وعندما يوافق الطرفان،", accent: true },
      { text: " يتم التعارف بينهما. وأن يتم هذا التواصل الأول بإنصاف هو كل ما نعمل من أجله." },
    ],
  },
  mission: {
    eyebrow: "رسالتنا",
    titleLead: "أن يكون التعارف",
    titleAccent: "منصفًا للطرفين.",
    body: "فرض الرسوم على المبتكرين قبل أن تنمو المنصة يخنقها في مهدها، لذلك لا يدفع المبتكرون شيئًا، أبدًا. ويشترك المستثمرون مقابل ما يحوّل التصفح إلى فرص استثمارية حقيقية: الصورة الكاملة، وأدوات أفضل، وإمكانية طلب التعارف.",
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
        title: "شخص من فريقنا يقرأ كل فكرة",
        body: "تُراجع كل فكرة مقدَّمة وفق سياسة الاستخدام المقبول المعلنة قبل نشرها.",
      },
      {
        title: "مجانية لمن يبني",
        body: "لا يدفع المبتكرون شيئًا أبدًا، لا للنشر، ولا ليجدهم المستثمرون، ولا لقبول الطلبات.",
      },
      {
        title: "وسيط تعارف لا وسيط مالي",
        body: "نعرّف الناس ببعضهم. لا نحتفظ بأموال، ولا نتوسط في أوراق مالية، ولا نقدم استشارات استثمارية.",
      },
    ],
  },
  operator: {
    eyebrow: "من نحن",
    parts: [{ text: "تعمل Xwavy " }, { text: "بدعم من Wavy Solutions.", accent: true }],
    footnote: "صُممت باللغتين العربية والإنجليزية منذ اليوم الأول. لديك سؤال عن Xwavy؟ راسلنا على info@xwavy.com.",
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;
