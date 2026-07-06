import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET = (async ({ params, redirect }) => {
  const id = params.id ?? "";
  const [slug, ...rest] = id.split("/");

  const links = await getCollection("links");
  const link = links.find((link) => link.id === slug);

  if (!link) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }
  
  const restPath = rest.join("/");
  const baseUrl = link.data.url.endsWith("/")
    ? link.data.url.slice(0, -1)
    : link.data.url;

  const targetUrl = restPath ? `${baseUrl}/${restPath}` : baseUrl;

  return redirect(targetUrl, 308);
}) satisfies APIRoute;