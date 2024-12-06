import { useState, useEffect } from 'react';
import DailyQuote from '../components/home/DailyQuote';
import TeachingCard from '../components/home/TeachingCard';
import FeaturedSection from '../components/home/FeaturedSection';
import { Quote, Teaching, Sermon, Podcast } from '../types';

const DAILY_QUOTE: Quote = {
  text: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
  reference: "Jeremiah 29:11"
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

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <DailyQuote quote={DAILY_QUOTE} />
      
      <FeaturedSection title="Featured Teachings" linkTo="/teachings">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TEACHINGS.map((teaching, index) => (
            <TeachingCard key={index} teaching={teaching} />
          ))}
        </div>
      </FeaturedSection>

      <FeaturedSection title="Latest Videos" linkTo="/videos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video content will be added here */}
          <div className="aspect-video bg-gray-100 rounded-lg"></div>
          <div className="aspect-video bg-gray-100 rounded-lg"></div>
        </div>
      </FeaturedSection>

      <FeaturedSection title="Recent Podcasts" linkTo="/podcast">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Podcast content will be added here */}
          <div className="h-48 bg-gray-100 rounded-lg"></div>
          <div className="h-48 bg-gray-100 rounded-lg"></div>
          <div className="h-48 bg-gray-100 rounded-lg"></div>
        </div>
      </FeaturedSection>
    </div>
  );
}