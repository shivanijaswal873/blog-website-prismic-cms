import { createClient } from "@/prismicio";
import { asLink } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  const {
    featured_label,
    featured_title,
    featured_description,
    featured_button_text,
    featured_button_link,
    featured_image,
  } = page.data;

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-label">{featured_label}</span>

          <h1 className="hero-title">
            <PrismicRichText field={featured_title} />
          </h1>

          <p className="hero-desc">
            <PrismicRichText field={featured_description} />
          </p>

          <Link href={asLink(featured_button_link) || "/"} className="hero-btn">
            {featured_button_text}
          </Link>
        </div>

        <div className="hero-image">
          {featured_image?.url && (
            <Image
              src={featured_image.url}
              alt="Featured"
              width={560}
              height={560}
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
