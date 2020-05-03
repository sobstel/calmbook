type Props = { post: Post };

export default function Message({ post }: Props) {
  return (
    <div className="my-2" dangerouslySetInnerHTML={{ __html: post.message }} />
  );
}
