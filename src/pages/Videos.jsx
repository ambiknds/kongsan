import { useState, useEffect } from 'react';
import { Play, Clock } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "video"] | order(publishedAt desc) {
            _id,
            title,
            description,
            thumbnail,
            duration,
            videoUrl,
            publishedAt
          }
        `);
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
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
            Video Teachings
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Watch our collection of inspiring and educational Christian content.
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No videos available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail ? urlFor(video.thumbnail).width(600).url() : 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
