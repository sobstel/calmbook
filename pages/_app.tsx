import { SWRConfig } from "swr";
import { AppProps } from "next/app";
import { json } from "util/request";
import Layout from "components/Layout";

import "style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: json }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
