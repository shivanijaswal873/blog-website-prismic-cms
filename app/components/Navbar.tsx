"use client";

import { asLink } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import clsx from "clsx";
import SearchModal from "./SearchModal";
import Button from "./common/Button";

export default function Navbar({ settings, searchSettings }: any) {
  const pathname = usePathname();
  const [openSearch, setOpenSearch] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    logo,
    blog_label,
    blog_link,
    about_label,
    about_link,
    contact_label,
    contact_link,
  } = settings?.data || {};

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <Link href="/" className="brand">
            {logo?.url && (
              <Image
                src={logo.url}
                alt="Logo"
                width={156.97}
                height={43.1}
                priority
              />
            )}
          </Link>

          <nav className="nav">
            {blog_label && blog_link && (
              <Link
                href={asLink(blog_link) || "/"}
                className={clsx("nav__item", {
                  "nav__item--active": pathname?.startsWith("/blog"),
                })}
              >
                {blog_label}
              </Link>
            )}

            {about_label && about_link && (
              <Link
                href={asLink(about_link) || "/"}
                className={clsx("nav__item", {
                  "nav__item--active": pathname?.startsWith("/about"),
                })}
              >
                {about_label}
              </Link>
            )}

            <FiSearch
              className="nav__search"
              onClick={() => setOpenSearch(true)}
            />

            {contact_label && contact_link && (
              <Button
                label={contact_label}
                href={asLink(contact_link) || "/"}
              />
            )}
          </nav>

          <div className="hamburger" onClick={() => setOpenDrawer(true)}>
            <FiMenu />
          </div>
        </div>
      </header>

      <div
        className={clsx("drawer-overlay", { show: openDrawer })}
        onClick={() => setOpenDrawer(false)}
      >
        <div className="drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer__header">
            <Link href="/" className="brand">
              {logo?.url && (
                <Image src={logo.url} alt="Logo" width={100} height={25} />
              )}
            </Link>

            <FiX onClick={() => setOpenDrawer(false)} />
          </div>

          {blog_link && blog_label && (
            <Link
              href={asLink(blog_link) || "/"}
              className="drawer__item"
              onClick={() => setOpenDrawer(false)}
            >
              {blog_label}
            </Link>
          )}

          {about_label && about_link && (
            <Link
              href={asLink(about_link) || "/"}
              className="drawer__item"
              onClick={() => setOpenDrawer(false)}
            >
              {about_label}
            </Link>
          )}

          <div
            className="drawer__search"
            onClick={() => {
              setOpenSearch(true);
              setOpenDrawer(false);
            }}
          >
            Search
          </div>

          {contact_label && contact_link && (
            <Button label={contact_label} href={asLink(contact_link) || "/"} />
          )}
        </div>
      </div>

      {openSearch && (
        <SearchModal
          searchSettings={searchSettings}
          onClose={() => setOpenSearch(false)}
        />
      )}
    </>
  );
}
