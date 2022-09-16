import DefaultDataSet from "components/DefaultDataSet";
import Header from "components/Header";
import Modal from "components/Modal";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
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
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <div className="w-full max-w-lg mx-auto bg-white">
          <DefaultDataSet />
          <Header />
          <Component {...pageProps} />
          <Modal />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
