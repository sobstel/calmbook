import cheerio from "cheerio";
import { Page } from "../models";
import buildPosts from "../builders/buildPosts";

const buildPage = ($: CheerioSelector): Page => {
  const avatar = buildAvatar($);
  const name = buildName($);
  const posts = buildPosts($);

  return { name, posts, avatar };
};

export default buildPage;

const buildName = ($: CheerioSelector) => {
  const title = $("title").text();
  let name = title;

  const lastDashIndex = title.lastIndexOf("-");
  if (lastDashIndex !== -1) {
    name = title.substring(0, lastDashIndex - 1);
  }

  return name;
};

const buildAvatar = ($: CheerioSelector) => {
  let avatar = $('meta[property="og:image"]').attr("content");

  if (!avatar) {
    avatar = $('a[rel="theater"] img').attr("src");
  }

  return avatar;
};
