export interface Quote {
  text: string;
  reference: string;
  imageUrl?: string;
}

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

export interface Sermon {
  title: string;
  speaker: string;
  date: string;
  duration: string;
  url: string;
  type: 'audio' | 'video';
}

export interface Podcast {
  title: string;
  description: string;
  date: string;
  duration: string;
  url: string;
  imageUrl: string;
}