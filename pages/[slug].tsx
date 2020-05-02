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

export async function getServerSideProps({ query, req }: NextPageContext) {
  const slug = query.slug as string;
  // TODO
  const protocol = "http";
  const url = `${protocol}://${req?.headers.host}${apiPath(slug)}`;
  const data = await request(url);
  return { props: { data, slug } };
}

export default function CalmbookPage({ data: initialData, slug }: Props) {
  // TODO: handle error too
  const { data } = useSWR(apiPath(slug), request);
  const { page } = data || initialData;
  return <Page page={page} />;
}
