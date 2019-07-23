export interface Post {
  message: string;
  timestamp: number;
  images: string[];
}

export interface Page {
  name: string;
  avatar: string;
  posts: Post[];
}
