import { Post, PostLink } from "../models";

const findPostId = (link: string): string => {
  const postLinkIdRegEx = /\/([a-z0-9]+)\/?(?:\?.*)?$/g;
  const match = postLinkIdRegEx.exec(link);
  return match && match.length > 0 ? match[1] : "";
};

const buildPost = ($: CheerioSelector): Post => {
  const timestamp = parseInt($("abbr[data-utime]").attr("data-utime")) * 1000;

  const postLink = $("div[id^=feed_subtitle] a").attr("href");
  const id = findPostId(postLink);

  const { message, images = [], link } = buildContent($);

  const title =
    message
      .replace(/<[^>]+>/g, "")
      .split(" ")
      .slice(0, 8)
      .join(" ") + "...";

  console.log(link);

  return { title, id, timestamp, message, images, link };
};

export default buildPost;

const buildContent = (
  $: CheerioSelector
): { message: string; images?: string[]; link?: PostLink } => {
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

  // fetch any external links
  let postLink: PostLink | undefined = undefined;
  const aNodes = userContent.next().find("a");
  aNodes
    .toArray()
    .filter(node => node.children.length && node.children[0].type == "text")
    .map(node => {
      const proxyLink = node.attribs["href"] as string;
      const excerpt = node.children[0].data as string;
      const prefix = "";
      const linkRegEx = /^https?:\/\/l.facebook.com\/l\.php\?u=(.*)$/;
      const match = linkRegEx.exec(proxyLink);
      if (match) {
        const link = decodeURIComponent(match[1]);
        const url = link.replace(/utm_[^=]+=[^&]+&?/gi, "");
        postLink = {
          excerpt,
          url: url
        };
      }
    });

  return { message, images, link: postLink };
};
