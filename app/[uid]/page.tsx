import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;

  const client = createClient();

  try {
    const page = await client.getByUID("page", uid);
    console.log("UID:", uid);
    console.log("SLICES:", page.data.slices);

    return (
      <>
        <SliceZone slices={page.data.slices} components={components} />
      </>
    );
  } catch {
    notFound();
  }
}
