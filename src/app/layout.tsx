import { abel, fjalla, prompt } from "../fonts";
import "../styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${abel.variable} ${prompt.variable} ${fjalla.variable}`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
