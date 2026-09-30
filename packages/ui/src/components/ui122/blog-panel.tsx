import {Panel} from '@altie122/ui/components/ui122/panel';
import type {UseQueryResult} from '@tanstack/react-query';
import {Alert, AlertDescription, AlertTitle} from '@altie122/ui/components/alert';
import {AlertCircleIcon} from 'lucide-react';
import type {BlogApiReturn} from '@altie122/utils/types';
import {BlogCard, BlogCardSkeleton} from '@altie122/ui/components/ui122/blog-card';

interface Props {
    replaceTitle?: string;
    post: UseQueryResult<BlogApiReturn, Error>;
    className?: string;
}

export function BlogPanel({post, replaceTitle, className}: Props) {
    return (
        <Panel title={replaceTitle ?? 'altie122'} description="Check out my most recent blog post!"
               titleAsH1={!replaceTitle} className={className}>
            <div
                className="flex flex-row flex-wrap justify-center max-h-100 gap-4">
                {
                    post.isPending ? (
                        <BlogCardSkeleton/>
                    ) : post.status === 'success' ? (
                        <BlogCard entry={post.data}/>
                    ) : post.status === 'error' && (
                        <Alert variant="destructive">
                            <AlertCircleIcon/>
                            <AlertTitle>An error has occurred</AlertTitle>
                            <AlertDescription>
                                Error: {post.error.message}
                            </AlertDescription>
                        </Alert>
                    )
                }
            </div>
        </Panel>
    );
}

