import buildContent from "./buildContent";

const getPostInfo = (link: string): { type?: string; id?: string } => {
  const postLinkIdRegEx = /\/([a-z]+)?\/([a-z0-9]+)\/?(?:\?.*)?$/g;
  const match = postLinkIdRegEx.exec(link);
  if (match) {
    switch (match.length) {
      case 2:
        return { type: undefined, id: match[1] };
      case 3:
        return { type: match[1], id: match[2] };
    }
  }
  return {};
};

const buildPost = ($: CheerioSelector): Post => {
  const timestamp =
    parseInt($("abbr[data-utime]").attr("data-utime") || "") * 1000;

  const linkToPost = $("div[id^=feed_subtitle] a").attr("href");
  const { type = "", id = "" } = linkToPost ? getPostInfo(linkToPost) : {};

  const { message, images = [], link } = buildContent($);

  // Fetch video poster
  let poster;
  if (type === "videos") {
    poster = $("video").parent().find("img").attr("src");
  }
  const title =
    message
      .replace(/<[^>]+>/g, "")
      .split(" ")
      .slice(0, 8)
      .join(" ") + "...";

  return { title, id, timestamp, message, images, poster, link };
};

export default buildPost;
