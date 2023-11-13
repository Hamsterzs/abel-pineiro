import { Abel, Fjalla_One, Prompt } from "next/font/google";

export const abel = Abel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abel",
});

export const prompt = Prompt({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-prompt",
});

export const fjalla = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fjalla",
});
