import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedSection({ title, linkTo, children }) {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link
          to={linkTo}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          View more
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}
