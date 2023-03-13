import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Abel, Fjalla_One, Prompt, Varela_Round } from "@next/font/google";

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
    </main>
  );
}

export default MyApp;
