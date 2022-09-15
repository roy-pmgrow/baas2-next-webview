import Header from "components/Header";
import type { AppProps } from "next/app";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full max-w-lg mx-auto bg-white">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
