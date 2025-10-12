import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { client } from '../lib/sanity';
import TeachingCard from '../components/home/TeachingCard';

export default function Teachings() {
  const [teachings, setTeachings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchTeachings = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "teaching"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            description,
            content,
            imageUrl,
            category,
            author,
            publishedAt
          }
        `);
        setTeachings(data);
        
      } catch (error) {
        console.error('Error fetching teachings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachings();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(teachings.map(teaching => teaching.category))).sort();
  }, [teachings]);

  const filteredTeachings = useMemo(() => {
    return teachings.filter(teaching => {
      const matchesSearch =
        teaching.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teaching.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teaching.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || teaching.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [teachings, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Teachings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of biblical teachings and spiritual insights
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search teachings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="sm:w-56">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {teachings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No teachings available yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachings.map(teaching => (
                <TeachingCard key={teaching._id} teaching={teaching} />
              ))}
            </div>

            {filteredTeachings.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No teachings found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}