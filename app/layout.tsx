import "./common-style/main.scss";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newsletter from "./components/NewsletterSection";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Newsletter />
        <Footer />
      </body>
    </html>
  );
}
