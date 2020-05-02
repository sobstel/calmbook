import dayjs from "dayjs";
import embedVideo from "util/embedVideo";

type Props = { post: Post; page: Page };

export default function Post({ post, page }: Props) {
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
        {post.images.map((image, i) => {
          const key = [image, i].join("-");
          if (!post.poster) {
            return (
              <img
                key={key}
                className="max-w-full min-w-full h-auto inline-block"
                src={image}
                alt=""
              />
            );
          }
          if (post.poster) {
            return (
              <div key={key} className="v relative">
                <img
                  className="max-w-full min-w-full h-auto inline-block cursor-pointer"
                  data-link={`/${page.url}/videos/${post.id}`}
                  src={post.poster}
                  alt=""
                  onClick={(event) => embedVideo(event.target)}
                />
              </div>
            );
          }
          if (post.link) {
            return (
              <a
                key={key}
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
