export default function buildContent(
  $: CheerioSelector
): { message: string; images?: string[]; link?: PostLink } {
  const userContent = $(".userContent");

  // get all post paragraphs post text
  const paragraphs = $("p", userContent).toArray();

  // remove html leaving only <br>
  const message = paragraphs.reduce(
    (accum: string, el: CheerioElement): string => {
      $(el).find("br").replaceWith("\n");
      accum = `${accum}<p>${$(el).text()}</p>`.replace(/\n+/g, "<br/>");
      return accum;
    },
    ""
  );

  // fetch any post images
  const imgNodes = userContent.next().find("img.img");
  const images =
    imgNodes && imgNodes.toArray().map((element) => element.attribs["src"]);

  // fetch any external links
  let postLink: PostLink | undefined;
  const aNodes = userContent.next().find("a");
  aNodes
    .toArray()
    .filter((node) => node.children.length && node.children[0].type == "text")
    .map((node) => {
      const proxyLink = node.attribs["href"] as string;
      const excerpt = node.children[0].data as string;
      const linkRegEx = /^https?:\/\/l.facebook.com\/l\.php\?u=(.*)$/;
      const match = linkRegEx.exec(proxyLink);
      if (match) {
        const link = decodeURIComponent(match[1]);
        const url = link.replace(/utm_[^=]+=[^&]+&?/gi, "");
        postLink = {
          excerpt,
          url: url,
        };
      }
    });

  return { message, images, link: postLink };
}
