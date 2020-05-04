import { useState } from "react";
import axios from "axios";
import Logo from "../Logo";
import SearchInput from "./SearchInput";
import FadeIn from "../FadeIn";

type Props = {};

export default function Index({}: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ title: string; slug: string }[]>([]);

  const onChange = (value: string) => setQuery(value);
  const onSubmit = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/search?q=${query}`);
    // TODO: setError on error
    setResults(data);
    setLoading(false);
  };

  // TODO: on mount, read from query string
  // TODO: results

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

      {results.map((result) => (
        <div key={result.slug}>
          {result.title} / {result.slug}
        </div>
      ))}

      <FadeIn delay={200}>
        <div className="mt-12">
          <Logo />
        </div>
      </FadeIn>
    </div>
  );
}
