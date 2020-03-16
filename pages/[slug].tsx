import { NextPageContext } from "next";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import cheerio from "cheerio";

const cache = setupCache({ maxAge: 5 * 60 * 1000 });
// @ts-ignore
const cachedAxios = axios.create({ adapter: cache.adapter });

type Props = {
  data: string;
}

export default function CalmbookPage({ data }: Props) {

  return (<div>{data}</div>);
}

export async function getServerSideProps({ query }: NextPageContext) {
  const { slug } = query;

  // TODO: check for context.preview

  const sanitizedSlug = sanitizeSlug(slug as string);
  if (!sanitizedSlug) {
    throw new Error(
      "provide valid page url, eg. https://calmbook.sobstel.now.sh/TurismoArgentina"
    );
  }

  const response = await cachedAxios.get(
    `https://www.facebook.com/${sanitizedSlug}/posts`
  );

  // TODO: prase to JSON using builders or so
  // const $ = cheerio.load(response.data);

  // Pass JSON here
  return { props: { data: response.data } }
}

const sanitizeSlug = (url?: string): string | undefined => {
  if (!url) return;

  let sanitizedUrl = url;
  sanitizedUrl = sanitizedUrl.trim();
  sanitizedUrl = sanitizedUrl.replace(/\/+$/g, ""); // trailing slashes
  sanitizedUrl = sanitizedUrl.replace(/^\/+/g, ""); // leading slashes
  sanitizedUrl = sanitizedUrl.replace(/\.\w{3}$/, ""); // extension (format)
  sanitizedUrl = sanitizedUrl.replace(/#.+$/, ""); // fragment link

  return sanitizedUrl;
}
