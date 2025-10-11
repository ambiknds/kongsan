import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { urlFor } from '../../lib/sanity';

export default function TeachingCard({ teaching }) {
  return (
    <Link to={`/teachings/${teaching.slug.current}`} className="block">
      <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">
        <img
          src={teaching.imageUrl ? urlFor(teaching.imageUrl).width(600).url() : 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80'}
          alt={teaching.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-4 text-white">
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="bg-indigo-600 px-2 py-0.5 rounded-full">{teaching.category}</span>
            <span>•</span>
            <span>{format(new Date(teaching.publishedAt), 'MMM d, yyyy')}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">{teaching.title}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{teaching.description}</p>
          <div className="mt-2 text-sm opacity-75">By {teaching.author}</div>
        </div>
      </div>
    </Link>
  );
}
