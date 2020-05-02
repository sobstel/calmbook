import React from "react";

type Props = { children: React.ReactNode };

// TODO
// link(href="/"+page.url+".xml" type="application/atom+xml" rel="alternate" title=page.name)/
// script(src='/embed.js')

export default function Layout(props: Props) {
  return (
    <div className="container max-w-xl mx-auto my-4 font-layout leading-normal">
      {props.children}
    </div>
  );
}
