import { Quote } from '../../types';

interface DailyQuoteProps {
  quote: Quote;
}

export default function DailyQuote({ quote }: DailyQuoteProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-500 rounded-lg shadow-lg p-6 mb-8">
      <div className="text-3xl font-serif text-gray-800 mb-4">Daily Verse</div>
      <div className="text-xl font-serif text-gray-800 mb-4">
        "{quote.text}"
      </div>
      <div className="text-right text-indigo-600 font-semibold">
        {quote.reference}
      </div>
    </div>
  );
}
