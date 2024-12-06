import { Play, Clock } from 'lucide-react';

const videos = [
  {
    title: 'Understanding the Beatitudes',
    description: 'A deep dive into the teachings of Jesus from the Sermon on the Mount',
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
    duration: '25:30',
    views: '1.2K',
  },
  {
    title: 'Prayer Workshop Series',
    description: 'Learn how to develop a meaningful prayer life',
    thumbnail: 'https://images.unsplash.com/photo-1544764200-d834fd210a23?auto=format&fit=crop&q=80',
    duration: '45:15',
    views: '856',
  },
  {
    title: 'Bible Study Methods',
    description: 'Practical techniques for studying scripture effectively',
    thumbnail: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&q=80',
    duration: '32:45',
    views: '2.1K',
  },
];

export default function Videos() {
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
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
                <p className="text-gray-500 text-sm">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}