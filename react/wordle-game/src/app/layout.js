import { Roboto } from "next/font/google";
import "./global.css";

const roboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wordle",
  description: "A game to guess a random 5-letter word in up to 6 attempts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
