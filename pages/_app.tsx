import Header from "components/Header";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
