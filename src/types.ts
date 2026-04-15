export type Category = "monument" | "restaurant" | "hotel" | "museum" | "bazaar" | "nature" | "modern";
export type City = "Tashkent" | "Samarkand" | "Bukhara" | "Khiva" | "Nukus" | "Shakhrisabz" | "Termez" | "Karakalpakstan" | "Tashkent Region";
export type Language = "en" | "ru" | "uz";

export interface UserProfile {
  uid: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  role: "user" | "admin";
  preferredLanguage?: Language;
  createdAt: any;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  category: Category;
  city: City;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  plovScore?: number;
  bestTime?: string;
}

export interface Review {
  id: string;
  locationId: string;
  uid: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export interface Booking {
  id: string;
  uid: string;
  locationId: string;
  locationName: string;
  date: string;
  time?: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: any;
}

export interface SavedPlace {
  id: string;
  uid: string;
  locationId: string;
  locationName: string;
  category: string;
  savedAt: any;
}

export interface CulturalTip {
  id: string;
  title: string;
  content: string;
  category: "etiquette" | "legal" | "negotiation" | "safety";
}
