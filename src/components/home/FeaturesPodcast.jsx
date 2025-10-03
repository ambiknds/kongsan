import { Headphones, Clock, Calendar } from 'lucide-react';

export default function FeaturedPodcast({podcast}) {
  return (
    <div className="group relative ">
      <div
        className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={podcast.imageUrl}
          alt={podcast.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {podcast.title}
          </h3>
          <p className="text-gray-600 mb-4">{podcast.description}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(podcast.date).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {podcast.duration}
            </span>
          </div>
          <button className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500">
            <Headphones className="w-5 h-5 mr-2" />
            Listen Now
          </button>
        </div>
      </div>
    </div>
  );
}
