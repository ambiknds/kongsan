import {Link} from 'react-router-dom';
import { Quiz } from '../../types';

interface FeaturedQuizProps {
  quiz: Quiz;
}

export default function FeaturedQuiz({quiz}: FeaturedQuizProps) {
  return (
    <Link to="/quiz" className="group">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={quiz.imageUrl} 
            alt={quiz.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-semibold text-white mb-2">{quiz.title}</h3>
          <p className="text-gray-200 text-sm mb-2">{quiz.description}</p>
          <div className="flex items-center text-sm text-gray-300">
            <span>{quiz.questionsCount} Questions</span>
            <span className="mx-2">•</span>
            <span className="text-blue-400">Take Quiz</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
