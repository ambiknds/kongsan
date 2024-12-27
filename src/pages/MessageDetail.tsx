import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Message } from '../types/message';

// This would typically come from an API
const MESSAGES: Message[] = [
  {
    id: '1',
    title: 'Finding Peace in Troubled Times',
    content: `
      In today's fast-paced and often chaotic world, finding peace can seem like an impossible task. 
      Yet, as believers, we are called to maintain our peace even in the midst of life's storms.
      
      Here are key principles to help you maintain peace:
      
      1. Stay Grounded in Scripture
      Daily meditation on God's Word provides a solid foundation for peace.
      
      2. Practice Regular Prayer
      Maintaining an active prayer life helps us stay connected to the source of true peace.
      
      3. Trust in God's Promises
      Remember that God is faithful and His promises are true.
      
      4. Build Community
      Surrounding yourself with fellow believers provides support and encouragement.
    `,
    summary: 'Discover how to maintain inner peace and spiritual strength during challenging periods.',
    date: '2024-12-26',
    author: 'Pastor John',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    category: 'Spiritual Growth'
  },
  // Add more messages here
];

export default function MessageDetail() {
  const { id } = useParams();
  const message = MESSAGES.find(m => m.id === id);

  if (!message) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <p>Message not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      {message.imageUrl && (
        <div className="aspect-w-16 aspect-h-9 mb-8">
          <img
            src={message.imageUrl}
            alt={message.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}
      
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{message.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{format(new Date(message.date), 'MMMM d, yyyy')}</span>
          <span>•</span>
          <span>{message.author}</span>
          <span>•</span>
          <span className="text-indigo-600">{message.category}</span>
        </div>

        <div className="whitespace-pre-line text-gray-700">
          {message.content}
        </div>
      </div>
    </div>
  );
}
