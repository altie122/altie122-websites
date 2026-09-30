import {LinkCard, LinkCardSkeleton} from '@altie122/ui/components/ui122/link-card';
import type {Doc} from '@altie122/backend/convex/_generated/dataModel';
import {Panel} from '@altie122/ui/components/ui122/panel';
import type {UseQueryResult} from '@tanstack/react-query';
import {Alert, AlertDescription, AlertTitle} from '@altie122/ui/components/alert';
import {AlertCircleIcon} from 'lucide-react';

interface Props {
    replaceTitle?: string;
    links: UseQueryResult<Doc<'links'>[], Error>;
    className?: string;
}

const placeholderCount = [1, 2, 3, 4];

export function LinkPanel({links, replaceTitle, className}: Props) {
    return (
        <Panel title={replaceTitle ?? 'altie122'} description="Check out some of my socials!"
               titleAsH1={!replaceTitle} className={className}>
            <div
                className="flex flex-row flex-wrap justify-center max-h-100 gap-4 scrollbar-thumb-accent overflow-y-scroll scroll-fade">
                {
                    links.isPending ? (
                        <>
                            {placeholderCount.map((item) => (
                                <LinkCardSkeleton key={item}/>
                            ))}
                        </>
                    ) : links.status === 'success' ? (
                        <>
                            {links.data.sort((a) =>
                                a.type === 'internal' ? -1 : 1,
                            ).map((link) => (
                                <LinkCard entry={link} key={link._id}/>
                            ))}
                        </>
                    ) : links.status === 'error' && (
                        <Alert variant="destructive">
                            <AlertCircleIcon/>
                            <AlertTitle>An error has occurred</AlertTitle>
                            <AlertDescription>
                                Error: {links.error.message}
                            </AlertDescription>
                        </Alert>
                    )
                }
            </div>
        </Panel>
    );
}
