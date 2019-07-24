import { Post } from "../models";

const buildPost = ($: CheerioSelector): Post => {
  const timestamp = parseInt($("abbr[data-utime]").attr("data-utime")) * 1000;
  const { message, images = [] } = buildContent($);
  const title = message.replace(/<[^>]+>/g, "").split(" ").slice(0, 8).join(" ") + "..."

  return { title, timestamp, message, images };
};

export default buildPost;

const buildContent = (
  $: CheerioSelector
): { message: string; images: string[] } => {
  const userContent = $(".userContent");
  let message = $("p", userContent).html() || "";

  const textExposedRootPargaraph = $(".text_exposed_root > p");
  if (textExposedRootPargaraph.length) {
    const textExposedShow = $("div.text_exposed_show").html() || "";
    message = `<p>${textExposedRootPargaraph.html()}</p>${textExposedShow}`;
  }

  const imgNodes = userContent.next().find("img.img");
  const images =
    imgNodes && imgNodes.toArray().map(element => element.attribs["src"]);

  return { message, images };
};
