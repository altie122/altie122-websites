import type {APIRoute} from 'astro';
import {getCollection, getEntries} from 'astro:content';
import {getImage} from 'astro:assets';

export const GET = (async ({params, request}) => {
    const posts = [...(await getCollection('posts', ({data}) => {
        return data.isDraft !== true && data.isHidden !== true;
    }))];

    const sortedPosts = posts.sort(
        (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
    );

    const post = sortedPosts[0];

    const authors = await getEntries(post.data.authors);

    return new Response(
        JSON.stringify({
            post: {
                id: post.id,
                title: post.data.title,
                description: post.data.description,
                pubDate: post.data.pubDate,
                lastUpdated: post.data.lastUpdated,
                image: {
                    cover: getImage(post.data.imageCover),
                    alt: post.data.imageAlt,
                },
                tags: post.data.tags,
            },
            authors: authors,
        }),
    );
}) satisfies APIRoute;
