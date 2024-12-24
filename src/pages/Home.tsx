import DailyQuote from '../components/home/DailyQuote';
import MyMessage from '../components/home/MyMessage'
import RandomVerse from '../components/home/RandomVerse';
import TeachingCard from '../components/home/TeachingCard';
import FeaturedSection from '../components/home/FeaturedSection';
import { Quote, Teaching, Video, Podcast, Message } from '../types';
import FeaturedPodcast from '../components/home/FeaturesPodcast';
import FeaturedVideo from '../components/home/FeaturedVideo';
import FeaturedQuiz from '../components/home/FeaturedQuiz';

const DAILY_QUOTE: Quote = {
  text: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
  reference: "Jeremiah 29:11"
};

const MY_Message: Message = {
  heading: "A Christmas Message of Hope and Love",
  text: `As we celebrate the joyous season of Christmas, let us reflect on the true meaning of this time – the birth of our Lord and Savior, Jesus Christ. The story of His birth is not just a historical event but a profound reminder of God's love, grace, and faithfulness.

  The Promise of a Savior
  Over 700 years before Jesus was born, the prophet Isaiah proclaimed:
  "For unto us a child is born, unto us a son is given, and the government shall be upon his shoulder; and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace." (Isaiah 9:6)
  This prophecy reveals God's eternal plan to bring salvation to humanity. Christmas reminds us that God's promises never fail, and His timing is always perfect.
  
  The Fulfillment of God's Love
  In the little town of Bethlehem, the Word became flesh, and God dwelt among us.
  "And the Word was made flesh, and dwelt among us, and we beheld his glory, the glory as of the only begotten of the Father, full of grace and truth." (John 1:14)
  The birth of Jesus is the ultimate expression of God's love for mankind. He sent His Son into the world to redeem us and restore our relationship with Him.
  
  The Gift of Salvation
  As the angel announced to the shepherds:
  "For unto you is born this day in the city of David a Savior, which is Christ the Lord." (Luke 2:11)
  This gift of salvation is for everyone. Jesus came not only to live among us but to die for our sins so that we may have eternal life.
  "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." (John 3:16)
  
  The Light of the World
  Christmas also reminds us that Jesus is the light shining in the darkness.
  "The people who walked in darkness have seen a great light; those who dwelt in a land of deep darkness, on them has light shone." (Isaiah 9:2)
  In Him, we find hope, joy, and peace, even in challenging times. His light guides us and brings clarity to our lives.
  
  The Call to Rejoice
  The heavenly hosts sang at His birth:
  "Glory to God in the highest, and on earth peace, goodwill toward men." (Luke 2:14)
  Christmas is a time of rejoicing because God has made a way for peace and reconciliation. As we sing carols and celebrate with loved ones, let us remember to give glory to God for His incredible gift.
  
  The Message of Giving
  Just as the wise men brought gifts to honor the newborn King, we too are called to give.
  "Every good gift and every perfect gift is from above, and cometh down from the Father of lights." (James 1:17)
  Let us share our blessings with others, especially those in need, as an expression of gratitude for God's goodness.
  
  The Promise of Eternal Peace
  Through Jesus, we are offered peace that surpasses all understanding.
  "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." (Philippians 4:7)
  This peace is not just for this season but for every moment of our lives, as we trust in Him.
  
  A Call to Reflect and Share
  As we gather this Christmas, let us remember the humble beginnings of our Savior and His mission on earth.
  "Go ye into all the world, and preach the gospel to every creature." (Mark 16:15)
  May the joy of His birth inspire us to share His love and truth with others.
  
  Conclusion
  Christmas is not merely about traditions or festivities; it is about the indescribable gift of God's Son. Let us celebrate with grateful hearts, keeping Christ at the center of our lives. As Paul reminds us:
  "Thanks be unto God for his unspeakable gift." (2 Corinthians 9:15)
  
  May this Christmas bring you closer to God's love, fill your heart with His peace, and renew your spirit with His hope. Merry Christmas, and may the joy of our Savior's birth shine brightly in your life!`,
  
};

const FEATURED_TEACHINGS: Teaching[] = [
  {
    title: "Understanding God's Grace",
    description: "Discover the depth of God's unconditional love",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80",
    category: "Grace"
  },
  {
    title: "Walking in Faith",
    description: "Practical steps to strengthen your faith journey",
    imageUrl: "https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?auto=format&fit=crop&q=80",
    category: "Faith"
  },
  {
    title: "Prayer Fundamentals",
    description: "Building a strong prayer life",
    imageUrl: "https://images.unsplash.com/photo-1514908162061-89747fab8b1e?auto=format&fit=crop&q=80",
    category: "Prayer"
  }
];

const FEATURED_VIDEOS : Video[] = [
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

const FEATURED_QUIZ = {
  title: "Bible Knowledge Quiz",
  description: "Test your understanding of biblical teachings with our interactive quiz",
  imageUrl: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80",
  questionsCount: 5
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      {/* <DailyQuote quote={DAILY_QUOTE} /> */}
      <MyMessage message={MY_Message} />

      <RandomVerse />

      <FeaturedSection title="Test Your Knowledge" linkTo="/quiz">
        <div className="max-w-2xl mx-auto">
          <FeaturedQuiz {...FEATURED_QUIZ} />
        </div>
      </FeaturedSection>
      
      {/* <FeaturedSection title="Featured Teachings" linkTo="/teachings">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TEACHINGS.map((teaching, index) => (
            <TeachingCard key={index} teaching={teaching} />
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