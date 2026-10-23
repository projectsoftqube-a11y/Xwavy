import type { PageCopy } from "@/i18n/page-copy";

/**
 * Alt text for every photograph on the site, keyed by file name in
 * public/images/site (see docs/image-brief.md). Each image is used in exactly
 * one place. Textures and backgrounds are decorative and have no entry.
 */
const en = {
  homeRolesInnovator: "A young Emirati engineer in a white kandura assembling a hardware prototype at his workbench",
  homeRolesInvestor: "An investor in a white kandura and ghutra at his desk by the window, pen in hand",
  homeStep1: "The founder filling in a step-by-step form on his laptop at night",
  homeStep2: "A reviewer at his desk reading a submission on screen, pen in hand",
  homeStep3: "An investor's hands scrolling a grid of ideas on a tablet, Arabic coffee beside it",
  homeStep4: "The investor about to send an introduction request from his tablet at dusk",
  homeStep5: "The founder smiling at an accepted request on his phone at golden hour",
  hiwHero: "The founder and the investor in a Dubai business lounge at blue hour, catching each other's eye",
  hiwPathInnovator: "The founder walking through a sunlit co-working atrium with his laptop",
  hiwPathInvestor: "The investor reading a tablet in the back of a car at dusk",
  hiwOutcome: "Two phones held side by side, each showing a confirmed contact card",
  fiHero: "The founder sketching ideas on a whiteboard at dusk, the city behind him",
  fiReview: "Two colleagues reviewing a submission together on a laptop at golden hour",
  fiDecision: "A young founder in a white kandura thoughtfully reading a request on his phone at night",
  fiComposer: "Hands typing a step-by-step form on a laptop, a sketch notebook and coffee beside it",
  fvHero: "The investor walking through a sunlit atrium with a tablet in hand",
  fvBrowse: "A senior investor in a white kandura reviewing a grid of ideas on two monitors",
  fvMandate: "An investor writing notes beside a tablet showing his profile",
  fvSubscribe: "A tablet showing an idea in full detail: figures, team and documents",
  fvRequest: "The investor typing a short note on his phone at a terrace café",
  fvCancel: "The founder and the investor shaking hands warmly at golden hour",
  prHero: "A young founder showing a prototype to a senior investor over Arabic coffee",
  prBilling: "A hand holding a phone showing a simple billing page, a card face down beside it",
  abHero: "A host pouring Arabic coffee for a guest in a modern majlis-style lounge at dusk",
  abMission: "Four colleagues gathered around a laptop, laughing together at night",
  ctDesk: "A smiling host at a modern travertine reception desk",
  idHero: "An investor in a white kandura browsing a wall-sized directory of ideas",
};

const ar: typeof en = {
  homeRolesInnovator: "مهندس إماراتي شاب بالكندورة البيضاء يجمّع نموذجًا أوليًا لجهاز على طاولة عمله",
  homeRolesInvestor: "مستثمر بالكندورة البيضاء والغترة على مكتبه بجوار النافذة والقلم في يده",
  homeStep1: "المؤسس يملأ نموذجًا من عدة خطوات على حاسوبه ليلًا",
  homeStep2: "مراجع على مكتبه يقرأ فكرة مقدَّمة على الشاشة والقلم في يده",
  homeStep3: "يدا مستثمر تتصفحان مجموعة من الأفكار على جهاز لوحي وبجانبه القهوة العربية",
  homeStep4: "المستثمر على وشك إرسال طلب تعارف من جهازه اللوحي عند الغروب",
  homeStep5: "المؤسس يبتسم لطلب مقبول على هاتفه وقت الغروب",
  hiwHero: "المؤسس والمستثمر في صالة أعمال في دبي عند الغسق، وتلتقي نظراتهما",
  hiwPathInnovator: "المؤسس يمشي في ردهة مساحة عمل مشتركة مشمسة ومعه حاسوبه",
  hiwPathInvestor: "المستثمر يقرأ على جهاز لوحي في المقعد الخلفي لسيارة عند الغروب",
  hiwOutcome: "هاتفان متجاوران يعرض كل منهما بطاقة تواصل مؤكدة",
  fiHero: "المؤسس يرسم أفكاره على لوح أبيض عند الغسق والمدينة خلفه",
  fiReview: "زميلان يراجعان فكرة مقدَّمة معًا على حاسوب وقت الغروب",
  fiDecision: "مؤسس شاب بالكندورة البيضاء يقرأ طلبًا على هاتفه بتأنٍّ ليلًا",
  fiComposer: "يدان تكتبان نموذجًا من عدة خطوات على حاسوب، وبجانبه دفتر رسومات وقهوة",
  fvHero: "المستثمر يمشي في ردهة مشمسة وفي يده جهاز لوحي",
  fvBrowse: "مستثمر كبير بالكندورة البيضاء يراجع مجموعة من الأفكار على شاشتين",
  fvMandate: "مستثمر يدوّن ملاحظاته بجوار جهاز لوحي يعرض ملفه",
  fvSubscribe: "جهاز لوحي يعرض تفاصيل فكرة كاملة: الأرقام والفريق والمستندات",
  fvRequest: "المستثمر يكتب رسالة قصيرة على هاتفه في مقهى على شرفة",
  fvCancel: "المؤسس والمستثمر يتصافحان بحرارة وقت الغروب",
  prHero: "مؤسس شاب يعرض نموذجًا أوليًا على مستثمر كبير على فنجان قهوة عربية",
  prBilling: "يد تمسك هاتفًا يعرض صفحة فوترة بسيطة، وبجانبه بطاقة مقلوبة",
  abHero: "مضيف يصب القهوة العربية لضيفه في مجلس عصري عند الغسق",
  abMission: "أربعة زملاء حول حاسوب يضحكون معًا ليلًا",
  ctDesk: "موظف استقبال مبتسم خلف مكتب استقبال عصري من الترافرتين",
  idHero: "مستثمر بالكندورة البيضاء يتصفح دليل أفكار على شاشة جدارية كبيرة",
};

export default { en, ar } satisfies PageCopy<typeof en>;
