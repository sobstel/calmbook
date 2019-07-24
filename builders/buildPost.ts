import { Post } from "../models";

const findPostId = (link: string): string => {
  const postLinkIdRegEx = /\/([a-z0-9]+)\/?(?:\?.*)?$/g;
  const match = postLinkIdRegEx.exec(link);
  return match && match.length > 0 ? match[1] : "";
};

const buildPost = ($: CheerioSelector): Post => {
  const timestamp = parseInt($("abbr[data-utime]").attr("data-utime")) * 1000;

  const link = $("div[id^=feed_subtitle] a").attr("href");
  const id = findPostId(link);

  const { message, images = [] } = buildContent($);

  const title =
    message
      .replace(/<[^>]+>/g, "")
      .split(" ")
      .slice(0, 8)
      .join(" ") + "...";

  return { title, id, timestamp, message, images };
};

export default buildPost;

const buildContent = (
  $: CheerioSelector
): { message: string; images: string[] } => {
  const userContent = $(".userContent");

  // get all post paragraphs post text
  const paragraphs = $("p", userContent).toArray();

  // remove html leaving only <br>
  let message = paragraphs.reduce(
    (accum: string, el: CheerioElement): string => {
      $(el)
        .find("br")
        .replaceWith("\n");
      accum = `${accum}<p>${$(el).text()}</p>`.replace(/\n+/g, "<br/>");
      return accum;
    },
    ""
  );

  // fetch any post images
  const imgNodes = userContent.next().find("img.img");
  const images =
    imgNodes && imgNodes.toArray().map(element => element.attribs["src"]);

  return { message, images };
};
