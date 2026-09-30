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

type ImageTransform = {
    src: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    format?: ImageFormat | string;
    quality?: string | number;
    priority?: boolean;
    fit?: string;
    position?: string;
    background?: string;
    layout?: 'constrained' | 'fixed' | 'full-width' | 'none';
    widths?: number[];
    densities?: (number | `${number}x`)[];
    [key: string]: unknown;
};

interface SrcSetValue {
    transform: ImageTransform;
    descriptor?: string;
    attributes?: Record<string, unknown>;
    url: string;
}

export interface ImageCover {
    rawOptions: ImageTransform;
    options: ImageTransform;
    src: string;
    srcSet: {
        values: SrcSetValue[];
        attribute: string;
    };
    attributes: Record<string, unknown>;
}

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
            cover: ImageCover;
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
            cover: ImageCover;
            alt: string;
        };
        tags: string[];
    };
    authors: BlogApiAuthor[];
}
