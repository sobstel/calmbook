import React from "react";

type Props = { children: React.ReactNode };

export default function Layout(props: Props) {
  return (
    <div className="container max-w-lg mx-auto my-4">{props.children}</div>
  );
}
