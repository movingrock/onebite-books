import GlobalLayout from "@/components/global-layout";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import SearchableLayout from "@/components/searchable-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </div>
  );
}
