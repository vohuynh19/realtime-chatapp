import "../styles/styles.scss";
import type { AppProps } from "next/app";
import CustomApolloProvider from "../lib/providers/apollo";
import AuthProvider from "../lib/providers/auth";
import type { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <CustomApolloProvider>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </CustomApolloProvider>
    </>
  );
}

export default MyApp;
