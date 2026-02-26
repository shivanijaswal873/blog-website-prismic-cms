"use client";

import { asLink } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import clsx from "clsx";

export default function Navbar({ settings }: any) {
  const pathname = usePathname();

  const {
    logo,
    blog_label,
    blog_link,
    about_label,
    about_link,
    contact_label,
    contact_link,
  } = settings.data;

  const blogUrl = asLink(blog_link) || "/";
  const aboutUrl = asLink(about_link) || "/";
  const contactUrl = asLink(contact_link) || "/";

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
          <Link
            href={blogUrl}
            className={`nav-item ${
              pathname.startsWith(blogUrl) ? "active" : ""
            }`}
          >
            {blog_label}
          </Link>

          <Link
            href={aboutUrl}
            className={`nav-item ${
              pathname === aboutUrl ? "active" : ""
            }`}
          >
            {about_label}
          </Link>

          <FiSearch className="nav-search" />

          <Link
            href={contactUrl}
            className={`btn-contact ${
              pathname === contactUrl ? "active" : ""
            }`}
          >
            {contact_label}
          </Link>
        </nav>
      </div>
    </header>
  );
}