import { Location } from '../types';

export const ALL_LOCATIONS: Location[] = [
  // SAMARKAND
  {
    id: 'registan',
    name: 'Registan Square',
    description: 'The heart of ancient Samarkand, featuring three magnificent madrasahs: Ulugh Beg, Sher-Dor, and Tilla-Kari. A masterpiece of Islamic architecture.',
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
    description: 'The "Tomb of the Living King", a stunning avenue of blue-tiled mausoleums dating back to the 14th-15th centuries.',
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
    description: 'The final resting place of Tamerlane (Amir Timur). Its azure dome and intricate gold interior are legendary.',
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
    description: 'A major pilgrimage site dedicated to the famous Hadith scholar. A symbol of spiritual heritage.',
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
    description: 'The spiritual heart of Bukhara, including the Kalyan Minaret, Kalyan Mosque, and Mir-i-Arab Madrasah.',
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
    description: 'A massive fortress that served as the residence of the Emirs of Bukhara for centuries.',
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
    description: 'A unique madrasah with four distinct towers, each representing a different religious philosophy.',
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
    description: 'The walled inner city of Khiva, an open-air museum preserved exactly as it was in ancient times.',
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
    description: 'The iconic unfinished blue minaret of Khiva, intended to be the tallest in the Islamic world.',
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
    description: 'The vibrant heart of Tashkent. A massive blue-domed market where the Silk Road spirit lives on.',
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
    description: 'The religious center of Tashkent, housing the world\'s oldest Quran (the Uthman Quran).',
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
    description: 'The ruins of Tamerlane\'s summer palace. Even in ruins, its scale and tilework are breathtaking.',
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
    description: 'The "Uzbek Switzerland". A paradise for hikers in summer and skiers in winter.',
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
    description: 'A haunting reminder of the Aral Sea disaster. Rusting ships in the middle of a desert.',
    category: 'nature',
    city: 'Karakalpakstan',
    lat: 43.7667,
    lng: 59.0333,
    rating: 4.5,
    reviewCount: 3400,
    images: ['https://picsum.photos/seed/aral4k/1920/1080']
  }
];
