export interface Post {
  id: string;
  images: string[];
  message: string;
  timestamp: number;
  title: string;
  poster?: string;
}

export interface Page {
  avatar: string;
  username: string;
  name: string;
  posts: Post[];
}
