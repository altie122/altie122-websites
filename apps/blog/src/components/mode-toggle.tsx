import * as React from 'react';
import {Moon, Sun} from 'lucide-react';

import {Button} from '@altie122/ui/components/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@altie122/ui/components/dropdown-menu';

const getThemePreference = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'theme-light';
};

export function ModeToggle() {
    const [theme, setThemeState] = React.useState<'theme-light' | 'dark' | 'system'>(getThemePreference() as 'theme-light' | 'dark' | 'system');

    // Initial theme setup based on existing class or localStorage/system preference
    React.useEffect(() => {
        const savedTheme = getThemePreference();
        const isDarkMode = savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList[isDarkMode ? 'add' : 'remove']('dark');
        setThemeState(savedTheme as 'theme-light' | 'dark' | 'system');
    }, []);

    // Update class and localStorage based on theme state
    React.useEffect(() => {
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                                      <Button variant="outline" size="icon">
                                         <Sun
                                             className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
                                         <Moon
                                             className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
                                         <span className="sr-only">Toggle theme</span>
                                     </Button>
                                 }>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setThemeState('theme-light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeState('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeState('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
