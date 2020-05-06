import { useState, useEffect } from "react";
import axios from "axios";
import * as idb from "idb-keyval";
import FadeIn from "../FadeIn";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

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

  useEffect(() => {
    async function readSavedData() {
      idb.get("query").then((savedQuery) => {
        if (savedQuery) setQuery(savedQuery as string);
      });
      idb.get("results").then((savedResults) => {
        if (savedResults) setResults(savedResults as Result[]);
      });
    }
    if (!query && results.length === 0) readSavedData();
  }, []);

  useEffect(() => {
    idb.set("query", query);
    idb.set("results", results);
    if (query) window.history.pushState("", "", `?q=${query}`);
  }, [results]);

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

      <SearchResults results={results} />
    </div>
  );
}
