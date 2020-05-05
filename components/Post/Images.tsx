import embedVideo from "util/embedVideo";

type Props = { page: Page; post: Post };

export default function Images({ page, post }: Props) {
  if (!post.images || post.images.length === 0) return null;

  return (
    <div className="my-2">
      {post.images.map((image, i) => {
        const key = [image, i].join("-");
        if (!post.poster) {
          return (
            <img
              key={key}
              className="max-w-full object-contain h-auto inline-block "
              src={image}
              alt=""
              loading="lazy"
            />
          );
        }
        if (post.poster) {
          return (
            <div key={key} className="v relative">
              <img
                className="max-w-full object-contain h-auto inline-block cursor-pointer"
                data-link={`/${page.url}/videos/${post.id}`}
                src={post.poster}
                alt=""
                onClick={(event) => embedVideo(event.target)}
                loading="lazy"
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
  );
}
