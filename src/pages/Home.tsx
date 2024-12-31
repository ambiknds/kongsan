
import DailyQuote from '../components/home/DailyQuote';
import FeaturedSection from '../components/home/FeaturedSection';
import { Quote, Video, Podcast } from '../types';
import FeaturedPodcast from '../components/home/FeaturesPodcast';
import FeaturedVideo from '../components/home/FeaturedVideo';
import FeaturedQuiz from '../components/home/FeaturedQuiz';
import FeaturedMessage from '../components/home/FeaturedMessage';
import { MESSAGES, TEACHINGS } from '../data/sampleData';
import TeachingCard from '../components/home/TeachingCard';
import MyMessage from '../components/home/MyMessage';
import RandomVerse from '../components/home/RandomVerse';
import NewYearMessage from '../components/home/NewYearMessage';
const DAILY_QUOTE: Quote = {
  text: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
  reference: "Jeremiah 29:11"
};

const FEATURED_QUIZ = {
  title: "Bible Knowledge Quiz",
  description: "Test your understanding of biblical teachings with our interactive quiz",
  imageUrl: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80",
  questionsCount: 5
};

const FEATURED_VIDEOS: Video[] = [
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
];

const FEATURED_PODCASTS: Podcast[] = [
  {
    title: 'Walking with Christ Daily',
    description: 'Practical insights for living out your faith in everyday life',
    date: '2024-03-15',
    duration: '35:20',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80',
  },
  {
    title: 'Understanding Scripture',
    description: 'Deep dive into biblical interpretation and application',
    date: '2024-03-10',
    duration: '42:15',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80',
  },
  {
    title: 'Modern Faith Challenges',
    description: 'Addressing contemporary issues through a biblical lens',
    date: '2024-03-05',
    duration: '28:45',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80',
  },
];

export default function Home() {
  // Get the two most recent messages
  const recentMessages = MESSAGES.slice(0, 2);
  const recentTeachings = TEACHINGS.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      {/* <DailyQuote quote={DAILY_QUOTE} /> */}

      <NewYearMessage />
      <MyMessage/>

      <RandomVerse />

      <FeaturedSection title="Test Your Knowledge" linkTo="/quiz">
        <div className="max-w-2xl mx-auto">
          <FeaturedQuiz {...FEATURED_QUIZ} />
        </div>
      </FeaturedSection>

      {/* <FeaturedSection title="Latest Messages" linkTo="/messages">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentMessages.map((message) => (
            <FeaturedMessage key={message.id} message={message} />
          ))}
        </div>
      </FeaturedSection>

      <FeaturedSection title="Latest Teachings" linkTo="/teachings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentTeachings.map((teaching) => (
            <TeachingCard key={teaching.id} teaching={teaching} />
          ))}
        </div>
      </FeaturedSection>

      <FeaturedSection title="Latest Videos" linkTo="/videos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_VIDEOS.map((video, index) => (
            <FeaturedVideo key={index} video={video} />
          ))}
        </div>
      </FeaturedSection>

      <FeaturedSection title="Recent Podcasts" linkTo="/podcast">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PODCASTS.map((podcast, index) => (
            <FeaturedPodcast key={index} podcast={podcast} />
          ))}
        </div>
      </FeaturedSection> */}
    </div>
  );
}