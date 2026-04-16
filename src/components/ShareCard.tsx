import React from 'react';
import { motion } from 'motion/react';
import { Share2, Twitter, Facebook, Link as LinkIcon, Download } from 'lucide-react';

interface ShareCardProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: 'trip' | 'plov';
  score?: number;
}

export default function ShareCard({ title, description, image, url, type, score }: ShareCardProps) {
  const handleShare = (platform: string) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Havola nusxalandi!');
    } else {
      window.open((shareUrls as any)[platform], '_blank');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl max-w-sm mx-auto"
    >
      <div className="relative aspect-video">
        <img 
          src={image || `https://picsum.photos/seed/${title}/600/400`} 
          alt={title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 silk-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xs">U</span>
            </div>
            <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Uzbekistan Heritage</span>
          </div>
          <h3 className="text-white font-serif font-bold text-lg leading-tight">{title}</h3>
        </div>
        
        {type === 'plov' && score && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            Plov Score: {score}/10
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{description}</p>
        
        <div className="grid grid-cols-4 gap-3">
          <button 
            onClick={() => handleShare('twitter')}
            className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleShare('facebook')}
            className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center"
          >
            <Facebook className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleShare('copy')}
            className="p-3 bg-gray-50 dark:bg-white/5 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
          <button 
            className="p-3 bg-samarkand/10 text-samarkand rounded-xl hover:bg-samarkand/20 transition-colors flex items-center justify-center"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
