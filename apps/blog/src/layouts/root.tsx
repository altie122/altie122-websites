import type {ReactNode} from 'react';
import {Header} from '@altie122/ui/components/ui122/header';
import {ThemeProvider} from '@altie122/ui/components/ui122/theme-provider';


export function Root({children}: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header/>
            {children}
        </ThemeProvider>
    );
}
