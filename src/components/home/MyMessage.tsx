import { Message } from '../../types';

interface MessageProps {
  message: Message;
}

export default function DailyQuote({ message }: MessageProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-300 rounded-lg shadow-lg p-6 mb-8">
      {/* <div className="text-3xl font-serif text-gray-800 mb-4">A Message For You</div> */}
      <div className="text-center text-xl text-indigo-600 font-semibold mb-4">
        {message.heading}
      </div>
      <div className="text-md font-serif text-gray-800 mb-4">
        {message.text}
      </div>
    </div>
  );
}
