import { SWRConfig } from "swr";
import { AppProps } from "next/app";
import Head from "next/head";
import { json } from "util/request";
import Layout from "components/Layout";

import "style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: json }}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
