import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET = (async ({ params, redirect }) => {
  const { id } = params;
  const links = await getCollection("links");

  const link = links.find((link) => link.id === id);

  if (!link) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return redirect(link.data.url, 308);
}) satisfies APIRoute;