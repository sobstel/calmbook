import cheerio from "cheerio";
import { Post } from "../models";
import buildPost from "../builders/buildPost";

const buildPosts = ($: CheerioSelector): Post[] => {
  const posts: Post[] = [];
  console.log(($ as any).html());

  $(".userContentWrapper").each((_, element) => {
    const post = buildPost(cheerio.load(element));
    console.log(post);
    posts.push(post);
  });

  return posts;
};

export default buildPosts;
