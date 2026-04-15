import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-samarkand" />
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="bg-transparent text-xs font-medium uppercase tracking-wider focus:outline-none cursor-pointer"
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
        <option value="uz">UZ</option>
        <option value="tr">TR</option>
        <option value="es">ES</option>
        <option value="zh">ZH</option>
        <option value="ar">AR</option>
      </select>
    </div>
  );
}
