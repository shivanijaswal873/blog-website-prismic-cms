import { createClient } from "@/prismicio";
import { asLink } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default async function Navbar() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const {
    logo,
    blog_label,
    blog_link,
    about_label,
    about_link,
    contact_label,
    contact_link,
  } = settings.data;

  return (
    <header className="header">
      <div className="header-inner">

        <Link href="/" className="brand">
          {logo?.url && (
            <Image
              src={logo.url}
              alt="Logo"
              width={150}
              height={45}
              priority
            />
          )}
        </Link>

        <nav className="nav">
          <Link href={asLink(blog_link) || "/"} className="nav-item blog-nav ">
            {blog_label}
          </Link>

          <Link href={asLink(about_link) || "/"} className="nav-item about-nav">
            {about_label}
          </Link>

          <FiSearch className="nav-search" />

          <Link
            href={asLink(contact_link) || "/"}
            className="btn-contact"
          >
            {contact_label}
          </Link>
        </nav>

      </div>
    </header>
  );
}