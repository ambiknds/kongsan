import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedSection from '../components/home/FeaturedSection';
import FeaturedVideo from '../components/home/FeaturedVideo';
import FeaturedQuiz from '../components/home/FeaturedQuiz';
import TeachingCard from '../components/home/TeachingCard';
import RandomVerse from '../components/home/RandomVerse';
import verseSearch from '../assets/verse-finder.png';
import { client } from '../lib/sanity';

const FEATURED_QUIZ = {
  title: "Bible Knowledge Quiz",
  description: "Test your understanding of biblical teachings with our interactive quiz",
  imageUrl: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80",
  questionsCount: 5
};

export default function Home() {
  const [teachings, setTeachings] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [teachingsData, videosData] = await Promise.all([
          client.fetch(`*[_type == "teaching"] | order(publishedAt desc)[0...2] {
            _id,
            title,
            slug,
            description,
            imageUrl,
            category,
            author,
            publishedAt,
            slug
          }`),
          client.fetch(`*[_type == "video"] | order(publishedAt desc)[0...2] {
            _id, title, slug, description, thumbnail, duration, videoUrl, publishedAt
          }`)
        
        ]);

        setTeachings(teachingsData);
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <RandomVerse />

      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl shadow-md p-8 my-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Test Your Knowledge</h2>
          <p className="text-gray-600 mt-2">Challenge yourself with our Bible quiz</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <FeaturedQuiz quiz={FEATURED_QUIZ} />
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl shadow-md p-8 my-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verse Finder</h2>
          <p className="text-gray-600 mt-2">Search for Bible verses by keywords</p>
        </div>
        <div className="max-w-2xl mx-auto rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <Link to='/verse-search'>
            <img src={verseSearch} alt='verse-search' className="w-full h-auto"/>
          </Link>
        </div>
      </section>

      {!loading && teachings.length > 0 && (
        <FeaturedSection title="Latest Teachings" linkTo="/teachings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teachings.map((teaching) => (
              <TeachingCard key={teaching._id} teaching={teaching} />
            ))}
          </div>
        </FeaturedSection>
      )}

      {!loading && videos.length > 0 && (
        <FeaturedSection title="Latest Videos" linkTo="/videos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <FeaturedVideo key={video._id} video={video} />
            ))}
          </div>
        </FeaturedSection>
      )}

    </div>
  );
}
