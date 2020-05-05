import axios from "axios";
import Head from "next/head";
import { NextPageContext } from "next";
import Index, { Result, Props } from "components/Index";
import serverSideUrl from "util/serverSideUrl";

export async function getServerSideProps({ req, query }: NextPageContext) {
  const initialQuery = (query.q as string) || "";
  let data: Result[] = [];
  if (req && initialQuery && initialQuery.length >= 4) {
    const response = await axios.get(
      serverSideUrl({
        req,
        path: `/api/search?q=${initialQuery.toLowerCase()}`,
      })
    );
    data = response.data;
  }

  return {
    props: {
      initialQuery,
      initialResults: data,
    },
  };
}

export default function CalmbookIndex(props: Props) {
  return (
    <div>
      <Head>
        <title>calmbook</title>
      </Head>
      <Index {...props} />
    </div>
  );
}
