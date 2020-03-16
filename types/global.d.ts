declare enum PostType {
  text = "text",
  image = "image",
  video = "video",
  link = "link",
  gallery = "gallery",
  complex = "complex"
}

interface PostLink {
  excerpt: string;
  url: string;
}

interface Post {
  id: string;
  images: string[];
  message: string;
  timestamp: number;
  title: string;
  poster?: string;
  link?: PostLink;
}

interface Page {
  url: string;
  avatar: string;
  name: string;
  posts: Post[];
}
