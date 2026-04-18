import { ALL_LOCATIONS } from '../data/locations';
import { Category, Location } from '../types';

export const LocationsService = {
  getAll: (): Location[] => {
    return ALL_LOCATIONS;
  },

  getByCity: (city: string): Location[] => {
    if (city === 'All') return ALL_LOCATIONS;
    return ALL_LOCATIONS.filter(loc => loc.city.toLowerCase() === city.toLowerCase());
  },

  getByCategory: (category: Category | 'all'): Location[] => {
    if (category === 'all') return ALL_LOCATIONS;
    return ALL_LOCATIONS.filter(loc => loc.category === category);
  },

  search: (query: string): Location[] => {
    const q = query.toLowerCase();
    return ALL_LOCATIONS.filter(loc => 
      loc.name.toLowerCase().includes(q) || 
      loc.city.toLowerCase().includes(q) || 
      loc.description.toLowerCase().includes(q)
    );
  },

  getPracticalInfo: (locationId: string) => {
    // In a real app, this would fetch from a database
    // For now, we return mock practical info
    return {
      entranceFee: "50,000 UZS",
      openingHours: "09:00 AM - 07:00 PM",
      transport: "Taxi, Tram, or Metro (Tashkent)",
      bestTime: "Late afternoon for photography"
    };
  }
};
