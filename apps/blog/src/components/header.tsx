'use client';

import {ModeToggle} from '@/components/mode-toggle.tsx';

export default function Header() {
    return (
        <div
            className="sticky top-0 z-50 flex flex-row items-center justify-between p-2 bg-card/50 text-card-foreground border-border border-b backdrop-blur-xl shadow-xl h-12">
            <div className={'basis-1/3'}>
                <a className={'font-heading text-2xl font-bold hover:prose-a'} href={'/'}>altie122</a>
            </div>
            <div className={'basis-1/3 justify-center items-center flex gap-2'}>
                <a href={'/blog'} className={'prose-a'}>Blog</a>
                <p>/</p>
                <a href={'https://altie.link'} className={'prose-a'}>Links</a>
            </div>
            <div className="flex items-center gap-2 basis-1/3 justify-end">
                <ModeToggle/>
            </div>
        </div>
    );
}
