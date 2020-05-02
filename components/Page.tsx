import Post from "./Post";
import Logo from "./Logo";

type Props = { page: Page };

export default function Page({ page }: Props) {
  if (!page) {
    return (
      <div>
        <Logo />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Logo />
      <div className="divide-y divide-gray-300">
        {page.posts.map((post) => (
          <div key={post.timestamp} className="py-12">
            <Post post={post} page={page} />
          </div>
        ))}
      </div>
    </div>
  );
}
