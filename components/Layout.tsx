import React from "react";

type Props = { children: React.ReactNode };

// TODO
// link(href="/"+page.url+".xml" type="application/atom+xml" rel="alternate" title=page.name)/
// script(src='/embed.js')

export default function Layout(props: Props) {
  return (
    <div className="container max-w-lg mx-auto my-4">{props.children}</div>
  );
}
