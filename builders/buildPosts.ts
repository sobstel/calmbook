import cheerio from "cheerio";
import buildPost from "../builders/buildPost";

const buildPosts = ($: CheerioSelector): Post[] => {
  const posts: Post[] = [];
  $(".userContentWrapper").each((_, element) => {
    const post = buildPost(cheerio.load(element));
    posts.push(post);
  });

  const sortedPosts = posts.sort((a, b) => b.timestamp - a.timestamp);

  return sortedPosts;
};

export default buildPosts;
