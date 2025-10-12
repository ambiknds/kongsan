export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "video" && _id == $id][0] {
            _id,
            title,
            slug,
            description,
            videoUrl
          }
        `, { id });
        setVideo(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

//   const getEmbedUrl = (url) => {
//     try {
//       const videoUrl = new URL(url);
//       if (videoUrl.hostname === 'www.youtube.com' || videoUrl.hostname === 'youtube.com') {
//         // Handle youtube.com/watch?v=VIDEO_ID
//         const videoId = videoUrl.searchParams.get('v');
//         if (videoId) {
//           return `https://www.youtube.com/embed/${videoId}`;
//         }
//       } else if (videoUrl.hostname === 'youtu.be') {
//         // Handle youtu.be/VIDEO_ID
//         const videoId = videoUrl.pathname.slice(1);
//         return `https://www.youtube.com/embed/${videoId}`;
//       }
//       return url; // Return original URL if not a YouTube URL
//     } catch (error) {
//       console.error('Error parsing video URL:', error);
//       return url; // Return original URL if parsing fails
//     }
//   };

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
      <div className="aspect-w-16 aspect-h-16 mb-8">
        <iframe
          src={video.videoUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
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