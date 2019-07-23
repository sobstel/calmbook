import Post from "../models/Post";

const buildPost = ($: CheerioSelector) => {
  const timestamp = parseInt($("abbr[data-utime]").attr("data-utime"));
  const { message, images = [] } = buildContent($);

  return new Post({ timestamp, message, images });
};

export default buildPost;

const buildContent = (
  $: CheerioSelector
): { message: string; images: string[] } => {
  const userContent = $(".userContent");
  let message = userContent.html() || "";

  const textExposedRootPargaraph = $(".text_exposed_root > p");
  if (textExposedRootPargaraph.length) {
    const textExposedShow = $("div.text_exposed_show").html() || "";
    message = `<p>${textExposedRootPargaraph.html()}</p>${textExposedShow}`;
  }

  const imgNodes = userContent.next().find("img.scaledImageFitWidth");
  const images =
    imgNodes && imgNodes.toArray().map(element => element.attribs["src"]);

  return { message, images };
};
