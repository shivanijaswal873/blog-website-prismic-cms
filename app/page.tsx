import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();

  try {
    const page = await client.getSingle("homepage");
    return <SliceZone slices={page?.data?.slices} components={components} />;
  } catch (error) {
    return <div>Homepage not found. Please publish content in Prismic.</div>;
  }
}
