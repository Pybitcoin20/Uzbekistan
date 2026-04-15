import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { Location, Category, City } from '../types';
import { Plus, Edit2, Trash2, Save, X, Upload, MapPin, Star, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Location>>({
    name: '',
    description: '',
    category: 'monument',
    city: 'Samarkand',
    lat: 39.6548,
    lng: 66.9757,
    rating: 4.5,
    reviewCount: 0,
    images: []
  });

  const isAdmin = user?.email === 'crazyaivodeos@gmail.com';

  useEffect(() => {
    if (isAdmin) {
      fetchLocations();
    }
  }, [isAdmin]);

  async function fetchLocations() {
    try {
      const q = query(collection(db, 'locations'), orderBy('name'));
      const snapshot = await getDocs(q);
      const locs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Location));
      setLocations(locs);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      if (isEditing) {
        await updateDoc(doc(db, 'locations', isEditing), formData);
      } else {
        await addDoc(collection(db, 'locations'), {
          ...formData,
          createdAt: new Date()
        });
      }
      resetForm();
      fetchLocations();
    } catch (error) {
      console.error("Error saving location:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!isAdmin || !window.confirm("Are you sure you want to delete this location?")) return;
    try {
      await deleteDoc(doc(db, 'locations', id));
      fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      description: '',
      category: 'monument',
      city: 'Samarkand',
      lat: 39.6548,
      lng: 66.9757,
      rating: 4.5,
      reviewCount: 0,
      images: []
    });
    setIsEditing(null);
  }

  function handleEdit(loc: Location) {
    setFormData(loc);
    setIsEditing(loc.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-500">Only administrators can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-cotton dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-white/40 mt-2">Manage historical sites and attractions</p>
          </div>
          {isEditing && (
            <button 
              onClick={resetForm}
              className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-[2.5rem] sticky top-32 shadow-xl">
              <h2 className="text-xl font-serif font-bold mb-8 flex items-center gap-3 dark:text-white">
                {isEditing ? <Edit2 className="w-5 h-5 text-samarkand" /> : <Plus className="w-5 h-5 text-samarkand" />}
                {isEditing ? 'Edit Location' : 'Add New Location'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-samarkand outline-none transition-all"
                    placeholder="e.g. Registan Square"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">City</label>
                    <select 
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value as City})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 text-sm dark:text-white outline-none"
                    >
                      <option value="Samarkand">Samarkand</option>
                      <option value="Bukhara">Bukhara</option>
                      <option value="Khiva">Khiva</option>
                      <option value="Tashkent">Tashkent</option>
                      <option value="Shakhrisabz">Shakhrisabz</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as Category})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 text-sm dark:text-white outline-none"
                    >
                      <option value="monument">Monument</option>
                      <option value="bazaar">Bazaar</option>
                      <option value="museum">Museum</option>
                      <option value="nature">Nature</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-samarkand outline-none transition-all resize-none"
                    placeholder="Tell the story of this place..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Latitude</label>
                    <input 
                      type="number"
                      step="any"
                      required
                      value={formData.lat}
                      onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 text-sm dark:text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Longitude</label>
                    <input 
                      type="number"
                      step="any"
                      required
                      value={formData.lng}
                      onChange={e => setFormData({...formData, lng: parseFloat(e.target.value)})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 text-sm dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 text-sm dark:text-white outline-none"
                      placeholder="https://..."
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = (e.target as HTMLInputElement).value;
                          if (val) {
                            setFormData({...formData, images: [...(formData.images || []), val]});
                            (e.target as HTMLInputElement).value = '';
                          }
                        }
                      }}
                    />
                    <button 
                      type="button"
                      className="p-3 bg-samarkand text-white rounded-2xl hover:opacity-90 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.images?.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, images: formData.images?.filter((_, idx) => idx !== i)})}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full silk-gradient text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-samarkand/20"
                >
                  <Save className="w-5 h-5" />
                  {isEditing ? 'Update Location' : 'Save Location'}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {loading ? (
                [1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 dark:bg-white/5 animate-pulse rounded-[2.5rem]" />)
              ) : (
                locations.map(loc => (
                  <motion.div 
                    key={loc.id}
                    layout
                    className="glass p-6 rounded-[2.5rem] flex flex-col md:flex-row gap-6 group hover:shadow-xl transition-all"
                  >
                    <div className="w-full md:w-48 aspect-video md:aspect-square rounded-3xl overflow-hidden shrink-0">
                      <img 
                        src={loc.images?.[0] || 'https://picsum.photos/seed/placeholder/400/400'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-serif font-bold dark:text-white">{loc.name}</h3>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleEdit(loc)}
                              className="p-2 rounded-xl bg-samarkand/10 text-samarkand hover:bg-samarkand hover:text-white transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(loc.id)}
                              className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {loc.city}</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-silk fill-current" /> {loc.rating}</span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 uppercase tracking-widest">{loc.category}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-white/40 line-clamp-2 font-light leading-relaxed">
                          {loc.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
