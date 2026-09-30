import {action} from './_generated/server';

type ImageFormat =
    | 'png'
    | 'jpg'
    | 'jpeg'
    | 'tiff'
    | 'webp'
    | 'gif'
    | 'svg'
    | 'avif'
    | 'apng';

interface AuthorData {
    name: string;
    pfp: {
        src: string;
        width: number;
        height: number;
        format: ImageFormat;
    };
    website?: {
        url: string;
        title: string;
    };
}

interface ApiAuthor {
    id: string;
    body?: string;
    collection: 'authors';
    data: AuthorData;
    rendered?: {
        html: string;
        metadata?: Record<string, unknown>;
    };
    filePath?: string;
    digest?: string | number;
}

interface ApiReturnJson {
    post: {
        title: string;
        description: string;
        pubDate: string;
        lastUpdated?: string;
        image: {
            cover: {
                src: string;
                width: number;
                height: number;
                format: ImageFormat;
            };
            alt: string;
        };
        tags: string[];
    };
    authors: ApiAuthor[];
}

interface ApiReturn {
    post: {
        title: string;
        description: string;
        pubDate: number;
        lastUpdated?: number;
        image: {
            cover: {
                src: string;
                width: number;
                height: number;
                format: ImageFormat;
            };
            alt: string;
        };
        tags: string[];
    };
    authors: ApiAuthor[];
}

function parseApiReturn(data: ApiReturnJson): ApiReturn {
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

async function getPostFromApi(url: string): Promise<ApiReturn> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch post: ${response.status} ${response.statusText}`,
        );
    }

    const json: ApiReturnJson = await response.json();

    return parseApiReturn(json);
}

export const getRecentBlogPost = action({
    handler: async () => {
        return await getPostFromApi('https://altie122.xyz/blog/api/recent.json');
    },
});
