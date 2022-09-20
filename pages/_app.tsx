import DefaultDataSet from "components/DefaultDataSet";
import Header from "components/Header";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 0,
            staleTime: Infinity,
            cacheTime: Infinity,
          },
        },
      }),
  );

  return (
    <>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=755b999a6119020ada3d56a92ba92d20&libraries=services,clusterer,drawing&autoload=false`}
        strategy="beforeInteractive"
      />

      <Provider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <div className="w-full max-w-lg mx-auto bg-white">
            <DefaultDataSet />
            <Header />
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default MyApp;
