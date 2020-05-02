type Props = { page: Page };

export default function Page({ page }: Props) {
  return (
    <div>
      <img
        className="w-10 h-10 rounded-full m-auto"
        src={page.avatar}
        alt={page.name}
      />
      <h1 className="text-3xl font-bold text-center">{page.name}</h1>
      <p>TO DO</p>
    </div>
  );
}
