import type {Doc} from '@altie122/backend/convex/_generated/dataModel';
import {SquareArrowOutUpRight} from 'lucide-react';
import {Skeleton} from '@altie122/ui/components/skeleton';

interface Props {
    entry: Doc<'links'>;
}

export function LinkCard({entry}: Props) {
    return (
        <a href={entry.url} target="_blank"
           className="group/link text-card-foreground w-full bg-linear-to-r from-transparent from-20% to-primary flex flex-col gap-4 p-4 border-l-primary border-l hover:bg-primary transition-all duration-500 hover:text-sidebar dark:hover:text-card-foreground">
            <h2 className="text-xl font-bold font-heading inline-flex justify-between">{entry.title}
                <SquareArrowOutUpRight
                    className={'size-4 dark:text-muted-foreground/50 group-hover/link:dark:text-muted-foreground transition-all duration-500'}/>
            </h2>
            <p className="text-xs">{entry.description}</p>
        </a>
    );
}

export function LinkCardSkeleton() {
    return (
        <div
            className="group/link text-card-foreground w-full bg-linear-to-r from-transparent from-20% to-primary flex flex-col gap-4 p-4 border-l-primary border-l hover:bg-primary transition-all duration-500 hover:text-sidebar dark:hover:text-card-foreground">
            <div className={'flex justify-between'}>
                <Skeleton className={'h-[1.4rem] w-1/3'}/>
            </div>
            <Skeleton className={'h-[1.333333rem] w-1/2'}/>
        </div>
    );
}
