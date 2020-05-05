import { NextPageContext } from "next";
import Head from "next/head";
import useSWR from "swr";
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
  // TODO: handle error too
  const { data } = useSWR(apiPath(slug), (url) =>
    axios.get(url).then((res) => res.data)
  );
  const page = data && data.page;
  return (
    <div>
      {page && (
        <Head>
          <title>{data.page.name}</title>
        </Head>
      )}
      <Page page={page} />
    </div>
  );
}
