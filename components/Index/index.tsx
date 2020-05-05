import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Logo from "../Logo";
import SearchInput from "./SearchInput";
import FadeIn from "../FadeIn";

type Props = {};

export default function Index({}: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ title: string; slug: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (value: string) => setQuery(value);
  const onSubmit = async () => {
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
          <div className="my-4 text-orange-700 text-center">{errorMessage}</div>
        </FadeIn>
      )}

      {results.length > 0 && (
        <div className="my-8">
          {results.map(({ title, slug }) => (
            <Link key={slug} href="/[slug]" as={`/${slug}`}>
              <a className="block text-blue-600 hover:text-blue-300">{title}</a>
            </Link>
          ))}
        </div>
      )}
      <FadeIn delay={200}>
        <div className="mt-12">
          <Logo />
        </div>
      </FadeIn>
    </div>
  );
}

// TODO: getServerSideProps -> read from query string
