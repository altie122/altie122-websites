import {action} from './_generated/server';
import type {BlogApiReturnJson, BlogApiReturn} from '@altie122/utils/types';

function parseApiReturn(data: BlogApiReturnJson): BlogApiReturn {
    const pubDate = new Date(data.post.pubDate).getTime();

    if (Number.isNaN(pubDate)) {
        throw new Error(`Invalid pubDate: "${data.post.pubDate}"`);
    }

    let lastUpdated: number | undefined;

    if (data.post.lastUpdated !== undefined) {
        lastUpdated = new Date(data.post.lastUpdated).getTime();

        if (Number.isNaN(lastUpdated)) {
            throw new Error(
                `Invalid lastUpdated: "${data.post.lastUpdated}"`,
            );
        }
    }

    return {
        ...data,
        post: {
            ...data.post,
            pubDate,
            lastUpdated,
        },
    };
}

async function getPostFromApi(url: string): Promise<BlogApiReturn> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch post: ${response.status} ${response.statusText}`,
        );
    }

    const json: BlogApiReturnJson = await response.json();

    return parseApiReturn(json);
}

export const getRecentBlogPost = action({
    handler: async () => {
        return await getPostFromApi('https://altie122.xyz/blog/api/recent.json');
    },
});
