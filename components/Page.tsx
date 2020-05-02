import Post from "./Post";
import Logo from "./Logo";
import Spinner from "./Spinner";
import { useSpring, animated } from "react-spring";

type Props = { page: Page };

function Skeleton() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div
          className="flex items-center justify-center bg-gray-300 w-16 h-16 my-2"
          style={{ borderRadius: 32 }}
        >
          <Spinner />
        </div>
      </div>
    </div>
  );
}

export default function Page({ page }: Props) {
  if (!page) return <Skeleton />;

  const pageSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const postsSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  return (
    <animated.div style={pageSpring}>
      <img
        className="w-16 h-16 rounded-full m-auto my-2"
        src={page.avatar}
        alt={page.name}
      />
      <h1 className="text-3xl font-bold text-center">{page.name}</h1>
      <animated.div
        style={postsSpring}
        className="my-8 divide-y divide-gray-300 border-t border-b border-gray-300"
      >
        {page.posts.map((post) => (
          <div key={post.timestamp} className="py-8">
            <Post post={post} page={page} />
          </div>
        ))}
      </animated.div>
      <Logo />
    </animated.div>
  );
}
