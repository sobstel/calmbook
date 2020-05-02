import buildPosts from "./buildPosts";

const buildUrl = ($: CheerioSelector): string => {
  const href = $('[data-key="tab_home"] > a').attr("href");
  if (!href) return "";
  return href
    .replace("?ref=page_internal", "")
    .replace(/\/+$/g, "")
    .replace(/^\/+/g, "");
};

const buildName = ($: CheerioSelector): string => {
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

const buildPage = ($: CheerioSelector): Page => {
  const url = buildUrl($);
  const name = buildName($);
  const avatar = buildAvatar($);
  const posts = buildPosts($);

  return { url, name, avatar, posts };
};

export default buildPage;
