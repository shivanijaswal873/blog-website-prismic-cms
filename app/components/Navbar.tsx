"use client";

import { asLink } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import clsx from "clsx";
import SearchModal from "./SearchModal";

export default function Navbar({ settings, searchSettings }: any) {
  const pathname = usePathname();
  const [openSearch, setOpenSearch] = useState(false);

  const {
    logo,
    blog_label,
    blog_link,
    about_label,
    about_link,
    contact_label,
    contact_link,
  } = settings?.data;

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="brand">
            {logo?.url && (
              <Image
                src={logo?.url}
                alt="Logo"
                width={150}
                height={45}
                priority
              />
            )}
          </Link>

          <nav className="nav">
            <Link
              href={asLink(blog_link) || "/"}
              className={clsx("nav-item", {
                active: pathname?.startsWith("/blog"),
              })}
            >
              {blog_label}
            </Link>

            <Link href={asLink(about_link) || "/"} className="nav-item">
              {about_label}
            </Link>

            <FiSearch
              className="nav-search"
              onClick={() => setOpenSearch(true)}
            />

            <Link href={asLink(contact_link) || "/"} className="btn-contact">
              {contact_label}
            </Link>
          </nav>
        </div>
      </header>

      {openSearch && (
        <SearchModal
          searchSettings={searchSettings}
          onClose={() => setOpenSearch(false)}
        />
      )}
    </>
  );
}
