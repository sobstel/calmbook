import Post from "./Post";
import Logo from "./Logo";
import Spinner from "./Spinner";
import FadeIn from "./FadeIn";
import { useState } from "react";

type Props = { page: Page };

function AvatarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center bg-gray-400 w-16 h-16 rounded-16 my-2">
        {children}
      </div>
    </div>
  );
}

function AvatarImage({ page }: { page: Page }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <img
      className="w-16 h-16 rounded-full my-2"
      src={page.avatar}
      alt={page.name}
      onError={() => setVisible(false)}
    />
  );
}

export default function Page({ page }: Props) {
  if (!page) {
    return (
      <AvatarContainer>
        <Spinner />
      </AvatarContainer>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <AvatarContainer>
        <AvatarImage page={page} />
      </AvatarContainer>
      <FadeIn>
        <h1 className="text-3xl font-medium text-center">{page.name}</h1>
      </FadeIn>
      <FadeIn delay={200}>
        <div className="my-8 divide-y divide-gray-300 border-t border-b border-gray-300">
          {page.posts.map((post) => (
            <div key={post.timestamp} className="py-8">
              <Post post={post} page={page} />
            </div>
          ))}
        </div>
      </FadeIn>
      <Logo />
    </div>
  );
}
