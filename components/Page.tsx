import Post from "./Post";
import Logo from "./Logo";

type Props = { page: Page };

export default function Page({ page }: Props) {
  if (!page) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <img
        className="w-16 h-16 rounded-full m-auto my-2"
        src={page.avatar}
        alt={page.name}
      />
      <h1 className="text-3xl font-bold text-center">{page.name}</h1>
      <div className="my-8 divide-y divide-gray-300 border-t border-b border-gray-300">
        {page.posts.map((post) => (
          <div key={post.timestamp} className="py-8">
            <Post post={post} page={page} />
          </div>
        ))}
      </div>
      <Logo />
    </div>
  );
}
