import dayjs from "dayjs";
import embedVideo from "util/embedVideo";

type Props = { post: Post; page: Page };

export default function Post({ post, page }: Props) {
  return (
    <div id={post.timestamp.toString()} className="px-2">
      <div
        className="my-2"
        dangerouslySetInnerHTML={{ __html: post.message }}
      />

      {post.images && post.images.length > 0 && (
        <div className="my-2">
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
      )}

      <div className="my-2 pt-4">
        <a
          href={`/${page.url}#${post.timestamp}`}
          className="text-gray-400 text-sm hover:underline"
        >
          {dayjs(post.timestamp).format("YYYY-MM-DD HH:mm")}
        </a>
      </div>
    </div>
  );
}
