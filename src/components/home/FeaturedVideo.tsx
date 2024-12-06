import { Play, Clock } from 'lucide-react';
import { Video } from '../../types';

interface VideoCardProps {
  video: Video;
}
export default function Videos({video}: VideoCardProps) {
  return (
        <div className="group relative aspect-video rounded-lg">
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
        </div>


  );
}