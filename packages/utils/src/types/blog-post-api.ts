export type ImageFormat =
    | 'png'
    | 'jpg'
    | 'jpeg'
    | 'tiff'
    | 'webp'
    | 'gif'
    | 'svg'
    | 'avif'
    | 'apng';

export interface BlogAuthorData {
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

export interface BlogApiAuthor {
    id: string;
    body?: string;
    collection: 'authors';
    data: BlogAuthorData;
    rendered?: {
        html: string;
        metadata?: Record<string, unknown>;
    };
    filePath?: string;
    digest?: string | number;
}

export interface BlogApiReturnJson {
    post: {
        id: string;
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
    authors: BlogApiAuthor[];
}

export interface BlogApiReturn {
    post: {
        id: string;
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
    authors: BlogApiAuthor[];
}
