import { useEffect, useState } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import axios from "axios";
import Page from "components/Page";
import generateFeed from "util/generateFeed";
import serverSideUrl from "util/serverSideUrl";

type Props = {
  slug: string;
};

function apiPath(slug: string): string {
  return `/api/page?name=${slug}`;
}

// TODO: move to "util"
const sanitizeSlug = (name: string): string => {
  let sanitizedSlug = name;
  sanitizedSlug = sanitizedSlug.trim();
  sanitizedSlug = sanitizedSlug.replace(/\/+$/g, ""); // trailing slashes
  sanitizedSlug = sanitizedSlug.replace(/^\/+/g, ""); // leading slashes
  sanitizedSlug = sanitizedSlug.replace(/\.\w{3}$/, ""); // extension (format)
  sanitizedSlug = sanitizedSlug.replace(/#.+$/, ""); // fragment link
  return sanitizedSlug;
};

export async function getServerSideProps({ query, req, res }: NextPageContext) {
  const rawSlug = query.slug as string;
  const slug = sanitizeSlug(rawSlug);

  if (req && res && rawSlug.slice(-4) === ".xml") {
    const { data } = await axios.get(
      serverSideUrl({ req, path: apiPath(slug) })
    );

    res.setHeader("Content-Type", "text/xml");
    res.write(generateFeed(data.page));
    res.end();
    return;
  }

  return { props: { slug } };
}

export default function CalmbookPage({ slug }: Props) {
  const [page, setPage] = useState<Page | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(apiPath(slug))
      .then((res) => setPage(res.data.page))
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, []);

  return (
    <div>
      {page && (
        <Head>
          <title>{page.name}</title>
          <link
            href={`/${page.url}.xml`}
            type="application/atom+xml"
            rel="alternate"
            title={page.name}
          />
        </Head>
      )}
      {errorMessage && (
        <div className="my-8 text-orange-600 text-center">{errorMessage}</div>
      )}
      {!errorMessage && <Page page={page} />}
    </div>
  );
}
