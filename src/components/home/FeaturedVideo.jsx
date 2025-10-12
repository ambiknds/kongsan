import { Play, Clock } from 'lucide-react';
import { urlFor } from '../../lib/sanity';
import {Link} from 'react-router-dom';

export default function FeaturedVideo({video}) {
  const slug = video.slug?.current || video._id;
  
  return (
    <Link to={`/video/${slug}`} className="block">
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={video.thumbnail ? urlFor(video.thumbnail).width(600).url() : 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'}
          alt={video.title}
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-10 h-10 text-indigo-600" fill="currentColor" />
          </div>
        </div>
        {video.duration && (
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {video.duration}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{video.description}</p>
      </div>
    </div>
    </Link>
  );
}
