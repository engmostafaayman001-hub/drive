export type Language = "en" | "ar";

export const LANGUAGE_STORAGE_KEY = "language";

export const dictionary = {
  en: {
    appName: "Drive Dashboard",
    dashboard: "Dashboard",
    batches: "Batches",
    login: "Login",
    register: "Register",
    logout: "Logout",
    language: "AR",
    theme: "Theme",
    search: "Search",
    englishName: "English Name",
    arabicName: "Arabic Name",
    store: "Store",
    price: "Price",
    directLink: "Direct Link",
    status: "Status",
    verified: "Verified",
    pending: "Pending",
    failed: "Failed",
    loading: "Loading data...",
    empty: "No results found",
    error: "Unable to load results",
    linkNotAvailable: "Link not available"
  },
  ar: {
    appName: "لوحة القيادة",
    dashboard: "الرئيسية",
    batches: "الدفعات",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    language: "EN",
    theme: "المظهر",
    search: "بحث",
    englishName: "الاسم الإنجليزي",
    arabicName: "الاسم العربي",
    store: "المتجر",
    price: "السعر",
    directLink: "الرابط المباشر",
    status: "الحالة",
    verified: "موثق",
    pending: "قيد الانتظار",
    failed: "فشل",
    loading: "جارٍ تحميل البيانات...",
    empty: "لا توجد نتائج",
    error: "تعذر تحميل النتائج",
    linkNotAvailable: "الرابط غير متاح"
  }
} as const;
