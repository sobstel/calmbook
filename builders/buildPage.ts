import cheerio from "cheerio";
import { Page } from "../models";
import buildPosts from "../builders/buildPosts";

const buildPage = ($: CheerioSelector): Omit<Page, "username"> => {
  const avatar = buildAvatar($);
  const name = buildName($);
  const posts = buildPosts($);

  return { name, posts, avatar };
};

export default buildPage;

const buildName = ($: CheerioSelector) => {
  let name = $('meta[property="og:title"]').attr("content");

  if (!name) {
    let title = $("title").text();

    const lastDashIndex = title.lastIndexOf("-");
    if (lastDashIndex !== -1) {
      title = title.substring(0, lastDashIndex - 1);
    }
    name = title;
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
