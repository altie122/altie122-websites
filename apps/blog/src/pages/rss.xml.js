import rss from "@astrojs/rss";
import {getCollection} from "astro:content";

export async function GET(context) {
    const posts = [
        ...(await getCollection("posts", ({data}) => {
            return data.isDraft !== true && data.isHidden !== true;
        })),
    ];
    return rss({
        title: "Altie122's blog",
        description: "Altie122's blog posts I guess",
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/posts/${post.slug}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
