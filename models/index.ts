export const enum PostType {
  text = "text",
  image = "image",
  video = "video",
  link = "link",
  gallery = "gallery",
  complex = "complex"
}

export interface PostLink {
  excerpt: string;
  url: string;
}

export interface Post {
  id: string;
  images: string[];
  message: string;
  timestamp: number;
  title: string;
  poster?: string;
  link?: PostLink;
}

export interface Page {
  url: string;
  avatar: string;
  name: string;
  posts: Post[];
}
