import type { PageCopy } from "@/i18n/page-copy";

/**
 * The free-against-paid comparison, shared by For investors and Pricing
 * (SOW §1.1, §2.3, §3.4). `free: true` means available on the free tier;
 * everything is available to subscribers.
 */
const en = {
  featureLabel: "What you get",
  freeLabel: "Free",
  paidLabel: "Subscriber",
  includedLabel: "Included",
  lockedLabel: "Subscribers only",
  rows: [
    { label: "Every published idea", free: true },
    { label: "Title, pitch, sector, stage and region", free: true },
    { label: "Problem statement and ask band", free: true },
    { label: "Filters: sector, stage, region and keyword", free: true },
    { label: "Save ideas and keep private notes", free: true },
    { label: "Full narrative and financials", free: false },
    { label: "Traction, team and pitch deck", free: false },
    { label: "Exact raise and the innovator’s identity", free: false },
    { label: "Advanced filters: traction, revenue band, raise size and recent activity", free: false },
    { label: "Sorting and CSV export", free: false },
    { label: "Introduction requests from a monthly quota", free: false },
  ],
};

/** Arabic: draft, pending Wavy Solutions' approval (clarifications §1.2). Replaced by translation pass. */
const ar: typeof en = {
  featureLabel: "ما تحصل عليه",
  freeLabel: "مجاني",
  paidLabel: "مشترك",
  includedLabel: "متاح",
  lockedLabel: "للمشتركين فقط",
  rows: [
    { label: "جميع الأفكار المنشورة", free: true },
    { label: "العنوان والنبذة والقطاع والمرحلة والمنطقة", free: true },
    { label: "بيان المشكلة ونطاق التمويل المطلوب", free: true },
    { label: "التصفية حسب القطاع والمرحلة والمنطقة والكلمات المفتاحية", free: true },
    { label: "حفظ الأفكار وتدوين ملاحظات خاصة", free: true },
    { label: "القصة الكاملة والبيانات المالية", free: false },
    { label: "مؤشرات النمو والفريق والعرض التقديمي", free: false },
    { label: "مبلغ التمويل الدقيق وهوية المبتكر", free: false },
    { label: "فلاتر متقدمة: مؤشرات النمو ونطاق الإيرادات وحجم التمويل والنشاط الأخير", free: false },
    { label: "الترتيب والتصدير بصيغة CSV", free: false },
    { label: "طلبات تعارف ضمن حصة شهرية", free: false },
  ],
};

export default { en, ar } satisfies PageCopy<typeof en>;
