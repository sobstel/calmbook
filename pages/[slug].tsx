import { NextPageContext } from "next";
import Head from "next/head";
import useSWR from "swr";
import Page from "components/Page";
import { json } from "util/request";
import generateFeed from "util/generateFeed";

type Props = {
  // data: { page: Page };
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
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${req.headers.host}${apiPath(slug)}`;
    const data = await json(url);

    res.setHeader("Content-Type", "text/xml");
    res.write(generateFeed(data.page));
    res.end();
    return;
  }

  return { props: { slug } };
}

export default function CalmbookPage({ slug }: Props) {
  // TODO: handle error too
  const { data } = useSWR(apiPath(slug));
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
