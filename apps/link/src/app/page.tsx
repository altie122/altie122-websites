'use client';
import {api} from '@altie122/backend/convex/_generated/api';
import {useQuery} from '@tanstack/react-query';
import {convexQuery} from '@convex-dev/react-query';
import {LinkPanel} from '@altie122/ui/components/ui122/links-panel';

export default function Home() {
    const links = useQuery(convexQuery(api.links.getLinksPage));
    return (
        <main className={'flex flex-col gap-4 p-4 container mx-auto max-w-md items-center h-full justify-center'}>
            <LinkPanel links={links}/>
        </main>
    );
}
