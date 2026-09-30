'use client';

import {ModeToggle} from '@altie122/ui/components/ui122/mode-toggle';

export default function Header() {
    return (
        <div
            className="sticky top-0 z-50 flex flex-row items-center justify-between p-2 bg-card/50 text-card-foreground border-border border-b backdrop-blur-xl shadow-xl h-12">
            <p className={'font-heading text-2xl font-bold'}>altie122</p>
            <div className="flex items-center gap-2">
                <ModeToggle/>
            </div>
        </div>
    );
}
