export interface Teaching {
  id: string;
  title: string;
  description: string;
  content?: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
}

export interface Video {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
}

export interface Podcast {
  title: string;
  description: string;
  date: string;
  duration: string;
  url: string;
  imageUrl: string;
}

export interface Quiz {
  title: string;
  description: string;
  imageUrl: string;
  questionsCount: number;
}