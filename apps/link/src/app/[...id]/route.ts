import {NextRequest} from "next/server";
import {permanentRedirect} from "next/navigation";
import {fetchQuery} from "convex/nextjs";
import {api} from "@altie122/backend/convex/_generated/api";


export async function GET(request: NextRequest, ctx: RouteContext<'/[...id]'>) {
    const {id} = await ctx.params;
    console.log(id);
    if (id.length === 0) {
        permanentRedirect("/");
    }
    const linkId = id.shift();
    if (!linkId) {
        permanentRedirect("/");
    }
    const link = await fetchQuery(api.links.get_link_by_id, {id: linkId});
    if (!link) {
        permanentRedirect("/");
    }
    const restPath = id.join("/");
    console.log(restPath);
    const baseUrl = link.url.endsWith("/")
        ? link.url.slice(0, -1)
        : link.url;
    const targetUrl = restPath ? `${baseUrl}/${restPath}` : baseUrl;
    console.log(targetUrl);
    // @ts-ignore - It works, Next.js just doesn't like it in the code editor :|
    permanentRedirect(targetUrl);
}
