import { Provider } from "react-redux";
import withRedux, { ReduxWrapperAppProps } from "next-redux-wrapper";
import Head from "next/head";
import Layout from "components/Layout";
import { makeStore, RootState } from "store";

import "style.css";

function MyApp({
  Component,
  pageProps,
  store,
}: ReduxWrapperAppProps<RootState>) {
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
}

export default withRedux(makeStore)(MyApp);
