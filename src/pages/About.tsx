import { BookOpen, Users, Heart } from 'lucide-react';

const features = [
  {
    name: 'Our Mission',
    description: 'To spread the Gospel and provide accessible Christian resources to help people grow in their faith journey.',
    icon: BookOpen,
  },
  {
    name: 'Our Community',
    description: 'A welcoming space for believers to learn, share, and grow together in Christ.',
    icon: Users,
  },
  {
    name: 'Our Values',
    description: 'Rooted in biblical truth, committed to authentic relationships, and dedicated to spiritual growth.',
    icon: Heart,
  },
];

export default function About() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Dedicated to sharing God's word and fostering spiritual growth in our community.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="prose prose-lg mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
            <p className="text-gray-600">
              Founded with a vision to make Christian resources accessible to everyone, our platform community of believers seeking to deepen their faith and understanding of God's word.
            </p>
            <p className="text-gray-600 mt-4">
              We believe in the power of digital ministry to reach people where they are, providing them with the tools and resources they need for their spiritual journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}