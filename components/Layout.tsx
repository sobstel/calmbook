import React from "react";

type Props = { children: React.ReactNode };

export default function Layout(props: Props) {
  return (
    <div className="container max-w-xl mx-auto my-4 font-layout leading-normal px-4">
      {props.children}
    </div>
  );
}
