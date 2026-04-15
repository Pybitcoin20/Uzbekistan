import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Uzbekistan",
      "explore": "Explore Heritage",
      "plov_radar": "Plov Radar",
      "cultural_guide": "Cultural Guide",
      "smart_search": "Smart Search",
      "nearby": "Nearby Places",
      "save": "Save",
      "book": "Book Now",
      "reviews": "Reviews",
      "dos_donts": "Dos & Don'ts",
      "bazaar_tips": "Bazaar Tips",
      "modern_silk_road": "Modern Silk Road",
      "discover_uzbekistan": "Discover the heart of Central Asia",
      "search_placeholder": "Search for monuments, restaurants, hotels...",
      "categories": {
        "monument": "Monuments",
        "restaurant": "Restaurants",
        "hotel": "Hotels",
        "museum": "Museums",
        "bazaar": "Bazaars"
      }
    }
  },
  ru: {
    translation: {
      "welcome": "Добро пожаловать в Узбекистан",
      "explore": "Исследовать наследие",
      "plov_radar": "Плов Радар",
      "cultural_guide": "Культурный гид",
      "smart_search": "Умный поиск",
      "nearby": "Места рядом",
      "save": "Сохранить",
      "book": "Забронировать",
      "reviews": "Отзывы",
      "dos_donts": "Что можно и нельзя",
      "bazaar_tips": "Советы по базару",
      "modern_silk_road": "Современный Шелковый путь",
      "discover_uzbekistan": "Откройте для себя сердце Центральной Азии",
      "search_placeholder": "Поиск памятников, ресторанов, отелей...",
      "categories": {
        "monument": "Памятники",
        "restaurant": "Рестораны",
        "hotel": "Отели",
        "museum": "Музеи",
        "bazaar": "Базары"
      }
    }
  },
  uz: {
    translation: {
      "welcome": "O'zbekistonga xush kelibsiz",
      "explore": "Merosni o'rganish",
      "plov_radar": "Palov Radari",
      "cultural_guide": "Madaniy qo'llanma",
      "smart_search": "Aqlli qidiruv",
      "nearby": "Yaqin atrofdagi joylar",
      "save": "Saqlash",
      "book": "Band qilish",
      "reviews": "Sharhlar",
      "dos_donts": "Mumkin va mumkin emas",
      "bazaar_tips": "Bozor maslahatlari",
      "modern_silk_road": "Zamonaviy Ipak yo'li",
      "discover_uzbekistan": "Markaziy Osiyoning yuragini kashf eting",
      "search_placeholder": "Yodgorliklar, restoranlar, mehmonxonalar qidiruvi...",
      "categories": {
        "monument": "Yodgorliklar",
        "restaurant": "Restoranlar",
        "hotel": "Mehmonxonalar",
        "museum": "Muzeylar",
        "bazaar": "Bozorlar"
      }
    }
  },
  tr: {
    translation: {
      "welcome": "Özbekistan'a Hoş Geldiniz",
      "explore": "Mirası Keşfet",
      "plov_radar": "Pilav Radarı",
      "cultural_guide": "Kültür Rehberi",
      "smart_search": "Akıllı Arama",
      "nearby": "Yakındaki Yerler",
      "save": "Kaydet",
      "book": "Rezervasyon Yap",
      "reviews": "Yorumlar",
      "dos_donts": "Yapılması Gerekenler",
      "bazaar_tips": "Pazar İpuçları",
      "modern_silk_road": "Modern İpek Yolu",
      "discover_uzbekistan": "Orta Asya'nın kalbini keşfedin",
      "search_placeholder": "Anıtlar, restoranlar, oteller ara...",
      "categories": {
        "monument": "Anıtlar",
        "restaurant": "Restoranlar",
        "hotel": "Oteller",
        "museum": "Müzeler",
        "bazaar": "Pazarlar"
      }
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido a Uzbekistán",
      "explore": "Explorar Patrimonio",
      "plov_radar": "Radar de Plov",
      "cultural_guide": "Guía Cultural",
      "smart_search": "Búsqueda Inteligente",
      "nearby": "Lugares Cercanos",
      "save": "Guardar",
      "book": "Reservar Ahora",
      "reviews": "Reseñas",
      "dos_donts": "Qué hacer y qué no",
      "bazaar_tips": "Consejos del Bazar",
      "modern_silk_road": "Moderna Ruta de la Seda",
      "discover_uzbekistan": "Descubre el corazón de Asia Central",
      "search_placeholder": "Buscar monumentos, restaurantes, hoteles...",
      "categories": {
        "monument": "Monumentos",
        "restaurant": "Restaurantes",
        "hotel": "Hoteles",
        "museum": "Museos",
        "bazaar": "Bazares"
      }
    }
  },
  zh: {
    translation: {
      "welcome": "欢迎来到乌兹别克斯坦",
      "explore": "探索遗产",
      "plov_radar": "抓饭雷达",
      "cultural_guide": "文化指南",
      "smart_search": "智能搜索",
      "nearby": "附近地点",
      "save": "保存",
      "book": "立即预订",
      "reviews": "评论",
      "dos_donts": "注意事项",
      "bazaar_tips": "巴扎攻略",
      "modern_silk_road": "现代丝绸之路",
      "discover_uzbekistan": "探索中亚的心脏",
      "search_placeholder": "搜索古迹、餐厅、酒店...",
      "categories": {
        "monument": "古迹",
        "restaurant": "餐厅",
        "hotel": "酒店",
        "museum": "博物馆",
        "bazaar": "巴扎"
      }
    }
  },
  ar: {
    translation: {
      "welcome": "مرحباً بكم في أوزبكستان",
      "explore": "استكشاف التراث",
      "plov_radar": "رادار البلوف",
      "cultural_guide": "الدليل الثقافي",
      "smart_search": "البحث الذكي",
      "nearby": "أماكن قريبة",
      "save": "حفظ",
      "book": "احجز الآن",
      "reviews": "التقييمات",
      "dos_donts": "المسموح والممنوع",
      "bazaar_tips": "نصائح البازار",
      "modern_silk_road": "طريق الحرير الحديث",
      "discover_uzbekistan": "اكتشف قلب آسيا الوسطى",
      "search_placeholder": "ابحث عن المعالم، المطاعم، الفنادق...",
      "categories": {
        "monument": "معالم",
        "restaurant": "مطاعم",
        "hotel": "فنادق",
        "museum": "متاحف",
        "bazaar": "بازارات"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
