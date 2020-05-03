import Post from "./Post";
import Logo from "./Logo";
import Spinner from "./Spinner";
import FadeIn from "./FadeIn";

type Props = { page: Page };

function Skeleton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex items-center justify-center bg-gray-300 w-16 h-16 my-2"
        style={{ borderRadius: 32 }}
      >
        <Spinner />
      </div>
    </div>
  );
}

export default function Page({ page }: Props) {
  if (!page) return <Skeleton />;

  return (
    <FadeIn>
      <img
        className="w-16 h-16 rounded-full m-auto my-2"
        src={page.avatar}
        alt={page.name}
      />
      <h1 className="text-3xl font-medium text-center">{page.name}</h1>
      <FadeIn delay={300}>
        <div className="my-8 divide-y divide-gray-300 border-t border-b border-gray-300">
          {page.posts.map((post) => (
            <div key={post.timestamp} className="py-8">
              <Post post={post} page={page} />
            </div>
          ))}
        </div>
      </FadeIn>
      <Logo />
    </FadeIn>
  );
}
