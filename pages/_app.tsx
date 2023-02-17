import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Abel, Prompt } from "@next/font/google";

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${abel.variable} ${prompt.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
