import type { PageCopy } from "@/i18n/page-copy";

/**
 * Legal hub and the five policies (SOW §2.1, §3.3). These are plain-language
 * DRAFTS written from the Scope of Work and the clarifications, pending legal
 * review. Deliberately absent until counsel supplies them: the operating
 * entity's legal form, governing law, jurisdiction, version numbers and
 * effective dates. The payment provider is not named (clarifications).
 */
export const LEGAL_SLUGS = ["terms", "privacy", "cookies", "acceptable-use", "no-advice-disclaimer"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

type LegalSection = { title: string; body: string[]; points?: string[] };
type LegalDoc = { title: string; summary: string; sections: LegalSection[] };

const en = {
  hub: {
    title: "Legal",
    description: "Xwavy’s terms, privacy policy, cookie policy, acceptable-use policy and no-advice disclaimer, in plain language.",
    eyebrow: "Legal",
    titleLead: "Our policies,",
    titleAccent: "in plain language.",
    body: "How Xwavy works, what we expect from everyone who uses it, and how we handle your information.",

    listTitle: "All policies",
  },
  draftBadge: "Draft – pending legal review",
  draftNote:
    "These documents describe how the platform is designed to work. They are drafts pending legal review and will be finalised, with the operating details, before launch.",
  readLabel: "Read",
  tocLabel: "On this page",
  factLabels: { policies: "Policies", sections: "Sections", minutes: "Minutes to read" },
  otherLabel: "Other policies",
  contactNote: "Questions about these policies? Write to info@xwavy.com.",
  docs: {
    terms: {
      title: "Terms of service",
      summary: "The rules for using Xwavy, including how introduction requests and the monthly quota work.",
      sections: [
        {
          title: "What Xwavy is",
          body: [
            "Xwavy is a marketplace that introduces innovators to investors. It is powered by Wavy Solutions.",
            "Xwavy introduces people. It is not a party to any discussion or agreement between them, and everything after an introduction happens directly between the two parties, off the platform.",
          ],
        },
        {
          title: "Your account",
          body: ["You choose your role, innovator or investor, when you register, and you verify your email address before you can use the portal."],
          points: [
            "Give accurate information and keep it up to date.",
            "Keep your sign-in details secure; you’re responsible for activity on your account.",
            "One person, one account. Don’t register on someone else’s behalf without their authority.",
          ],
        },
        {
          title: "For innovators",
          body: ["Posting ideas, receiving introduction requests and accepting them are free."],
          points: [
            "Every idea is reviewed against our acceptable-use policy before it’s published. The outcome is approved, changes requested or rejected.",
            "A material edit to a published idea goes back to review; the live version stays up until the revision is approved.",
            "You can pause, resume or archive your ideas at any time.",
            "You are responsible for what you post, including any figures, which are shown as reported by you.",
          ],
        },
        {
          title: "For investors and subscriptions",
          body: [
            "Browsing published summaries is free. A subscription unlocks full idea detail, advanced filters, sorting and export, and introduction requests from a monthly quota.",
            "Subscriptions are offered monthly or annually and are billed through a global card payment provider. You can change or cancel your plan from your billing page. If a renewal payment fails, access continues while the payment is retried.",
            "If you cancel, you return to the free tier. Accepted connections, saved ideas, private notes and your request history remain available.",
          ],
        },
        {
          title: "Introduction requests and the quota",
          body: ["Introduction requests to innovators can be sent only by subscribed investors."],
          points: [
            "Each request uses one slot from the monthly quota. A request that can’t be sent does not use a slot.",
            "The innovator may accept or decline, and doesn’t have to give a reason.",
            "A decline is final for that idea and releases nothing, in either direction.",
            "A request that isn’t answered within the response window expires, releases nothing, and its slot is credited back.",
            "When a request is accepted, both sides receive each other’s contact details at the same moment.",
          ],
        },
        {
          title: "Your ideas and intellectual property",
          body: ["You keep ownership of your ideas and of everything you post. Xwavy does not claim ownership of any idea."],
          points: [
            "You confirm that you own what you post, or have the right to share it.",
            "You give Xwavy a non-exclusive, royalty-free permission to display your content on the platform, at the layers described in these terms, for as long as it is listed.",
          ],
        },
        {
          title: "Conduct between members",
          body: [
            "Members agree to deal with each other in good faith. Any discussion, due diligence or agreement after an introduction is solely between the two parties, and Xwavy is not responsible for its outcome.",
          ],
        },
        {
          title: "What Xwavy does not do",
          body: [
            "Xwavy does not take money for investments, hold funds, issue or transfer equity, prepare term sheets or advise either party on whether a deal is a good one. See the no-advice disclaimer.",
          ],
        },
        {
          title: "The platform itself",
          body: [
            "The Xwavy platform, including its design, logo and the content Xwavy creates, is protected by intellectual property laws. Don’t copy or reproduce it without our written permission.",
            "Xwavy is provided as it is. We work to keep it available and accurate, but we don’t guarantee it will be uninterrupted or error-free, and we don’t endorse or verify the ideas, figures or claims members publish.",
            "To the extent the law allows, Xwavy is not liable for indirect or consequential losses arising from use of the platform, including lost profits or lost investment.",
          ],
        },
        {
          title: "Suspension and changes",
          body: [
            "We may suspend or close accounts that breach these terms or the acceptable-use policy, and you can delete your account at any time from your settings. We may update these terms; we’ll give notice of significant changes on the platform, and the current version will always be published on this page.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      summary: "What information we collect, how contact details are protected, and the choices you have.",
      sections: [
        {
          title: "What we collect",
          body: ["We collect only what the platform needs to work."],
          points: [
            "Account details: your name, email address and role.",
            "Your public profile and, for investors, your mandate.",
            "Your private contact block: email, phone, LinkedIn and calendar link.",
            "The ideas you post, and the requests you send or receive.",
            "Subscription status and invoices. Card details are handled by our payment provider and never reach Xwavy’s servers.",
            "Basic usage information, such as de-duplicated idea views, to run and protect the service.",
          ],
        },
        {
          title: "How your contact details are protected",
          body: [
            "Your contact block is stored sealed from the moment you enter it. It is never shown on a profile or an idea, at any tier.",
            "It is released only when an introduction request is accepted, only to that one counterpart, and in both directions at the same moment. A decline or an expired request releases nothing. Your settings show who currently holds your contact details.",
          ],
        },
        {
          title: "How we use information",
          points: [
            "To run your account and show each visitor the layer of an idea they’re entitled to.",
            "To review ideas against the acceptable-use policy.",
            "To process introduction requests and subscriptions.",
            "To send notifications. Messages about decisions that affect you can’t be switched off; everything else is a preference.",
            "To keep the platform secure, including rate limits and abuse detection.",
          ],
          body: [],
        },
        {
          title: "Who we share it with",
          body: [
            "Your contact details go to a counterpart only when you accept, or they accept, an introduction. We use service providers to run the platform, such as payment processing, hosting and email delivery. We do not sell your information.",
          ],
        },
        {
          title: "Keeping information secure",
          body: [
            "We protect your information with industry-standard security measures, and contact details are stored sealed. No way of sending or storing data online is completely secure, so we can’t promise absolute security.",
          ],
        },
        {
          title: "Your choices",
          body: [
            "You can edit your profile and contact block, change notification preferences, and deactivate or delete your account from your settings. You can also ask us to access, correct or delete your personal information, or to restrict or object to how we use it, by writing to info@xwavy.com.",
            "Xwavy is being built with Saudi PDPL requirements in mind. The legal basis for processing and the details of your rights will be completed after legal review.",
          ],
        },
        {
          title: "Links to other websites",
          body: ["The platform may link to other websites. We aren’t responsible for their privacy practices, so please read their policies."],
        },
        {
          title: "Changes to this policy",
          body: ["We may update this policy. We’ll give notice of significant changes on the platform or by email, and the current version will always be published on this page."],
        },
      ],
    },
    cookies: {
      title: "Cookie policy",
      summary: "The small files Xwavy stores in your browser, and how to manage them.",
      sections: [
        {
          title: "What cookies are",
          body: ["Cookies are small files a website stores in your browser so it can remember things between visits."],
        },
        {
          title: "Cookies we use",
          points: [
            "Essential: keeping you signed in and protecting your account. The portal can’t work without these.",
            "Preference: remembering your language choice, for up to one year, so the site opens in the language you picked.",
          ],
          body: [],
        },
        {
          title: "Changes to this list",
          body: ["This draft will list every cookie by name before launch. If we add any non-essential cookies, we’ll list them here first and ask for consent where it’s required."],
        },
        {
          title: "Managing cookies",
          body: ["You can delete or block cookies in your browser settings. Blocking essential cookies will stop you signing in to the portal."],
        },
      ],
    },
    "acceptable-use": {
      title: "Acceptable-use policy",
      summary: "The standard every idea is reviewed against, and the rules for contacting other members.",
      sections: [
        {
          title: "Why this policy exists",
          body: ["A person reviews every idea before it’s published. This policy is the standard they review against, and it applies to everyone on Xwavy."],
        },
        {
          title: "What you may post",
          points: [
            "Genuine ideas and ventures that you are entitled to share.",
            "Accurate information. Figures such as traction and revenue are shown as reported by you.",
            "Content in Arabic or English.",
          ],
          body: [],
        },
        {
          title: "What’s not allowed",
          points: [
            "Illegal products or services, or anything that facilitates them.",
            "Fraudulent, misleading or fabricated claims, including promises of guaranteed returns.",
            "Content you don’t have the right to share, including someone else’s confidential information.",
            "Harassment, hate, adult content or anything that endangers people.",
            "Contact details placed in public fields to get around the sealed contact block.",
            "Spam, duplicate listings or ideas posted only to advertise something else.",
          ],
          body: [],
        },
        {
          title: "Contacting other members",
          points: [
            "Introductions happen only through the introduction request flow.",
            "Introduction requests must be genuine and personal, not mass outreach.",
            "Unusually high request volume with a low acceptance rate may be reviewed.",
            "Don’t use contact details received through an introduction for anything other than that conversation.",
          ],
          body: [],
        },
        {
          title: "How we enforce it",
          body: [
            "Ideas that don’t meet this policy receive changes requested or a rejection with a reason. Published ideas can be taken down after a report. Accounts that break these rules may be suspended or closed.",
            "To report an idea or a member, write to info@xwavy.com.",
          ],
        },
      ],
    },
    "no-advice-disclaimer": {
      title: "No-advice disclaimer",
      summary: "Xwavy is a facilitator: it holds no funds, brokers no securities and gives no investment advice.",
      sections: [
        {
          title: "A facilitator only",
          body: [
            "Xwavy introduces innovators to investors. It is not a broker, an adviser, a fund or an exchange, and it is not a party to any agreement between members.",
          ],
        },
        {
          title: "No funds, no securities",
          body: [
            "Xwavy does not take money for investments, hold funds in escrow, issue or transfer equity, or prepare term sheets. The only payment in the system is an investor’s subscription to Xwavy.",
          ],
        },
        {
          title: "No investment advice",
          body: [
            "Nothing on Xwavy is investment, legal, tax or financial advice, or a recommendation to invest in anything. Our review checks ideas against the acceptable-use policy, not their investment merit.",
            "Information about an idea, including traction and financials, is provided by the innovator and shown as reported by them.",
          ],
        },
        {
          title: "Do your own due diligence",
          body: [
            "Any decision to invest is yours alone. Verify what you’re told, and take independent professional advice before you commit to anything.",
            "An investor verification badge means our team reviewed the documents the investor submitted. It is not an endorsement.",
          ],
        },
      ],
    },
  } satisfies Record<LegalSlug, LegalDoc>,
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  hub: {
    title: "الشؤون القانونية",
    description: "شروط Xwavy وسياسة الخصوصية وسياسة ملفات تعريف الارتباط وسياسة الاستخدام المقبول وإخلاء المسؤولية عن تقديم المشورة، بلغة واضحة.",
    eyebrow: "الشؤون القانونية",
    titleLead: "سياساتنا،",
    titleAccent: "بلغة واضحة.",
    body: "كيف تعمل Xwavy، وما نتوقعه من كل من يستخدمها، وكيف نتعامل مع معلوماتك.",
    listTitle: "جميع السياسات",
  },
  draftBadge: "مسودة – قيد المراجعة القانونية",
  draftNote:
    "تصف هذه المستندات الطريقة التي صُممت المنصة لتعمل بها. وهي مسودات قيد المراجعة القانونية، وستُعتمد صيغتها النهائية، مع التفاصيل التشغيلية، قبل الإطلاق.",
  readLabel: "اقرأ",
  tocLabel: "في هذه الصفحة",
  factLabels: { policies: "السياسات", sections: "الأقسام", minutes: "دقائق للقراءة" },
  otherLabel: "سياسات أخرى",
  contactNote: "لديك أسئلة حول هذه السياسات؟ راسلنا على info@xwavy.com.",
  docs: {
    terms: {
      title: "شروط الخدمة",
      summary: "قواعد استخدام Xwavy، بما في ذلك آلية عمل طلبات التعارف والحصة الشهرية.",
      sections: [
        {
          title: "ما هي Xwavy",
          body: [
            "Xwavy سوق إلكترونية تُعرّف المبتكرين بالمستثمرين، وتعمل بدعم من Wavy Solutions.",
            "تُعرّف Xwavy الأشخاص ببعضهم. وهي ليست طرفًا في أي نقاش أو اتفاق بينهم، وكل ما يلي التعارف يجري مباشرة بين الطرفين، خارج المنصة.",
          ],
        },
        {
          title: "حسابك",
          body: ["تختار دورك، مبتكرًا أو مستثمرًا، عند التسجيل، وتتحقق من عنوان بريدك الإلكتروني قبل أن تتمكن من استخدام البوابة."],
          points: [
            "قدّم معلومات دقيقة وحافظ على تحديثها.",
            "حافظ على أمان بيانات تسجيل الدخول؛ فأنت مسؤول عن النشاط الذي يجري في حسابك.",
            "حساب واحد لكل شخص. ولا تسجّل نيابةً عن شخص آخر دون تفويض منه.",
          ],
        },
        {
          title: "للمبتكرين",
          body: ["نشر الأفكار واستقبال طلبات التعارف وقبولها مجاني."],
          points: [
            "تُراجع كل فكرة وفق سياسة الاستخدام المقبول قبل نشرها. وتكون النتيجة: القبول، أو طلب تعديلات، أو الرفض.",
            "أي تعديل جوهري على فكرة منشورة يعيدها إلى المراجعة، وتبقى النسخة المنشورة حاليًا ظاهرة حتى تُعتمد النسخة المعدّلة.",
            "يمكنك إيقاف أفكارك مؤقتًا أو استئنافها أو أرشفتها في أي وقت.",
            "أنت مسؤول عمّا تنشره، بما في ذلك أي أرقام، إذ تُعرض كما أوردتها أنت.",
          ],
        },
        {
          title: "للمستثمرين والاشتراكات",
          body: [
            "تصفّح الملخصات المنشورة مجاني. ويفتح الاشتراك التفاصيل الكاملة للأفكار، والفلاتر المتقدمة، والترتيب والتصدير، وإمكانية إرسال طلبات التعارف ضمن حصة شهرية.",
            "تُتاح الاشتراكات شهريًا أو سنويًا، وتُحصَّل رسومها عبر مزوّد عالمي لخدمات الدفع بالبطاقات. ويمكنك تغيير باقتك أو إلغاؤها من صفحة الفوترة. وإذا تعذّر سداد دفعة التجديد، يستمر وصولك أثناء إعادة محاولة الدفع.",
            "إذا ألغيت اشتراكك، تعود إلى المستوى المجاني. وتبقى متاحة لك علاقات التعارف المقبولة، والأفكار المحفوظة، والملاحظات الخاصة، وسجل طلباتك.",
          ],
        },
        {
          title: "طلبات التعارف والحصة",
          body: ["لا يرسل طلبات التعارف إلى المبتكرين إلا المستثمرون المشتركون."],
          points: [
            "يستهلك كل طلب خانة واحدة من الحصة الشهرية. والطلب الذي يتعذّر إرساله لا يستهلك أي خانة.",
            "للمبتكر أن يقبل الطلب أو يرفضه، ولا يلزمه ذكر السبب.",
            "الرفض نهائي بالنسبة لتلك الفكرة، ولا يكشف شيئًا لأي من الطرفين.",
            "الطلب الذي لا يُرد عليه خلال مدة الرد تنتهي صلاحيته، ولا يكشف شيئًا، وتُعاد خانته إلى الحصة.",
            "عند قبول الطلب، يتلقى كل طرف بيانات تواصل الطرف الآخر في اللحظة نفسها.",
          ],
        },
        {
          title: "أفكارك وملكيتك الفكرية",
          body: ["تبقى ملكية أفكارك وكل ما تنشره لك. ولا تدّعي Xwavy ملكية أي فكرة."],
          points: [
            "تؤكد أنك تملك ما تنشره، أو أن لديك الحق في مشاركته.",
            "تمنح Xwavy إذنًا غير حصري ودون مقابل لعرض محتواك على المنصة، وفق المستويات الموضحة في هذه الشروط، طوال مدة إدراجه.",
          ],
        },
        {
          title: "التعامل بين الأعضاء",
          body: [
            "يلتزم الأعضاء بالتعامل مع بعضهم بحسن نية. وأي نقاش أو فحص للفرصة أو اتفاق بعد التعارف يكون بين الطرفين وحدهما، ولا تتحمل Xwavy مسؤولية نتيجته.",
          ],
        },
        {
          title: "ما لا تقوم به Xwavy",
          body: [
            "لا تتلقى Xwavy أموالًا للاستثمارات، ولا تحتفظ بأموال، ولا تُصدر حصص ملكية أو تنقلها، ولا تُعدّ مذكرات شروط الاستثمار، ولا تقدم المشورة لأي من الطرفين بشأن ما إذا كانت صفقة ما جيدة. راجع إخلاء المسؤولية عن تقديم المشورة.",
          ],
        },
        {
          title: "المنصة نفسها",
          body: [
            "منصة Xwavy، بما فيها تصميمها وشعارها والمحتوى الذي تنشئه Xwavy، محمية بموجب قوانين الملكية الفكرية. ولا يجوز نسخها أو إعادة إنتاجها دون إذن كتابي منا.",
            "تُقدَّم Xwavy كما هي. ونعمل على إبقائها متاحة ودقيقة، لكننا لا نضمن أن تعمل دون انقطاع أو أخطاء، ولا نتبنى الأفكار أو الأرقام أو الادعاءات التي ينشرها الأعضاء ولا نتحقق منها.",
            "في الحدود التي يسمح بها القانون، لا تتحمل Xwavy المسؤولية عن الخسائر غير المباشرة أو التبعية الناشئة عن استخدام المنصة، بما في ذلك خسارة الأرباح أو خسارة الاستثمار.",
          ],
        },
        {
          title: "تعليق الحسابات والتعديلات",
          body: [
            "يجوز لنا تعليق الحسابات التي تخالف هذه الشروط أو سياسة الاستخدام المقبول أو إغلاقها، ويمكنك حذف حسابك في أي وقت من إعداداتك. ويجوز لنا تحديث هذه الشروط، وسننشر إشعارًا بالتغييرات الجوهرية على المنصة، وستُنشر النسخة السارية دائمًا على هذه الصفحة.",
          ],
        },
      ],
    },
    privacy: {
      title: "سياسة الخصوصية",
      summary: "المعلومات التي نجمعها، وكيف نحمي بيانات التواصل، والخيارات المتاحة لك.",
      sections: [
        {
          title: "ما نجمعه",
          body: ["لا نجمع إلا ما تحتاجه المنصة لتعمل."],
          points: [
            "بيانات الحساب: اسمك وعنوان بريدك الإلكتروني ودورك.",
            "ملفك التعريفي العام، وتوجهك الاستثماري بالنسبة للمستثمرين.",
            "بيانات تواصلك الخاصة: البريد الإلكتروني والهاتف وLinkedIn ورابط التقويم.",
            "الأفكار التي تنشرها، والطلبات التي ترسلها أو تتلقاها.",
            "حالة الاشتراك والفواتير. أما بيانات البطاقة فيتولاها مزوّد خدمات الدفع لدينا، ولا تصل أبدًا إلى خوادم Xwavy.",
            "معلومات استخدام أساسية، مثل مشاهدات الأفكار بعد استبعاد المكرر منها، لتشغيل الخدمة وحمايتها.",
          ],
        },
        {
          title: "كيف نحمي بيانات تواصلك",
          body: [
            "تُحفظ بيانات تواصلك مختومة منذ لحظة إدخالها، ولا تظهر أبدًا في أي ملف تعريفي أو فكرة، في أي مستوى.",
            "ولا تُكشف إلا عند قبول طلب تعارف، ولذلك الطرف الآخر وحده، وللطرفين في اللحظة نفسها. والرفض أو انتهاء صلاحية الطلب لا يكشف شيئًا. وتعرض لك إعداداتك من يملك بيانات تواصلك حاليًا.",
          ],
        },
        {
          title: "كيف نستخدم المعلومات",
          points: [
            "لتشغيل حسابك، ولعرض الطبقة من الفكرة التي يحق لكل زائر الاطلاع عليها.",
            "لمراجعة الأفكار وفق سياسة الاستخدام المقبول.",
            "لمعالجة طلبات التعارف والاشتراكات.",
            "لإرسال الإشعارات. ولا يمكن إيقاف الرسائل المتعلقة بقرارات تخصك؛ أما ما عداها فيخضع لتفضيلاتك.",
            "للحفاظ على أمان المنصة، بما في ذلك حدود معدل الاستخدام ورصد إساءة الاستخدام.",
          ],
          body: [],
        },
        {
          title: "مع من نشاركها",
          body: [
            "لا تصل بيانات تواصلك إلى طرف آخر إلا عند قبول طلب تعارف، سواء قبلته أنت أو قبله هو. ونستعين بمزوّدي خدمات لتشغيل المنصة، مثل معالجة المدفوعات والاستضافة وإرسال البريد الإلكتروني. ولا نبيع معلوماتك.",
          ],
        },
        {
          title: "حماية المعلومات",
          body: [
            "نحمي معلوماتك بإجراءات أمنية متوافقة مع معايير القطاع، وتُحفظ بيانات التواصل مختومة. ولا توجد وسيلة لنقل البيانات أو تخزينها عبر الإنترنت آمنة تمامًا، لذا لا يمكننا ضمان أمان مطلق.",
          ],
        },
        {
          title: "خياراتك",
          body: [
            "يمكنك تعديل ملفك التعريفي وبيانات تواصلك، وتغيير تفضيلات الإشعارات، وإلغاء تفعيل حسابك أو حذفه من إعداداتك. ويمكنك أيضًا أن تطلب منا الاطلاع على معلوماتك الشخصية أو تصحيحها أو حذفها، أو تقييد استخدامنا لها أو الاعتراض عليه، بمراسلتنا على info@xwavy.com.",
            "تُبنى Xwavy مع مراعاة متطلبات نظام حماية البيانات الشخصية السعودي (PDPL). وسيُستكمل الأساس النظامي لمعالجة البيانات وتفاصيل حقوقك بعد المراجعة القانونية.",
          ],
        },
        {
          title: "الروابط إلى مواقع أخرى",
          body: ["قد تتضمن المنصة روابط إلى مواقع أخرى. ولسنا مسؤولين عن ممارسات الخصوصية فيها، لذا يُرجى قراءة سياساتها."],
        },
        {
          title: "التغييرات على هذه السياسة",
          body: ["قد نحدّث هذه السياسة. وسننشر إشعارًا بالتغييرات الجوهرية على المنصة أو عبر البريد الإلكتروني، وستُنشر النسخة السارية دائمًا على هذه الصفحة."],
        },
      ],
    },
    cookies: {
      title: "سياسة ملفات تعريف الارتباط",
      summary: "الملفات الصغيرة التي تخزنها Xwavy في متصفحك، وكيفية إدارتها.",
      sections: [
        {
          title: "ما هي ملفات تعريف الارتباط",
          body: ["ملفات تعريف الارتباط ملفات صغيرة يخزنها الموقع الإلكتروني في متصفحك ليتذكر أمورًا بين زيارة وأخرى."],
        },
        {
          title: "ملفات تعريف الارتباط التي نستخدمها",
          points: [
            "الضرورية: لإبقائك مسجّلًا الدخول وحماية حسابك. ولا يمكن للبوابة أن تعمل بدونها.",
            "التفضيلات: لتذكّر اختيارك للغة، لمدة تصل إلى سنة واحدة، كي يُفتح الموقع باللغة التي اخترتها.",
          ],
          body: [],
        },
        {
          title: "التغييرات على هذه القائمة",
          body: ["ستُدرج هذه المسودة كل ملف تعريف ارتباط باسمه قبل الإطلاق. وإذا أضفنا أي ملفات تعريف ارتباط غير ضرورية، فسندرجها هنا أولًا ونطلب الموافقة حيثما كان ذلك مطلوبًا."],
        },
        {
          title: "إدارة ملفات تعريف الارتباط",
          body: ["يمكنك حذف ملفات تعريف الارتباط أو حظرها من إعدادات متصفحك. وسيمنعك حظر ملفات تعريف الارتباط الضرورية من تسجيل الدخول إلى البوابة."],
        },
      ],
    },
    "acceptable-use": {
      title: "سياسة الاستخدام المقبول",
      summary: "المعيار الذي تُراجع وفقه كل فكرة، وقواعد التواصل مع الأعضاء الآخرين.",
      sections: [
        {
          title: "لماذا وُضعت هذه السياسة",
          body: ["يراجع شخصٌ كل فكرة قبل نشرها. وهذه السياسة هي المعيار الذي تُراجع الأفكار وفقه، وهي تسري على الجميع في Xwavy."],
        },
        {
          title: "ما يجوز لك نشره",
          points: [
            "أفكار ومشاريع حقيقية يحق لك مشاركتها.",
            "معلومات دقيقة. وتُعرض الأرقام، مثل مؤشرات النمو والإيرادات، كما أوردتها أنت.",
            "محتوى باللغة العربية أو الإنجليزية.",
          ],
          body: [],
        },
        {
          title: "ما لا يُسمح به",
          points: [
            "المنتجات أو الخدمات غير المشروعة، أو أي شيء يُيسّرها.",
            "الادعاءات الاحتيالية أو المضللة أو المختلقة، بما في ذلك الوعود بعوائد مضمونة.",
            "المحتوى الذي لا يحق لك مشاركته، بما في ذلك المعلومات السرية الخاصة بغيرك.",
            "التحرش، أو محتوى الكراهية، أو المحتوى المخصص للبالغين، أو أي شيء يعرّض الأشخاص للخطر.",
            "وضع بيانات التواصل في الحقول العامة للالتفاف على بيانات التواصل المختومة.",
            "الرسائل العشوائية، أو الإدراجات المكررة، أو الأفكار المنشورة لمجرد الإعلان عن شيء آخر.",
          ],
          body: [],
        },
        {
          title: "التواصل مع الأعضاء الآخرين",
          points: [
            "لا يتم التعارف إلا عبر مسار طلب التعارف.",
            "يجب أن تكون طلبات التعارف حقيقية وشخصية، لا تواصلًا جماعيًا.",
            "قد تخضع للمراجعة الأعداد المرتفعة على نحو غير معتاد من الطلبات إذا اقترنت بمعدل قبول منخفض.",
            "لا تستخدم بيانات التواصل التي تلقيتها عبر تعارف لأي غرض غير تلك المحادثة.",
          ],
          body: [],
        },
        {
          title: "كيف نطبّقها",
          body: [
            "الأفكار التي لا تستوفي هذه السياسة تتلقى طلب تعديلات أو رفضًا مع ذكر السبب. ويمكن إزالة الأفكار المنشورة بعد تلقي بلاغ. والحسابات التي تخالف هذه القواعد قد تُعلَّق أو تُغلق.",
            "للإبلاغ عن فكرة أو عضو، راسلنا على info@xwavy.com.",
          ],
        },
      ],
    },
    "no-advice-disclaimer": {
      title: "إخلاء المسؤولية عن تقديم المشورة",
      summary: "Xwavy جهة ميسِّرة للتعارف: لا تحتفظ بأي أموال، ولا تتوسط في الأوراق المالية، ولا تقدم أي مشورة استثمارية.",
      sections: [
        {
          title: "جهة ميسِّرة فقط",
          body: [
            "تُعرّف Xwavy المبتكرين بالمستثمرين. وهي ليست وسيطًا ماليًا ولا مستشارًا ولا صندوقًا ولا بورصة، وليست طرفًا في أي اتفاق بين الأعضاء.",
          ],
        },
        {
          title: "لا أموال ولا أوراق مالية",
          body: [
            "لا تتلقى Xwavy أموالًا للاستثمارات، ولا تحتفظ بأموال في حسابات ضمان، ولا تُصدر حصص ملكية أو تنقلها، ولا تُعدّ مذكرات شروط الاستثمار. والدفعة الوحيدة في المنظومة هي اشتراك المستثمر في Xwavy.",
          ],
        },
        {
          title: "لا مشورة استثمارية",
          body: [
            "لا يُعدّ أي محتوى على Xwavy مشورة استثمارية أو قانونية أو ضريبية أو مالية، ولا توصية بالاستثمار في أي شيء. وتتحقق مراجعتنا من مطابقة الأفكار لسياسة الاستخدام المقبول، لا من جدواها الاستثمارية.",
            "المعلومات المتعلقة بأي فكرة، بما فيها مؤشرات النمو والبيانات المالية، يقدمها المبتكر وتُعرض كما أوردها.",
          ],
        },
        {
          title: "أجرِ العناية الواجبة بنفسك",
          body: [
            "أي قرار بالاستثمار هو قرارك وحدك. تحقّق مما يُقال لك، واحصل على مشورة مهنية مستقلة قبل أن تلتزم بأي شيء.",
            "تعني شارة توثيق المستثمر أن فريقنا راجع المستندات التي قدّمها المستثمر. وهي ليست تزكية.",
          ],
        },
      ],
    },
  },
};

export default { en, ar } satisfies PageCopy<typeof en>;

/** Minutes to read a policy, counted from its text at about 200 words a minute. */
export function readingMinutes(doc: { sections: readonly LegalSection[] }) {
  const words = doc.sections
    .flatMap((section) => [section.title, ...section.body, ...(section.points ?? [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
