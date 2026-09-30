import type {ReactNode} from 'react';
import {cn} from '@altie122/ui/lib/utils';

interface Props {
    title: string;
    children: ReactNode;
    description?: string;
    titleAsH1?: boolean;
    className?: string;
}

export function Panel({title, description, children, titleAsH1, className}: Props) {
    return (
        <div
            className={cn('p-4 bg-card/50 text-card-foreground border-border border flex flex-col gap-4 shadow-xl', className)}>
            <div className="flex flex-col md:gap-2 items-center">
                {
                    titleAsH1 ? (
                        <h1 className="text-6xl font-bold font-heading">{title}</h1>
                    ) : (
                        <h2 className="text-6xl font-bold font-heading">{title}</h2>
                    )
                }
                {
                    description && (
                        <p>{description}</p>
                    )
                }
            </div>
            {children}
        </div>
    );
}
