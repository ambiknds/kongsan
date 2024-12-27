import { Link } from 'react-router-dom';
import { Message } from '../../types/message';
import { format } from 'date-fns';

interface FeaturedMessageProps {
  message: Message;
}

export default function FeaturedMessage({ message }: FeaturedMessageProps) {
  return (
    <Link to={`/messages/${message.id}`} className="block">
      <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">
        <img
          src={message.imageUrl}
          alt={message.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-4 text-white">
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="bg-indigo-600 px-2 py-0.5 rounded-full">{message.category}</span>
            <span>•</span>
            <span>{format(new Date(message.date), 'MMM d, yyyy')}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">{message.title}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{message.summary}</p>
          <div className="mt-2 text-sm opacity-75">By {message.author}</div>
        </div>
      </div>
    </Link>
  );
}