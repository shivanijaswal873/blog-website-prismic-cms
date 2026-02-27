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
  const blogs = await client.getAllByType("blog");
    const searchSettings = await client.getSingle("search_settings");

  return (
    <html lang="en">
      <body>
        <Navbar settings={settings}  blogs={blogs}   searchSettings={searchSettings}  />
        {children}
        <Newsletter />
        <Footer />
      </body>
    </html>
  );
}