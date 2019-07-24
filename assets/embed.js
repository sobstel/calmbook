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

    // re create script tag (innerHTML will block script from being loaded)
    var script = cntr.querySelector("script");
    if (script) {
      const scriptSrc = script.src; ///src="([^"]+)"/g.exec(data.html)[1];
      cntr.removeChild(script);
      const uid = Date.now();
      script = document.createElement("script");
      script.id = "" + uid;
      script.src = scriptSrc + "&__a=" + uid;
      cntr.appendChild(script);
    }
  };

  req.open("GET", url);
  req.send();
}
