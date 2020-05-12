import { useState } from "react";
import Link from "next/link";
import Post from "./Post";
import Spinner from "./Spinner";
import FadeIn, { TailwindNumber } from "./FadeIn";

function AvatarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center bg-gray-400 w-16 h-16 rounded-full my-2">
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

type Props = { page: Page | null };

export default function Page({ page }: Props) {
  if (!page) {
    return (
      <AvatarContainer>
        <Spinner />
      </AvatarContainer>
    );
  }

  return (
    <div>
      <AvatarContainer>
        <AvatarImage page={page} />
      </AvatarContainer>
      <FadeIn>
        <h1 className="text-3xl font-medium text-center">{page.name}</h1>
        <p className="mt-2 text-blue-600 text-xs text-center">
          <Link key="home" href="/">
            <a>home</a>
          </Link>
          {" • "}
          <a
            key="fb"
            href={`https://www.facebook.com/${page.url}/posts`}
            target="_blank"
            rel="noopener noreferrer"
          >
            facebook
          </a>
        </p>
      </FadeIn>

      {page.posts && page.posts.length > 0 && (
        <div className="my-8 divide-y divide-gray-300 border-t border-b border-gray-300">
          {page.posts.map((post, index) => (
            <FadeIn
              key={post.timestamp}
              delay={Math.min(index * 100, 1000) as TailwindNumber}
            >
              <div className="py-8 overflow-hidden">
                <Post post={post} page={page} />
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
