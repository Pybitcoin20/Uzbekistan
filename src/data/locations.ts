import { Location } from '../types';

export const ALL_LOCATIONS: Location[] = [
  // SAMARKAND
  {
    id: 'registan',
    name: 'Registan Square',
    description: 'The monumental heart of the Silk Road. A majestic intersection of three divine madrasahs—Ulugh Beg, Sher-Dor, and Tilla-Kari—where azure mosaics meet timeless wisdom under the Samarkand sun.',
    category: 'monument',
    city: 'Samarkand',
    lat: 39.6548,
    lng: 66.9757,
    rating: 4.9,
    reviewCount: 15600,
    images: ['https://picsum.photos/seed/registan4k/1920/1080', 'https://picsum.photos/seed/registan2/1920/1080']
  },
  {
    id: 'shah-i-zinda',
    name: 'Shah-i-Zinda Necropolis',
    description: 'The "Tomb of the Living King." An ethereal avenue of cobalt-tiled mausoleums, where every archway whispers secrets of the 14th-century Timurid Renaissance.',
    category: 'monument',
    city: 'Samarkand',
    lat: 39.6631,
    lng: 66.9877,
    rating: 4.9,
    reviewCount: 8900,
    images: ['https://picsum.photos/seed/zinda4k/1920/1080']
  },
  {
    id: 'gur-e-amir',
    name: 'Gur-e-Amir Mausoleum',
    description: 'The final sanctuary of the Great Conqueror, Tamerlane. Its mesmerizing azure fluted dome and jade-inlaid interiors stand as a pinnacle of Persian-Central Asian architectural harmony.',
    category: 'monument',
    city: 'Samarkand',
    lat: 39.6483,
    lng: 66.9697,
    rating: 4.8,
    reviewCount: 7200,
    images: ['https://picsum.photos/seed/amir4k/1920/1080']
  },
  {
    id: 'imam-al-bukhari',
    name: 'Imam Al-Bukhari Complex',
    description: 'A sacred lighthouse of spiritual enlightenment. This masterfully restored complex honors the legacy of the legendary scholar with intricate woodcarvings and serene courtyards.',
    category: 'monument',
    city: 'Samarkand',
    lat: 39.8122,
    lng: 66.9389,
    rating: 4.9,
    reviewCount: 12450,
    images: ['https://picsum.photos/seed/bukhari4k/1920/1080']
  },

  // BUKHARA
  {
    id: 'poi-kalyan',
    name: 'Po-i-Kalyan Complex',
    description: 'Bukhara’s architectural crown jewel. Dominated by the Kalyan Minaret—so magnificent that Genghis Khan himself ordered it spared—it remains a living museum of Islamic devotion.',
    category: 'monument',
    city: 'Bukhara',
    lat: 39.7756,
    lng: 64.4149,
    rating: 4.9,
    reviewCount: 9400,
    images: ['https://picsum.photos/seed/kalyan4k/1920/1080']
  },
  {
    id: 'ark-bukhara',
    name: 'Ark of Bukhara',
    description: 'A colossal earthen fortress that protected the Emirs of Bukhara for over a millennium. Its towering walls encompass a city within a city, steeped in power and intrigue.',
    category: 'monument',
    city: 'Bukhara',
    lat: 39.7778,
    lng: 64.4108,
    rating: 4.7,
    reviewCount: 5600,
    images: ['https://picsum.photos/seed/ark4k/1920/1080']
  },
  {
    id: 'chor-minor',
    name: 'Chor Minor',
    description: 'The "Four Minarets"—a petite yet profound madrasah featuring four blue-capped towers, each echoing a distinct philosophical pillar of the ancient Silk Road.',
    category: 'monument',
    city: 'Bukhara',
    lat: 39.7749,
    lng: 64.4274,
    rating: 4.8,
    reviewCount: 3200,
    images: ['https://picsum.photos/seed/chor4k/1920/1080']
  },

  // KHIVA
  {
    id: 'itchan-kala',
    name: 'Itchan Kala',
    description: 'A living portal to the Middle Ages. Khiva’s walled inner city is an unparalleled open-air museum where history is felt in every narrow alley and sunrise shadow.',
    category: 'monument',
    city: 'Khiva',
    lat: 41.3783,
    lng: 60.3639,
    rating: 4.8,
    reviewCount: 6700,
    images: ['https://picsum.photos/seed/khiva4k/1920/1080']
  },
  {
    id: 'kalta-minor',
    name: 'Kalta Minor Minaret',
    description: 'An unfinished turquoise dream. Clad in vibrant majolica, this stump-like minaret is Khiva’s most recognizable icon, intended to be seen from the far-off deserts.',
    category: 'monument',
    city: 'Khiva',
    lat: 41.3778,
    lng: 60.3594,
    rating: 4.9,
    reviewCount: 4500,
    images: ['https://picsum.photos/seed/kalta4k/1920/1080']
  },

  // TASHKENT
  {
    id: 'chorsu',
    name: 'Chorsu Bazaar',
    description: 'The pulsating heart of the modern capital. Beneath its sprawling azure dome lies a sensory explosion of spices, silk, and the authentic spirit of oriental trade.',
    category: 'bazaar',
    city: 'Tashkent',
    lat: 41.3269,
    lng: 69.2361,
    rating: 4.7,
    reviewCount: 18000,
    images: ['https://picsum.photos/seed/chorsu4k/1920/1080']
  },
  {
    id: 'khazrati-imam',
    name: 'Khazrati Imam Complex',
    description: 'A sanctuary of sacred knowledge, guarding the world’s oldest Quran. A serene landscape of architectural grace and deep spiritual heritage in the heart of Tashkent.',
    category: 'monument',
    city: 'Tashkent',
    lat: 41.3384,
    lng: 69.2401,
    rating: 4.8,
    reviewCount: 5200,
    images: ['https://picsum.photos/seed/imam4k/1920/1080']
  },

  // SHAKHRISABZ
  {
    id: 'ak-saray',
    name: 'Ak-Saray Palace',
    description: 'The colossal ruins of Timur’s "White Palace." Its remaining mosaic-clad pylons testify to an era when art was as vast as the emperor’s ambition.',
    category: 'monument',
    city: 'Shakhrisabz',
    lat: 39.0602,
    lng: 66.8277,
    rating: 4.6,
    reviewCount: 2800,
    images: ['https://picsum.photos/seed/aksaray4k/1920/1080']
  },

  // NATURE
  {
    id: 'chimgan',
    name: 'Chimgan Mountains',
    description: 'The "Uzbek Switzerland." A pristine alpine escape where snow-capped peaks meet verdant valleys, offering an emerald contrast to the silk-road deserts.',
    category: 'nature',
    city: 'Tashkent Region',
    lat: 41.5205,
    lng: 70.0105,
    rating: 4.8,
    reviewCount: 12000,
    images: ['https://picsum.photos/seed/chimgan4k/1920/1080']
  },
  {
    id: 'aral-sea',
    name: 'Muynak Ship Graveyard',
    description: 'A haunting desert of rusted metal and vanished waves. The graveyard of ships stands as a powerful testament to the fragile balance of nature and history.',
    category: 'nature',
    city: 'Karakalpakstan',
    lat: 43.7667,
    lng: 59.0333,
    rating: 4.5,
    reviewCount: 3400,
    images: ['https://picsum.photos/seed/aral4k/1920/1080']
  }
];
