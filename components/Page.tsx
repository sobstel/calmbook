import dayjs from "dayjs";

type Props = { page: Page };

function __embed(_: any) {
  // __embed(this)
}

function Post({ post, page }: { post: Post; page: Page }) {
  return (
    <div
      id={post.timestamp.toString()}
      className="rounded-lg bg-white shadow-lg my-8 px-6 py-6"
    >
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full mr-4" src={page.avatar} alt="" />
        <div className="text-sm flex-grow">
          <p className="text-gray-900 leading-none font-bold text-lg">
            {page.name}
          </p>
          <div className="clearfix">
            <a
              href={`/${page.url}#${post.timestamp}`}
              className="hover:underline"
            >
              {dayjs(post.timestamp).format("YYYY-MM-DD HH:mm")}
            </a>
          </div>
        </div>
      </div>

      <div
        className="my-6"
        dangerouslySetInnerHTML={{ __html: post.message }}
      />

      <div className="mt-6">
        {post.images.map((image) => {
          if (!post.poster) {
            return (
              <img
                key={image}
                className="max-w-full min-w-full h-auto inline-block"
                src={image}
                alt=""
              />
            );
          }
          if (post.poster) {
            return (
              <div key={image} className="v relative">
                <img
                  className="max-w-full min-w-full h-auto inline-block cursor-pointer"
                  data-link={`/${page.url}/videos/${post.id}`}
                  src={post.poster}
                  alt=""
                  onClick={__embed}
                />
              </div>
            );
          }
          if (post.link) {
            return (
              <a
                key={image}
                className="text-gray-600"
                href={post.link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <blockquote
                  className="my-1 italic"
                  dangerouslySetInnerHTML={{ __html: post.link.excerpt }}
                />
                <small
                  className="block whitespace-no-wrap overflow-hidden text-gray-500"
                  dangerouslySetInnerHTML={{ __html: post.link.url }}
                />
              </a>
            );
          }
          return null;
        })}
      </div>

      <div className="mt-6 text-sm">
        <a
          href={`/${page.url}#${post.timestamp}`}
          className="mr-2 text-blue-600 hover:underline"
        >
          permalink
        </a>
        {"| :"}
        <a
          href={`https://facebook.com/${page.url}/posts/${post.id}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-blue-600 hover:underline mx-2"
        >
          source
        </a>
      </div>
    </div>
  );
}

export default function Page({ page }: Props) {
  return (
    <div>
      <img
        className="w-10 h-10 rounded-full m-auto"
        src={page.avatar}
        alt={page.name}
      />
      <h1 className="text-3xl font-bold text-center">{page.name}</h1>
      {page.posts.map((post) => (
        <Post key={post.id} post={post} page={page} />
      ))}
    </div>
  );
}
