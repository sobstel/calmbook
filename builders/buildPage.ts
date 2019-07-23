import cheerio from "cheerio";
import Page from "../models/Page";
import Post from "../models/Post";
import buildPost from "../builders/buildPost";

const buildPage = ($: CheerioSelector) => {
  const posts: Array<Post> = [];

  $('.userContentWrapper').each((_, element) => {
    const post = buildPost(cheerio.load(element));
    posts.push(post);
  });

  return new Page({ posts });
}

export default buildPage;
