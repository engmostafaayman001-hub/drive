export type Language = 'en' | 'ar';

type Dictionary = {
  direction: 'ltr' | 'rtl';
  labels: {
    dashboard: string;
    batches: string;
    login: string;
    register: string;
    logout: string;
    language: string;
    theme: string;
    search: string;
    empty: string;
    loadError: string;
    loading: string;
  };
};

export const dictionaries: Record<Language, Dictionary> = {
  en: {
    direction: 'ltr',
    labels: {
      dashboard: 'Dashboard',
      batches: 'Batches',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      language: 'العربية',
      theme: 'Toggle theme',
      search: 'Search products',
      empty: 'No data available',
      loadError: 'Unable to load data',
      loading: 'Loading...'
    }
  },
  ar: {
    direction: 'rtl',
    labels: {
      dashboard: 'لوحة التحكم',
      batches: 'الدفعات',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      language: 'English',
      theme: 'تبديل الوضع',
      search: 'ابحث عن المنتجات',
      empty: 'لا توجد بيانات',
      loadError: 'تعذر تحميل البيانات',
      loading: 'جاري التحميل...'
    }
  }
};

export function normalizeSearchQuery(value: string): string {
  return value.trim().toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '');
}
