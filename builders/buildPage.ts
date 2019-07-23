import cheerio from "cheerio";
import Page from "../models/Page";
import buildPosts from "../builders/buildPosts";

const buildPage = ($: CheerioSelector) => {
  const avatar = buildAvatar($);
  const name = buildName($);
  const posts = buildPosts($);

  return new Page({ name, posts, avatar });
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
  const ogi = $('meta[property="og:image"]');
  let avatar = ogi && ogi.attr("content");

  if (!avatar) {
    const ai = $('a[rel="theater"] img');
    avatar = ai && ai.first().attr("src");
  }

  return avatar;
};
