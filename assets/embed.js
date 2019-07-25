function __embed(img) {
  const link = img.dataset.link;
  if (!link) {
    return;
  }

  const url = "/__v?link=" + link;
  var req = new XMLHttpRequest();
  req.onload = function() {
    const data = JSON.parse(req.response);
    const embedHtml = data.html.replace(/(?:defer)="1"/g, "");

    const cntr = img.parentNode;
    cntr.innerHTML = embedHtml;

    // check if fb exists
    const FB = window.FB;
    const hasXFBML = FB && FB.XFBML && typeof FB.XFBML.parse === "function";

    // re create script tag (innerHTML will block script from being loaded)
    var innerScript = cntr.querySelector("script");
    if (innerScript) {
      if (!hasXFBML) {
        const scriptSrc = innerScript.src; ///src="([^"]+)"/g.exec(data.html)[1];
        const uid = Date.now();
        const newScript = document.createElement("script");
        newScript.id = "" + uid;
        newScript.src = scriptSrc + "&__a=" + uid;
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
