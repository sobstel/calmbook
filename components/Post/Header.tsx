import dayjs from "dayjs";

type Props = { page: Page; post: Post };

export default function Header({ post, page }: Props) {
  return (
    <div className="flex items-center max-w-full mb-4">
      <img className="w-10 h-10 rounded-full mr-4" src={page.avatar} alt="" />
      <div className="text-sm flex-grow inline-block truncate">
        <p className="text-gray-900 leading-none font-semibold text-lg truncate">
          {page.name}
        </p>
        <div className="text-gray-600">
          <a
            href={`/${page.url}#${post.timestamp}`}
            className="hover:underline"
          >
            {dayjs(post.timestamp).format("YYYY-MM-DD HH:mm")}
          </a>
        </div>
      </div>
    </div>
  );
}
