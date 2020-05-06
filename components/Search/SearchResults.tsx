import Link from "next/link";
import { Result } from "../Search";
import FadeIn from "../FadeIn";

type Props = { results: Result[] };

export default function SearchResults({ results }: Props) {
  if (results.length === 0) return null;

  return (
    <FadeIn>
      <div className="my-8 max-w-xs">
        {results.map(({ title, slug }) => (
          <div key={slug} className="my-2">
            <Link href="/[slug]" as={`/${slug}`}>
              <a className="block text-blue-600 hover:text-blue-300">{title}</a>
            </Link>
            <p className="text-xs">{slug}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
