import { useState, useEffect } from 'react';
import { Play, Clock, Video as VideoIcon } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import { Link } from 'react-router-dom';

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
            slug,
            description,
            thumbnail,
            duration,
            videoUrl,
            publishedAt
          }
        `);
        setVideos(data);
        console.log(data);
        
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

  const handleVideoClick = (videoUrl) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <VideoIcon className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Video Teachings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our collection of inspiring and educational Christian content
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <VideoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No videos available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Link
                key={video._id}
                to={`/video/${video.slug.current}`}
                className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
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
              </Link>
            ))}
          </div>  
        )}
      </div>
    </div>
  );
}
