import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const TEACHINGS = [
  {
    id: '1',
    title: "Understanding God's Grace",
    description: "Discover the depth of God's unconditional love and how it transforms our lives.",
    content: `
      Grace is one of the most powerful and transformative concepts in Christianity.
      It's God's unmerited favor toward us, His unconditional love that we cannot earn or lose.

      Key Points:

      1. The Nature of Grace
      - Grace is a gift, not something we earn
      - It's an expression of God's love for us
      - It's available to everyone

      2. The Power of Grace
      - Transforms our relationship with God
      - Changes how we view ourselves
      - Affects how we treat others

      3. Living in Grace
      - Accepting God's forgiveness
      - Extending grace to others
      - Growing in understanding

      4. Practical Applications
      - Daily walking in grace
      - Dealing with failure
      - Sharing grace with others

      Remember: Grace is not just a theological concept but a daily reality that should impact every aspect of our lives.
    `,
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80",
    category: "Grace",
    author: "Pastor David",
    date: "2024-12-20"
  },
];

export default function TeachingDetail() {
  const { id } = useParams();
  const teaching = TEACHINGS.find(t => t.id === id);

  if (!teaching) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <p>Teaching not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      {teaching.imageUrl && (
        <div className="aspect-w-16 aspect-h-9 mb-8">
          <img
            src={teaching.imageUrl}
            alt={teaching.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{teaching.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{format(new Date(teaching.date), 'MMMM d, yyyy')}</span>
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
