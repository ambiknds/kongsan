import { Teaching } from '../../types';

interface TeachingCardProps {
  teaching: Teaching;
}

export default function TeachingCard({ teaching }: TeachingCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <img
        src={teaching.imageUrl}
        alt={teaching.title}
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 p-4 text-white">
        <h3 className="text-lg font-semibold mb-1">{teaching.title}</h3>
        <p className="text-sm opacity-90">{teaching.description}</p>
      </div>
    </div>
  );
}