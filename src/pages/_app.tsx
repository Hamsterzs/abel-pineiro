import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Abel, Fjalla_One, Prompt } from "@next/font/google";
import { trpc } from "../utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abel",
});

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-prompt",
});

export const fjalla = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fjalla",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${abel.variable} ${prompt.variable} ${fjalla.variable}`}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </main>
  );
}

export default trpc.withTRPC(MyApp);
