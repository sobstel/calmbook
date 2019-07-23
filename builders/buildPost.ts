import Post from "../models/Post";

const buildPost = ($: CheerioSelector) => {
  const timestamp = parseInt($('abbr[data-utime]').attr('data-utime')) * 1000;
  const message = buildMessage($);

  return new Post({ timestamp, message });
}

export default buildPost;

const buildMessage = ($: CheerioSelector) => {
  const userContent = $('.userContent');

  let message = $('p', userContent).html() || '';

  const textExposedRootPargaraph = $('.text_exposed_root > p');
  if (textExposedRootPargaraph.length) {
    const textExposedShow = $('div.text_exposed_show').html() || '';
    message = `<p>${textExposedRootPargaraph.html()}</p>${textExposedShow}`;
  }

  return message;
}
