import { useTranslation } from 'react-i18next';
import LocationCard from './LocationCard';
import { Location } from '../types';
import { motion } from 'motion/react';

const LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Registan Square',
    description: 'The heart of the ancient city of Samarkand of the Timurid dynasty, with three madrasahs of distinctive Islamic architecture.',
    category: 'monument',
    city: 'Samarkand',
    lat: 39.6548,
    lng: 66.9757,
    rating: 4.9,
    reviewCount: 1240,
    images: ['https://picsum.photos/seed/registan/800/600']
  },
  {
    id: '2',
    name: 'Itchan Kala',
    description: 'The walled inner town of the city of Khiva, Uzbekistan. Since 1990, it has been protected as a World Heritage Site.',
    category: 'monument',
    city: 'Khiva',
    lat: 41.3783,
    lng: 60.3639,
    rating: 4.8,
    reviewCount: 850,
    images: ['https://picsum.photos/seed/khiva/800/600']
  },
  {
    id: '3',
    name: 'Chorsu Bazaar',
    description: 'The traditional bazaar located in the center of the old town of Tashkent. Under its blue-colored dome, all daily necessities are sold.',
    category: 'bazaar',
    city: 'Tashkent',
    lat: 41.3269,
    lng: 69.2361,
    rating: 4.7,
    reviewCount: 2100,
    images: ['https://picsum.photos/seed/chorsu/800/600']
  }
];

export default function FeaturedLocations() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-cotton">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-samarkand font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-px bg-samarkand" />
              {t('explore')}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Must-Visit <span className="text-samarkand italic">Heritage</span> Sites
            </h2>
          </div>
          <button className="px-8 py-4 rounded-2xl border border-gray-200 font-bold text-sm hover:border-samarkand hover:text-samarkand transition-all">
            View All Places
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOCATIONS.map((loc, index) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <LocationCard location={loc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
