import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { Location } from '../types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
  location: Location;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

export default function LocationCard({ location, onSave, isSaved }: Props) {
  const { t } = useTranslation();
  const { user, openAuthModal } = useAuth();

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    if (!user) {
      openAuthModal();
      return;
    }
    action();
  };

  const detailsLink = location.id === 'imam-al-bukhari' 
    ? `/locations/imam-al-bukhari` 
    : `/locations/${location.id}`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-white/5"
    >
      <Link to={detailsLink}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={location.images?.[0] || `https://picsum.photos/seed/${location.name}/800/600`}
            alt={location.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={(e) => handleAction(e, () => onSave?.(location.id))}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isSaved ? 'bg-red-500 text-white' : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {t(`categories.${location.category}`)}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link to={detailsLink}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif font-bold text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors dark:text-slate-50">
              {location.name}
            </h3>
            <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 text-blue-600 dark:text-blue-400 fill-current" />
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{location.rating || '4.8'}</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs mb-4">
          <MapPin className="w-3 h-3" />
          <span>{location.city}, Uzbekistan</span>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 font-light leading-relaxed">
          {location.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">Starting from</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">$45</span>
          </div>
          <button 
            onClick={(e) => handleAction(e, () => {
              // Redirect to booking or details
              window.location.href = detailsLink;
            })}
            className="flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all"
          >
            {t('book')}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
