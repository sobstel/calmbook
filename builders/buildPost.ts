import axios from "axios";
import { Post } from "../models";

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

const buildPost = async ($: CheerioSelector): Promise<Post> => {
  const timestamp = parseInt($("abbr[data-utime]").attr("data-utime")) * 1000;

  const link = $("div[id^=feed_subtitle] a").attr("href");

  const { type = "", id = "" } = getPostInfo(link);

  const { message, images = [] } = buildContent($);

  // Fetch video poster
  let poster = undefined;
  if (type === "videos") {
    poster = $("video")
      .parent()
      .find("img")
      .attr("src");
  }
  const title =
    message
      .replace(/<[^>]+>/g, "")
      .split(" ")
      .slice(0, 8)
      .join(" ") + "...";

  return { title, id, timestamp, message, images, poster };
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
