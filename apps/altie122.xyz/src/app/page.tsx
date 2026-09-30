'use client';
import {api} from '@altie122/backend/convex/_generated/api';
import {LinkPanel} from '@altie122/ui/components/ui122/links-panel';
import {useQuery} from '@tanstack/react-query';
import {convexAction, convexQuery} from '@convex-dev/react-query';

export default function Home() {
    const links = useQuery(convexQuery(api.links.getLinksPage));
    const twitchStreams = useQuery(convexAction(api.twitchSchedule.getTwitchSchedule))
    return (
        <main className={'p-2 flex flex-row justify-center'}>
            <div
                className={'container lg:flex lg:flex-row'}>
                <div className={'flex flex-col gap-4 grow'}>
                    <h1 className={'text-6xl font-heading font-bold'}>altie122</h1>

                </div>
                <div className={'flex flex-col gap-4 lg:max-w-sm'}>
                    <LinkPanel links={links} replaceTitle={'Links'} className={'top-14 sticky'}/>
                </div>
            </div>
        </main>
    );
}
