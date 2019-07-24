import cheerio from "cheerio";
import { Post } from "../models";
import buildPost from "../builders/buildPost";

const buildPosts = async ($: CheerioSelector): Promise<Post[]> => {
  const posts: Post[] = [];
  for (const element of $(".userContentWrapper").toArray()) {
    const post = await buildPost(cheerio.load(element));
    posts.push(post);
  }

  return posts;
};

export default buildPosts;
