import { Headphones, Clock, Calendar } from 'lucide-react';
import { Podcast } from '../types';

const podcasts: Podcast[] = [
  {
    title: 'Walking with Christ Daily',
    description: 'Practical insights for living out your faith in everyday life',
    date: '2024-03-15',
    duration: '35:20',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80',
  },
  {
    title: 'Understanding Scripture',
    description: 'Deep dive into biblical interpretation and application',
    date: '2024-03-10',
    duration: '42:15',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80',
  },
  {
    title: 'Modern Faith Challenges',
    description: 'Addressing contemporary issues through a biblical lens',
    date: '2024-03-05',
    duration: '28:45',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80',
  },
];

export default function PodcastPage() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Podcast
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Listen to inspiring discussions about faith, life, and spiritual growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {podcasts.map((podcast) => (
            <div
              key={podcast.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
          ))}
        </div>
      </div>
    </div>
  );
}