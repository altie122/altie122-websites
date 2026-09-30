'use client';

import {ConvexQueryClient} from '@convex-dev/react-query';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import type {ReactNode} from 'react';
import {ConvexProvider, ConvexReactClient} from 'convex/react';
import {env} from '@altie122/env/web';

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryKeyHashFn: convexQueryClient.hashFn(),
            queryFn: convexQueryClient.queryFn(),
        },
    },
});
convexQueryClient.connect(queryClient);

/**
 * # QueryProvider
 *
 * Contains both convex and TanStack Query
 */
export function QueryProvider({children}: { children: ReactNode }) {
    return (
        <ConvexProvider client={convex}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ConvexProvider>
    );
}
