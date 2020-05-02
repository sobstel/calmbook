/* eslint-disable */

// loader icon from https://feathericons.com/
const LoaderIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>';

function createLoaderNode() {
  const loader = document.createElement("div");
  loader.className =
    "loader absolute inset-0 flex justify-center items-center flex-col";
  const style = loader.style;
  style.background = "rgba(255,255,255,0.4)";
  loader.innerHTML = LoaderIcon + '<small class="my-1">loading...</small>';
  return loader;
}

function $parent(node) {
  return node && node instanceof HTMLElement ? node.parentNode : null;
}

function videoEmbedCompleteHandler(req, img) {
  return function() {
    const data = JSON.parse(req.response);
    const embedHtml = data.html;
    if (!embedHtml) {
      return;
    }

    const container = $parent(img);
    const embedNode = document.createElement("div");
    embedNode.className = "absolute inset-0";
    embedNode.innerHTML = embedHtml;
    container.appendChild(embedNode);

    // remove loader
    const loader = container.querySelector(".loader");
    if (loader) {
      container.removeChild(loader);
    }

    // check if fb exists
    const FB = window.FB;
    const hasXFBML = FB && FB.XFBML && typeof FB.XFBML.parse === "function";

    // re create script tag (innerHTML will block script from being loaded)
    var innerScript = embedNode.querySelector("script");
    if (innerScript) {
      if (!hasXFBML) {
        const scriptSrc = innerScript.src;
        const newScript = document.createElement("script");
        newScript.id = "fbsdk_" + Date.now();
        newScript.src = scriptSrc;
        embedNode.insertBefore(newScript, innerScript);
      } else {
        FB.XFBML.parse(embedNode);
      }
      embedNode.removeChild(innerScript);
    }
  };
}

export default function embedVideo(img) {
  const link = img.dataset.link;
  if (!link) {
    return;
  }

  const container = $parent(img);
  const bounds = img.getBoundingClientRect();
  const style = container.style;
  style.width = bounds.width + "px";
  style.height = bounds.height + "px";

  const loader = createLoaderNode(bounds);
  container.appendChild(loader);

  const url = "/api/video?link=" + link;
  var req = new XMLHttpRequest();
  req.onload = videoEmbedCompleteHandler(req, img);
  req.open("GET", url);
  req.send();
}
