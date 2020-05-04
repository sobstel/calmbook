import { useState } from "react";
import Logo from "../Logo";
import SearchInput from "./SearchInput";
import FadeIn from "../FadeIn";

type Props = {};

export default function Index({}: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  // const [results, setResults] = useState([]);

  const onChange = (value: string) => setQuery(value);
  const onSubmit = () => {
    setLoading(true);
    // TODO: trigger query (with timeout)
    // TODO: setResults on success
    // TODO: setError on error
    setTimeout(() => setLoading(false), 2000);
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

      <FadeIn delay={200}>
        <div className="mt-12">
          <Logo />
        </div>
      </FadeIn>
    </div>
  );
}
