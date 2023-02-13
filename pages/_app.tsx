import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Abel, Prompt, Dancing_Script } from "@next/font/google";

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

const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${abel.variable} ${prompt.variable} ${dancing_script.variable}`}
    >
      <Component {...pageProps} />;
    </main>
  );
}

export default MyApp;
