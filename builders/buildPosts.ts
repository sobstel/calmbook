import cheerio from "cheerio";
import Post from "../models/Post";
import buildPost from "../builders/buildPost";

const buildPosts = ($: CheerioSelector) => {
  const posts: Array<Post> = [];

  $('.userContentWrapper').each((_, element) => {
    const post = buildPost(cheerio.load(element));
    posts.push(post);
  });

  return posts;
}

export default buildPosts;
