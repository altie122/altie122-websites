import type { CollectionEntry } from "astro:content";
import { Bubble, BubbleContent } from "@altie122/ui/components/bubble";

interface Props {
  entry: CollectionEntry<"links">;
}

export default function LinkCard({ entry }: Props) {
  const data = entry.data;
  return (
    <Bubble variant={"tinted"} className='w-full'>
      <BubbleContent
        render={
          <a href={data.url} target='_blank' className='flex flex-col gap-2'>
            <h2 className='text-xl font-bold font-heading'>{data.title}</h2>
            <p className='text-xs'>{data.description}</p>
          </a>
        }
        className='w-full shadow-xl'
      />
    </Bubble>
  );
}
