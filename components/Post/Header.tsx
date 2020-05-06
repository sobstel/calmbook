import dayjs from "dayjs";

type Props = { page: Page; post: Post };

function AvatarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-gray-400 w-10 h-10 rounded-full">
      {children}
    </div>
  );
}

export default function Header({ post, page }: Props) {
  return (
    <div className="flex items-center max-w-full mb-4">
      <div className="mr-4">
        <AvatarContainer>
          <img className="w-10 h-10 rounded-full" src={page.avatar} alt="" />
        </AvatarContainer>
      </div>
      <div className="text-sm flex-grow inline-block truncate">
        <p className="text-gray-900 leading-none font-medium text-lg truncate">
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
