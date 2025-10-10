import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { client, urlFor } from '../lib/sanity';

export default function TeachingDetail() {
  const { slug } = useParams();
  const [teaching, setTeaching] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeaching = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "teaching" && slug.current == "${slug}"][0] {
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
        `, { slug });
        setTeaching(data);
      } catch (error) {
        console.error('Error fetching teaching:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeaching();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!teaching) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <p className="text-gray-500">Teaching not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      {teaching.imageUrl && (
        <div className="aspect-w-16 aspect-h-9 mb-8">
          <img
            src={urlFor(teaching.imageUrl).width(1200).url()}
            alt={teaching.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{teaching.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{format(new Date(teaching.publishedAt), 'MMMM d, yyyy')}</span>
          <span>•</span>
          <span>{teaching.author}</span>
          <span>•</span>
          <span className="text-indigo-600">{teaching.category}</span>
        </div>

        <p className="text-xl text-gray-600 mb-8">{teaching.description}</p>

        <div className="whitespace-pre-line text-gray-700">
          {teaching.content}
        </div>
      </div>
    </div>
  );
}
