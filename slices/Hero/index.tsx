import { createClient } from "@/prismicio";
import { asLink } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  const heroSlice = page.data.slices?.find(
    (slice: any) => slice.slice_type === "hero"
  );

  if (!heroSlice) return null;

  const {
    featured_label,
    featured_title,
    featured_description,
    featured_button_text,
    featured_button_link,
    featured_image,
    top_wave_image,
    bottom_wave_image,
  } = heroSlice.primary as any;

  return (
    <section className="hero">

      {top_wave_image?.url && (
        <Image
          src={top_wave_image.url}
          alt={top_wave_image.alt || "wave"}
          width={top_wave_image.dimensions.width}
          height={top_wave_image.dimensions.height}
          className="hero-wave hero-wave--top"
        />
      )}

      {bottom_wave_image?.url && (
        <Image
          src={bottom_wave_image.url}
          alt={bottom_wave_image.alt || "wave"}
          width={bottom_wave_image.dimensions.width}
          height={bottom_wave_image.dimensions.height}
          className="hero-wave hero-wave--bottom"
        />
      )}

      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-label">{featured_label}</span>

          <div className="hero-title">
            <PrismicRichText field={featured_title} />
          </div>

          <div className="hero-desc">
            <PrismicRichText field={featured_description} />
          </div>

          <Link
            href={asLink(featured_button_link) || "/"}
            className="hero-btn"
          >
            {featured_button_text}
          </Link>
        </div>

        <div className="hero-image">
          {featured_image?.url && (
            <Image
              src={featured_image.url}
              alt={featured_image.alt || "Featured"}
              width={608}
              height={576}
              className="hero-img"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}