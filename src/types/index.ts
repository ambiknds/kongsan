export interface Quote {
  text: string;
  reference: string;
  imageUrl?: string;
}

export interface Teaching {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
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