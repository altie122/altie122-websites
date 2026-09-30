import {Button} from '@altie122/ui/components/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@altie122/ui/components/card';
import {Badge} from '@altie122/ui/components/badge';
import type {BlogApiReturn} from '@altie122/utils/types';
import {ClientDate} from '@altie122/ui/components/ui122/client-date';
import {Skeleton} from '@altie122/ui/components/skeleton';

interface Props {
    entry: BlogApiReturn;
}

export function BlogCard({entry}: Props) {
    const data = entry.post;
    const authors = entry.authors;
    const pubDate = new Date(data.pubDate);
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="inline-flex gap-4 justify-between"
                >{data.title}
                    <span className="flex flex-row gap-4 items-center">
        {data.tags.map((tag) =>
            <Badge className="w-fit" key={tag}>{tag}</Badge>)}</span
                    ></CardTitle
                >
                <CardDescription>{data.description}</CardDescription>
                <CardDescription>
                    <ClientDate date={pubDate}/> / {
                    authors.map((author) => author.data.name).join(', ')
                }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <img src={data.image.cover.src} alt={data.image.alt} className="aspect-video w-full"/>
            </CardContent>
            <CardFooter className="flex justify-between">
                <a href={`/blog/posts/${data.id}`}>
                    <Button variant="outline">Read</Button>
                </a
                >
            </CardFooter>
        </Card>
    );
}

export function BlogCardSkeleton() {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="inline-flex gap-4 justify-between"
                >
                    <Skeleton className={'h-[1.4rem] w-1/2'}/>
                    <span className="flex flex-row gap-4 items-center">
                        <Skeleton
                            className={'h-5 w-[55px] shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl'}/>
                    </span>
                </div
                >
                <Skeleton className={'h-[0.8rem] w-1/3'}/>
                <div className="flex flex-row items-center">
                    <Skeleton className={'h-[1.4rem] w-[25px]'}/>
                    <CardDescription>/</CardDescription>
                    <Skeleton className={'h-[1.4rem] w-1/3'}/>
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="aspect-video w-full"/>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Skeleton
                    className="h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 w-[50px]"/>
            </CardFooter>
        </Card>
    );
}
