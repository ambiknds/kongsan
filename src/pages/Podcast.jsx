import { useState, useEffect } from 'react';
import { Headphones, Clock, Calendar, Mic } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "podcast"] | order(publishedAt desc) {
            _id,
            title,
            description,
            imageUrl,
            duration,
            audioUrl,
            publishedAt
          }
        `);
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Mic className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Podcast
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Listen to inspiring discussions about faith, life, and spiritual growth
          </p>
        </div>

        {podcasts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Headphones className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No podcasts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((podcast) => (
              <div
                key={podcast._id}
                className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={podcast.imageUrl ? urlFor(podcast.imageUrl).width(600).url() : 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80'}
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
                  <div className="flex items-center text-xs text-gray-500 gap-3 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(podcast.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {podcast.duration}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors group-hover:gap-3">
                    <Headphones className="w-4 h-4" />
                    Listen Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
