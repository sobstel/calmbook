declare enum PostType {
  text = "text",
  image = "image",
  video = "video",
  link = "link",
  gallery = "gallery",
  complex = "complex"
}

// TODO: change to type
interface PostLink {
  excerpt: string;
  url: string;
}

// TODO: change to type
interface Post {
  id: string;
  images: string[];
  message: string;
  timestamp: number;
  title: string;
  poster?: string;
  link?: PostLink;
}

// TODO: change to type
interface Page {
  url: string;
  avatar?: string;
  name: string;
  posts: Post[];
}
