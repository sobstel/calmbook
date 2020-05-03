import Header from "./Header";
import Message from "./Message";
import Images from "./Images";

type Props = { post: Post; page: Page };

export default function Post({ post, page }: Props) {
  return (
    <div id={post.timestamp.toString()} className="px-2">
      <Header page={page} post={post} />
      <Message post={post} />
      <Images page={page} post={post} />
    </div>
  );
}
