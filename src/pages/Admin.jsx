import { useState } from 'react';
import { Upload } from 'lucide-react';
import { client } from '../lib/sanity';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('video');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    duration: '',
    videoUrl: '',
    thumbnail: null
  });

  const [podcastData, setPodcastData] = useState({
    title: '',
    description: '',
    duration: '',
    audioUrl: '',
    imageUrl: null
  });

  const [teachingData, setTeachingData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Grace',
    author: '',
    imageUrl: null
  });

  const handleImageUpload = async (file, dataType) => {
    try {
      const asset = await client.assets.upload('image', file, {
        filename: file.name
      });
      return asset._id;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let thumbnailId = null;
      if (videoData.thumbnail) {
        thumbnailId = await handleImageUpload(videoData.thumbnail, 'video');
      }

      await client.create({
        _type: 'video',
        title: videoData.title,
        description: videoData.description,
        duration: videoData.duration,
        videoUrl: videoData.videoUrl,
        thumbnail: thumbnailId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: thumbnailId
          }
        } : undefined,
        publishedAt: new Date().toISOString()
      });

      setMessage({ type: 'success', text: 'Video uploaded successfully!' });
      setVideoData({ title: '', description: '', duration: '', videoUrl: '', thumbnail: null });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload video. Please try again.' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePodcastSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageId = null;
      if (podcastData.imageUrl) {
        imageId = await handleImageUpload(podcastData.imageUrl, 'podcast');
      }

      await client.create({
        _type: 'podcast',
        title: podcastData.title,
        description: podcastData.description,
        duration: podcastData.duration,
        audioUrl: podcastData.audioUrl,
        imageUrl: imageId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageId
          }
        } : undefined,
        publishedAt: new Date().toISOString()
      });

      setMessage({ type: 'success', text: 'Podcast uploaded successfully!' });
      setPodcastData({ title: '', description: '', duration: '', audioUrl: '', imageUrl: null });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload podcast. Please try again.' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTeachingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageId = null;
      if (teachingData.imageUrl) {
        imageId = await handleImageUpload(teachingData.imageUrl, 'teaching');
      }

      await client.create({
        _type: 'teaching',
        title: teachingData.title,
        description: teachingData.description,
        content: teachingData.content,
        category: teachingData.category,
        author: teachingData.author,
        imageUrl: imageId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageId
          }
        } : undefined,
        publishedAt: new Date().toISOString()
      });

      setMessage({ type: 'success', text: 'Teaching uploaded successfully!' });
      setTeachingData({ title: '', description: '', content: '', category: 'Grace', author: '', imageUrl: null });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload teaching. Please try again.' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="mt-2 text-gray-600">Upload videos, podcasts, and teachings</p>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('video')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'video'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveTab('podcast')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'podcast'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Podcasts
              </button>
              <button
                onClick={() => setActiveTab('teaching')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'teaching'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Teachings
              </button>
            </nav>
          </div>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {activeTab === 'video' && (
          <form onSubmit={handleVideoSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={videoData.title}
                onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={3}
                value={videoData.description}
                onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (e.g., 25:30)</label>
              <input
                type="text"
                required
                value={videoData.duration}
                onChange={(e) => setVideoData({ ...videoData, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Video URL</label>
              <input
                type="url"
                required
                value={videoData.videoUrl}
                onChange={(e) => setVideoData({ ...videoData, videoUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setVideoData({ ...videoData, thumbnail: e.target.files[0] })}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {loading ? 'Uploading...' : 'Upload Video'}
            </button>
          </form>
        )}

        {activeTab === 'podcast' && (
          <form onSubmit={handlePodcastSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={podcastData.title}
                onChange={(e) => setPodcastData({ ...podcastData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={3}
                value={podcastData.description}
                onChange={(e) => setPodcastData({ ...podcastData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (e.g., 35:20)</label>
              <input
                type="text"
                required
                value={podcastData.duration}
                onChange={(e) => setPodcastData({ ...podcastData, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Audio URL</label>
              <input
                type="url"
                required
                value={podcastData.audioUrl}
                onChange={(e) => setPodcastData({ ...podcastData, audioUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPodcastData({ ...podcastData, imageUrl: e.target.files[0] })}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {loading ? 'Uploading...' : 'Upload Podcast'}
            </button>
          </form>
        )}

        {activeTab === 'teaching' && (
          <form onSubmit={handleTeachingSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={teachingData.title}
                onChange={(e) => setTeachingData({ ...teachingData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={3}
                value={teachingData.description}
                onChange={(e) => setTeachingData({ ...teachingData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                required
                rows={8}
                value={teachingData.content}
                onChange={(e) => setTeachingData({ ...teachingData, content: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                required
                value={teachingData.category}
                onChange={(e) => setTeachingData({ ...teachingData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Grace">Grace</option>
                <option value="Faith">Faith</option>
                <option value="Prayer">Prayer</option>
                <option value="Worship">Worship</option>
                <option value="Purpose">Purpose</option>
                <option value="Spiritual Growth">Spiritual Growth</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                required
                value={teachingData.author}
                onChange={(e) => setTeachingData({ ...teachingData, author: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setTeachingData({ ...teachingData, imageUrl: e.target.files[0] })}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {loading ? 'Uploading...' : 'Upload Teaching'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
