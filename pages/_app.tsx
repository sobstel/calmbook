import { SWRConfig } from "swr";
import { AppProps } from "next/app";
import request from "util/request";
import Layout from "components/Layout";

import "style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: request }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
