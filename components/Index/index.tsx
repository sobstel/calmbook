import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import SearchInput from "./SearchInput";
import FadeIn from "../FadeIn";

export type Result = { title: string; slug: string };

export type Props = { initialQuery: string; initialResults: Result[] };

export default function Index({ initialQuery, initialResults }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>(initialResults);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (value: string) => setQuery(value);
  const onSubmit = async () => {
    if (query.length < 4) {
      setErrorMessage("Min length: 4");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`/api/search?q=${query.toLowerCase()}`);
      if (!data || data.length === 0) setErrorMessage("Nothing found");
      setResults(data || []);
    } catch (e) {
      setErrorMessage(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <FadeIn>
        <SearchInput
          value={query}
          loading={loading}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </FadeIn>

      {errorMessage && (
        <FadeIn duration={500}>
          <div className="my-4 text-orange-600 text-center">{errorMessage}</div>
        </FadeIn>
      )}

      {results.length > 0 && (
        <div className="my-8 max-w-xs">
          {results.map(({ title, slug }) => (
            <div key={slug} className="my-2">
              <Link href="/[slug]" as={`/${slug}`}>
                <a className="block text-blue-600 hover:text-blue-300">
                  {title}
                </a>
              </Link>
              <p className="text-xs">{slug}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
