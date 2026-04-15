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
