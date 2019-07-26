function __embed(img) {
  const link = img.dataset.link;
  if (!link) {
    return;
  }

  const url = "/video?link=" + link;
  var req = new XMLHttpRequest();
  req.onload = function() {
    const data = JSON.parse(req.response);
    const embedHtml = data.html;
    if (!embedHtml) {
      return;
    }

    const cntr = img.parentNode;
    cntr.innerHTML = embedHtml;

    // check if fb exists
    const FB = window.FB;
    const hasXFBML = FB && FB.XFBML && typeof FB.XFBML.parse === "function";

    // re create script tag (innerHTML will block script from being loaded)
    var innerScript = cntr.querySelector("script");
    if (innerScript) {
      if (!hasXFBML) {
        const scriptSrc = innerScript.src;
        const newScript = document.createElement("script");
        newScript.id = "fbsdk_" + Date.now();
        newScript.src = scriptSrc;
        cntr.insertBefore(newScript, innerScript);
      } else {
        FB.XFBML.parse(cntr);
      }
      cntr.removeChild(innerScript);
    }
  };

  req.open("GET", url);
  req.send();
}
