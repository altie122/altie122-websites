'use client';

import {Toaster} from '@altie122/ui/components/sonner';
import {ThemeProvider} from '@altie122/ui/components/ui122/theme-provider';
import type {ReactNode} from 'react';
import {QueryProvider} from '@altie122/query/provider';

export function Providers({children}: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <QueryProvider>
                {children}
            </QueryProvider>
            <Toaster richColors/>
        </ThemeProvider>
    );
}
