import "./common-style/main.scss";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newsletter from "./components/NewsletterSection";
import { createClient } from "@/prismicio";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <html lang="en">
      <body>
        <Navbar settings={settings} />
        {children}
        <Newsletter />
        <Footer />
      </body>
    </html>
  );
}