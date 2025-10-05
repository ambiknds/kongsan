import { useState, useEffect } from 'react';
import { Headphones, Clock, Calendar } from 'lucide-react';
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

        {podcasts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No podcasts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((podcast) => (
              <div
                key={podcast._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={podcast.imageUrl ? urlFor(podcast.imageUrl).width(600).url() : 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80'}
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
                      {new Date(podcast.publishedAt).toLocaleDateString()}
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
        )}
      </div>
    </div>
  );
}
