import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Map as MapIcon, Maximize2, Layers, Navigation, Info, Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const center = {
  lat: 41.3111,
  lng: 69.2401
};

const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

const locations = [
  { id: 1, name: 'Registan Square', category: 'Architectural Gems', pos: { lat: 39.6547, lng: 66.9757 }, info: 'The heart of ancient Samarkand.' },
  { id: 2, name: 'Itchan Kala', category: 'Architectural Gems', pos: { lat: 41.3783, lng: 60.3603 }, info: 'The inner fortress of Old Khiva.' },
  { id: 3, name: 'Po-i-Kalyan', category: 'Architectural Gems', pos: { lat: 39.7758, lng: 64.4150 }, info: 'Religious complex in Bukhara.' },
  { id: 4, name: 'Central Plov Center', category: 'Traditional Tastes', pos: { lat: 41.3400, lng: 69.2800 }, info: 'The legendary taste of Tashkent.' },
];

export default function ExploreMap() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<typeof locations[0] | null>(null);
  const [filter, setFilter] = useState('All');
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // @ts-ignore
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const filteredLocations = useMemo(() => {
    if (filter === 'All') return locations;
    return locations.filter(loc => loc.category.includes(filter) || (filter === 'Food' && loc.category === 'Traditional Tastes'));
  }, [filter]);

  const mapOptions = useMemo(() => ({
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  }), []);

  return (
    <section id="explore" className="py-24 bg-slate-50 dark:bg-[#0B1220]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <MapIcon className="w-4 h-4" />
              {t('nearby')}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold dark:text-slate-50">
              Interactive <span className="text-blue-600 italic">Heritage</span> Discovery
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl font-light">
              Navigate through a millennium of history. Every pin reveals a story, every coordinate a legacy.
            </p>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="glass p-1 rounded-2xl flex border-white/20">
              {['Map', 'Satellite'].map(mode => (
                <button key={mode} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'Map' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'}`}>
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[650px] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 border-[12px] border-white dark:border-[#111827]">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={6}
              options={mapOptions}
            >
              {filteredLocations.map(loc => (
                <Marker
                  key={loc.id}
                  position={loc.pos}
                  onClick={() => setSelected(loc)}
                  icon={{
                    url: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                    scaledSize: new google.maps.Size(32, 32)
                  }}
                />
              ))}

              {selected && (
                <InfoWindow
                  position={selected.pos}
                  onCloseClick={() => setSelected(null)}
                >
                  <div className="p-2 min-w-[200px]">
                    <h4 className="font-bold text-gray-900">{selected.name}</h4>
                    <p className="text-xs text-gray-600 mt-1 italic">{selected.category}</p>
                    <p className="text-xs text-gray-500 mt-2">{selected.info}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="absolute inset-0 bg-blue-50 dark:bg-[#111827] flex items-center justify-center">
              <div className="absolute inset-0 uzbek-pattern opacity-20" />
              <div className="relative z-10 text-center px-6">
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Navigation className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 dark:text-slate-50">Loading Cartography...</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-light">
                  Aligning stars and maps for your journey through time.
                </p>
              </div>
            </div>
          )}

          {/* Map Overlay Controls */}
          <div className="absolute top-8 left-8 flex items-center gap-4">
            <div className="glass p-2 rounded-2xl flex items-center gap-3 border-white/20 shadow-xl">
              <SearchIcon className="w-4 h-4 text-slate-400 ml-2" />
              <input 
                type="text" 
                placeholder="Search location..." 
                className="bg-transparent text-sm font-medium outline-none dark:text-white w-48"
              />
            </div>
          </div>

          <div className="absolute top-8 right-8 flex flex-col gap-3">
            {[Maximize2, Layers, Navigation].map((Icon, i) => (
              <button key={i} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-all shadow-xl group">
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>

          {/* Floating Category Filter */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 glass px-10 py-5 rounded-[2rem] flex items-center gap-10 shadow-3xl border-white/20">
            {['All', 'Monuments', 'Food', 'Hotels'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${filter === cat ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Legend / Info Card */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute bottom-10 right-10 w-80 glass p-6 rounded-[2.5rem] border-white/20 shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                    <Info className="w-6 h-6" />
                  </div>
                  <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h4 className="text-xl font-serif font-bold dark:text-white mb-1">{selected.name}</h4>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">{selected.category}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-6">
                  {selected.info}
                </p>
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors">
                  View Story Detail
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
