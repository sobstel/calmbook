export interface Post {
  images: string[];
  message: string;
  timestamp: number;
  title: string;
}

export interface Page {
  avatar: string;
  name: string;
  posts: Post[];
}
