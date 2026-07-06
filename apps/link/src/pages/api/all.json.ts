import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET = (async ({ params, request }) => {
  const links = await getCollection("links");
  return new Response(JSON.stringify(links.map((link) => {
    return {
      id: link.id,
      ...link.data,
    };
  })));
}) satisfies APIRoute;
