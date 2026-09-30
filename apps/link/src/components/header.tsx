'use client';
import Link from 'next/link';

import {ModeToggle} from '@altie122/ui/components/ui122/mode-toggle';

export default function Header() {
    return (
        <div className="sticky top-0 z-50">
            <div className="flex flex-row items-center justify-end p-2">
                <div className="flex items-center gap-2">
                    <ModeToggle/>
                </div>
            </div>
        </div>
    );
}
