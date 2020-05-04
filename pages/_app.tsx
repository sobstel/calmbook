import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "components/Layout";

import "style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
