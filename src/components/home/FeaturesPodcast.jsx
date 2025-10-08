import { Headphones, Clock, Calendar } from 'lucide-react';
import { urlFor } from '../../lib/sanity';

export default function FeaturedPodcast({podcast}) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={podcast.imageUrl ? urlFor(podcast.imageUrl).width(400).url() : 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80'}
          alt={podcast.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {podcast.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{podcast.description}</p>
        <div className="flex items-center text-xs text-gray-500 gap-3 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(podcast.publishedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {podcast.duration}
          </span>
        </div>
        <button className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors">
          <Headphones className="w-4 h-4" />
          Listen Now
        </button>
      </div>
    </div>
  );
}
