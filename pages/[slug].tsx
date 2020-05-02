import { NextPageContext } from "next";
import useSWR from "swr";
import request from "util/request";
import Page from "components/Page";

type Props = {
  data: { page: Page };
  slug: string;
};

function apiPath(slug: string): string {
  return `/api/page?name=${slug}`;
}

export async function getServerSideProps({ query }: NextPageContext) {
  const slug = query.slug as string;
  // const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  // const url = `${protocol}://${req?.headers.host}${apiPath(slug)}`;
  // const data = await request(url);
  return { props: { slug } };
}

export default function CalmbookPage({ slug }: Props) {
  // TODO: handle error too
  const { data } = useSWR(apiPath(slug), request);
  const { page } = data; // || initialData;
  return <Page page={page} />;
}
