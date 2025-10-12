import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../lib/sanity';

export default function VideoPlayer() {
  const { slug } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "video" && slug.current == $slug][0] {
              _id,
            title,
            slug,
            description,
            thumbnail,
            duration,
            videoUrl,
            publishedAt
          }
        `, { slug });
        setVideo(data);
        
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <p className="text-gray-500">Video not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="aspect-w-16 aspect-h-9 mb-8">
        <iframe
          src={video.videoUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{video.title}</h1>
        <p className="text-xl text-gray-600">{video.description}</p>
      </div>
    </div>
  );
}