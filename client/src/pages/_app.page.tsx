import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import { GlobalStyle } from "@/styles/global.styles";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
