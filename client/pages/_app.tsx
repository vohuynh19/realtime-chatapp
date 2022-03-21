import "../styles/styles.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/providers/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
